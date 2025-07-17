import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

// Note: These Firebase config values are safe to expose in client-side code
// Firebase uses these for client identification, not authentication
// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

/**
 * Checks if Firebase is properly configured by verifying all required environment variables are set
 * Note: Firebase client config is meant to be public - these are not secret values
 */
export const isFirebaseConfigured = (): boolean => {
  const hasAllRequiredFields = !!(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.storageBucket &&
    firebaseConfig.messagingSenderId &&
    firebaseConfig.appId
  );
  
  const hasValidValues = !!(
    firebaseConfig.apiKey !== 'your-actual-api-key' &&
    firebaseConfig.projectId !== 'your-actual-project-id' &&
    firebaseConfig.apiKey.length > 10 &&
    firebaseConfig.projectId.length > 3
  );
  
  return hasAllRequiredFields && hasValidValues;
};

// Initialize Firebase app and Firestore only if properly configured
let app: FirebaseApp | null = null;
let firestore: Firestore | null = null;

if (isFirebaseConfigured()) {
  try {
    app = initializeApp(firebaseConfig);
    firestore = getFirestore(app);
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
} else {
  console.warn('Firebase not configured. Missing or invalid environment variables.');
}

export { firestore };