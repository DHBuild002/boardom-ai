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
  
  console.log('🔍 Firebase Environment Variables Check:');
  requiredVars.forEach(varName => {
    const value = import.meta.env[varName];
    console.log(`${varName}:`, value ? `${value.substring(0, 10)}...` : 'NOT SET');
  });

  return requiredVars.every(varName => {
    const value = import.meta.env[varName];
    return value && value.length > 3 && !value.includes('your-');
  });
};

// Lazy initialization function
const initializeFirebase = async () => {
  if (isConfigured || !shouldInitializeFirebase()) {
    console.log('🚫 Firebase initialization skipped:', { isConfigured, shouldInit: shouldInitializeFirebase() });
    return false;
  }

  try {
    console.log('🔥 Attempting Firebase initialization...');
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
    console.log('✅ Firebase initialized successfully!');
    return true;
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error);
    return false;
  }
};

export const isFirebaseConfigured = (): boolean => {
  const configured = shouldInitializeFirebase();
  console.log('🔧 Firebase configured check:', configured);
  return configured;
};

export const getFirestore = async () => {
  if (!isConfigured) {
    console.log('🔄 Firebase not configured, attempting initialization...');
    await initializeFirebase();
  }
  console.log('📊 Firestore instance:', firestore ? 'Available' : 'NULL');
  return firestore;
};