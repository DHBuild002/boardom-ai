exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const debug = {
      timestamp: new Date().toISOString(),
      environment: {
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
      },
      netlifyContext: {
        deployId: context.deployId || 'unknown',
        requestId: context.requestId || 'unknown',
        functionName: context.functionName || 'unknown',
        functionVersion: context.functionVersion || 'unknown',
      },
      environmentVariables: {
        hasFirebaseProjectId: !!process.env.FIREBASE_PROJECT_ID,
        hasFirebasePrivateKey: !!process.env.FIREBASE_PRIVATE_KEY,
        hasFirebaseClientEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
        firebaseProjectIdLength: process.env.FIREBASE_PROJECT_ID?.length || 0,
        firebasePrivateKeyLength: process.env.FIREBASE_PRIVATE_KEY?.length || 0,
        firebaseClientEmailLength: process.env.FIREBASE_CLIENT_EMAIL?.length || 0,
        firebaseProjectIdValue: process.env.FIREBASE_PROJECT_ID || 'NOT_SET',
        firebaseClientEmailValue: process.env.FIREBASE_CLIENT_EMAIL || 'NOT_SET',
        privateKeyStartsWith: process.env.FIREBASE_PRIVATE_KEY?.substring(0, 50) || 'NOT_SET',
      },
      firebaseAdminTest: null,
      firestoreTest: null,
    };

    // Test Firebase Admin initialization
    try {
      const admin = require('firebase-admin');
      
      if (admin.apps.length === 0) {
        let privateKey = process.env.FIREBASE_PRIVATE_KEY;
        if (privateKey) {
          privateKey = privateKey.replace(/\\n/g, '\n');
        }

        const app = admin.initializeApp({
          credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: privateKey,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          }),
        });
        
        debug.firebaseAdminTest = {
          success: true,
          appName: app.name,
          projectId: app.options.projectId,
        };
      } else {
        debug.firebaseAdminTest = {
          success: true,
          existingApp: true,
          appName: admin.apps[0].name,
        };
      }

      // Test Firestore connection
      const db = admin.firestore();
      const testDoc = await db.collection('debug').doc('test').set({
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        test: true,
      });
      
      debug.firestoreTest = {
        success: true,
        writeTest: 'completed',
      };

    } catch (firebaseError) {
      debug.firebaseAdminTest = {
        success: false,
        error: firebaseError.message,
        code: firebaseError.code,
        stack: firebaseError.stack,
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(debug, null, 2),
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Debug function failed',
        message: error.message,
        stack: error.stack,
      }, null, 2),
    };
  }
};