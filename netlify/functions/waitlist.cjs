const admin = require('firebase-admin');

// Initialize Firebase Admin SDK ONLY if it hasn't been initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Handle newline characters
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });
}

const db = admin.firestore();

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    const { email } = JSON.parse(event.body);

    if (!email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Email address is required.' }),
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Please enter a valid email address.' }),
      };
    }

    // Check if email already exists
    const existingEmail = await db.collection('waitlist')
      .where('email', '==', email.toLowerCase())
      .limit(1)
      .get();

    if (!existingEmail.empty) {
      return {
        statusCode: 409,
        headers,
        body: JSON.stringify({ message: 'This email is already on the waitlist.' }),
      };
    }

    // Add email to waitlist
    await db.collection('waitlist').add({
      email: email.toLowerCase(),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      status: 'pending',
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Successfully added to waitlist! We\'ll notify you when boardom is ready.' }),
    };
  } catch (error) {
    console.error('Error adding email to waitlist:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Failed to join waitlist. Please try again later.' }),
    };
  }
};