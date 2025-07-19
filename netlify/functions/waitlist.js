const admin = require('firebase-admin');

// Initialize Firebase Admin SDK only once
let app;

const initializeFirebase = () => {
  if (admin.apps.length > 0) {
    return admin.apps[0];
  }

  try {
    // Validate required environment variables
    const requiredEnvVars = ['FIREBASE_PROJECT_ID', 'FIREBASE_PRIVATE_KEY', 'FIREBASE_CLIENT_EMAIL'];
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }

    // Parse the private key properly - handle both escaped and unescaped newlines
    let privateKey = process.env.FIREBASE_PRIVATE_KEY;
    if (privateKey) {
      // Replace literal \n with actual newlines if they exist
      privateKey = privateKey.replace(/\\n/g, '\n');
      
      // Ensure it starts and ends with proper markers
      if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
        throw new Error('Invalid private key format - missing BEGIN marker');
      }
      if (!privateKey.includes('-----END PRIVATE KEY-----')) {
        throw new Error('Invalid private key format - missing END marker');
      }
    } else {
      throw new Error('FIREBASE_PRIVATE_KEY environment variable is not set');
    }

    const firebaseConfig = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: privateKey,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    };

    console.log('Initializing Firebase with project:', firebaseConfig.projectId);
    console.log('Client email:', firebaseConfig.clientEmail);
    console.log('Private key length:', privateKey?.length || 0);

    app = admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
    });

    console.log('Firebase Admin initialized successfully');
    return app;

  } catch (error) {
    console.error('Firebase Admin initialization error:', error.message);
    throw error;
  }
};

exports.handler = async (event, context) => {
  // Set CORS headers for all responses
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  console.log(`Waitlist function called: ${event.httpMethod} ${event.path}`);
  console.log('Headers:', JSON.stringify(event.headers, null, 2));

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    console.log(`Method not allowed: ${event.httpMethod}`);
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ 
        success: false,
        message: 'Method Not Allowed - Only POST requests are supported',
        debug: {
          method: event.httpMethod,
          path: event.path,
        }
      }),
    };
  }

  try {
    console.log('Processing POST request...');
    
    // Initialize Firebase
    let firebaseApp;
    try {
      firebaseApp = initializeFirebase();
      console.log('Firebase initialized successfully');
    } catch (firebaseError) {
      console.error('Firebase initialization failed:', firebaseError.message);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          success: false,
          message: 'Server configuration error. Please contact support.',
          debug: {
            error: 'Firebase initialization failed',
            details: firebaseError.message,
          }
        }),
      };
    }

    // Parse request body
    let requestBody;
    try {
      console.log('Raw body:', event.body);
      requestBody = JSON.parse(event.body || '{}');
      console.log('Parsed body:', requestBody);
    } catch (parseError) {
      console.error('Body parsing error:', parseError.message);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false,
          message: 'Invalid request format.',
          debug: {
            error: 'JSON parsing failed',
            rawBody: event.body,
          }
        }),
      };
    }

    const { email } = requestBody;

    // Validate email presence
    if (!email || typeof email !== 'string') {
      console.log('Email validation failed - missing or invalid type');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false,
          message: 'Email address is required.',
          debug: {
            receivedEmail: email,
            emailType: typeof email,
          }
        }),
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trimmedEmail = email.trim().toLowerCase();
    
    if (!emailRegex.test(trimmedEmail)) {
      console.log('Email validation failed - invalid format:', trimmedEmail);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false,
          message: 'Please enter a valid email address.',
          debug: {
            email: trimmedEmail,
            passedRegex: false,
          }
        }),
      };
    }

    console.log('Email validated successfully:', trimmedEmail);

    // Get Firestore instance
    const db = admin.firestore();
    console.log('Firestore instance obtained');

    // Check if email already exists in waitlist
    console.log('Checking for existing email...');
    const existingEmailQuery = await db.collection('waitlist')
      .where('email', '==', trimmedEmail)
      .limit(1)
      .get();

    if (!existingEmailQuery.empty) {
      console.log('Email already exists in waitlist:', trimmedEmail);
      return {
        statusCode: 409,
        headers,
        body: JSON.stringify({ 
          success: false,
          message: 'This email is already on the waitlist.',
          debug: {
            email: trimmedEmail,
            existingDocs: existingEmailQuery.size,
          }
        }),
      };
    }

    console.log('Email not found in waitlist, proceeding to add...');

    // Add email to waitlist
    const docData = {
      email: trimmedEmail,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      status: 'pending',
      source: 'website',
      userAgent: event.headers['user-agent'] || 'unknown',
      deployId: context.deployId || 'unknown',
      requestId: context.requestId || 'unknown',
    };

    console.log('Adding document with data:', docData);
    const docRef = await db.collection('waitlist').add(docData);
    console.log('Document added successfully with ID:', docRef.id);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true,
        message: 'Successfully added to waitlist! We\'ll notify you when boardom is ready.',
        debug: {
          email: trimmedEmail,
          documentId: docRef.id,
          timestamp: new Date().toISOString(),
        }
      }),
    };

  } catch (error) {
    console.error('Waitlist function error:', error);
    console.error('Error stack:', error.stack);
    
    // Return a detailed error response for debugging
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false,
        message: 'Failed to join waitlist. Please try again later.',
        debug: {
          error: error.message,
          code: error.code,
          stack: error.stack,
          timestamp: new Date().toISOString(),
        }
      }),
    };
  }
};