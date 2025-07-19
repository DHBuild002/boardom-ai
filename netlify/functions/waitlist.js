const admin = require('firebase-admin');

// Initialize Firebase Admin SDK only once
let app;
if (!admin.apps.length) {
  try {
    // Parse the private key properly - handle both escaped and unescaped newlines
    let privateKey = process.env.FIREBASE_PRIVATE_KEY;
    if (privateKey) {
      privateKey = privateKey.replace(/\\n/g, '\n');
    }

    app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: privateKey,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      }),
    });
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
  }
} else {
  app = admin.apps[0];
}

const db = admin.firestore();

exports.handler = async (event, context) => {
  // Set CORS headers for all responses
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ 
        success: false,
        message: 'Method Not Allowed - Only POST requests are supported' 
      }),
    };
  }

  try {
    // Validate environment variables
    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_PRIVATE_KEY || !process.env.FIREBASE_CLIENT_EMAIL) {
      console.error('Missing Firebase environment variables');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          success: false,
          message: 'Server configuration error. Please contact support.' 
        }),
      };
    }

    // Parse request body
    let requestBody;
    try {
      requestBody = JSON.parse(event.body || '{}');
    } catch (parseError) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false,
          message: 'Invalid request format.' 
        }),
      };
    }

    const { email } = requestBody;

    // Validate email presence
    if (!email || typeof email !== 'string') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false,
          message: 'Email address is required.' 
        }),
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trimmedEmail = email.trim().toLowerCase();
    
    if (!emailRegex.test(trimmedEmail)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false,
          message: 'Please enter a valid email address.' 
        }),
      };
    }

    // Check if email already exists in waitlist
    const existingEmailQuery = await db.collection('waitlist')
      .where('email', '==', trimmedEmail)
      .limit(1)
      .get();

    if (!existingEmailQuery.empty) {
      return {
        statusCode: 409,
        headers,
        body: JSON.stringify({ 
          success: false,
          message: 'This email is already on the waitlist.' 
        }),
      };
    }

    // Add email to waitlist
    const docRef = await db.collection('waitlist').add({
      email: trimmedEmail,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      status: 'pending',
      source: 'website',
      userAgent: event.headers['user-agent'] || 'unknown',
    });

    console.log('Successfully added email to waitlist:', trimmedEmail, 'Document ID:', docRef.id);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true,
        message: 'Successfully added to waitlist! We\'ll notify you when boardom is ready.' 
      }),
    };

  } catch (error) {
    console.error('Waitlist function error:', error);
    
    // Return a more specific error message based on the error type
    let errorMessage = 'Failed to join waitlist. Please try again later.';
    
    if (error.code === 'permission-denied') {
      errorMessage = 'Database access denied. Please contact support.';
    } else if (error.code === 'unavailable') {
      errorMessage = 'Service temporarily unavailable. Please try again in a moment.';
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false,
        message: errorMessage 
      }),
    };
  }
};