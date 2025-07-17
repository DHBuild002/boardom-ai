// Conditional Firebase configuration
let firestore: any = null;
let isConfigured = false;

// Check if Firebase should be initialized
const shouldInitializeFirebase = () => {
  const requiredVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN', 
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID'
  ];
  
  return requiredVars.every(varName => {
    const value = import.meta.env[varName];
    return value && value.length > 3 && !value.includes('your-');
  });
};

// Lazy initialization function
const initializeFirebase = async () => {
  if (isConfigured || !shouldInitializeFirebase()) {
    return false;
  }

  try {
    const { initializeApp } = await import('firebase/app');
    const { getFirestore } = await import('firebase/firestore');
    
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID
    };

    const app = initializeApp(firebaseConfig);
    firestore = getFirestore(app);
    isConfigured = true;
    return true;
  } catch (error) {
    console.warn('Firebase initialization failed:', error);
    return false;
  }
};

export const isFirebaseConfigured = (): boolean => {
  return shouldInitializeFirebase();
};

export const getFirestore = async () => {
  if (!isConfigured) {
    await initializeFirebase();
  }
  return firestore;
};