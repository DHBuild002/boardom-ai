// Firebase configuration with improved error handling
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

let firestore: Firestore | null = null;
let app: FirebaseApp | null = null;
let isConfigured = false;

// Check if Firebase should be initialized
const shouldInitializeFirebase = (): boolean => {
  const requiredVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_PROJECT_ID'
  ];
  
  console.log('🔍 Firebase Environment Variables Check:');
  const allPresent = requiredVars.every(varName => {
    const value = import.meta.env[varName];
    const isPresent = value && value.length > 3 && !value.includes('your-');
    console.log(`${varName}:`, isPresent ? `${value.substring(0, 10)}...` : 'NOT SET');
    return isPresent;
  });

  console.log('🔧 Firebase configured check:', allPresent);
  return allPresent;
};

// Initialize Firebase
const initializeFirebase = (): boolean => {
  if (isConfigured) {
    console.log('✅ Firebase already initialized');
    return true;
  }

  if (!shouldInitializeFirebase()) {
    console.log('🚫 Firebase initialization skipped - missing environment variables');
    return false;
  }

  try {
    console.log('🔥 Initializing Firebase...');
    
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID
    };

    app = initializeApp(firebaseConfig);
    firestore = getFirestore(app);
    isConfigured = true;
    
    console.log('✅ Firebase initialized successfully!');
    return true;
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error);
    return false;
  }
};

export const isFirebaseConfigured = (): boolean => {
  return shouldInitializeFirebase();
};

export const getFirestoreInstance = (): Firestore | null => {
  if (!isConfigured) {
    initializeFirebase();
  }
  console.log('📊 Firestore instance:', firestore ? 'Available' : 'NULL');
  return firestore;
};