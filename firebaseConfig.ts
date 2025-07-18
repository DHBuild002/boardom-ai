// Firebase configuration removed for security
// All Firebase operations now handled server-side

export const isFirebaseConfigured = (): boolean => {
  // Always return true since we're using serverless functions
  return true;
};

export const getFirestoreInstance = () => {
  // No longer needed on client-side
  console.log('📊 Firebase operations moved to serverless functions');
  return null;
};