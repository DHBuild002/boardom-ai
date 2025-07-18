export interface WaitlistEntry {
  email: string;
  timestamp: Date;
  status: 'pending' | 'approved' | 'notified';
}

export const addToWaitlist = async (email: string): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('📧 Attempting to add email to waitlist:', email);
    
    // Dynamic import to prevent bundling when not needed
    const { getFirestore } = await import('../firebaseConfig');
    const firestore = await getFirestore();
    
    console.log('🔍 Firestore instance check:', firestore ? 'Available' : 'NULL');
    
    if (!firestore) {
      console.warn('⚠️ Firestore not available - configuration issue');
      return {
        success: false,
        message: "Waitlist is not available at this time."
      };
    }

    console.log('📦 Loading Firestore functions...');
    const { collection, addDoc, query, where, getDocs } = await import('firebase/firestore');

    // Check if email already exists
    console.log('🔍 Checking for existing email...');
    const waitlistRef = collection(firestore, 'waitlist');
    const q = query(waitlistRef, where('email', '==', email.toLowerCase()));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.log('⚠️ Email already exists in waitlist');
      return {
        success: false,
        message: "This email is already on the waitlist!"
      };
    }

    // Add new email to waitlist
    console.log('➕ Adding new email to waitlist...');
    const waitlistEntry: WaitlistEntry = {
      email: email.toLowerCase(),
      timestamp: new Date(),
      status: 'pending'
    };

    await addDoc(waitlistRef, waitlistEntry);
    console.log('✅ Email successfully added to waitlist!');

    return {
      success: true,
      message: "Successfully added to waitlist!"
    };
  } catch (error) {
    console.error("❌ Waitlist service error:", error);
    return {
      success: false,
      message: "Unable to join waitlist right now. Please try again later."
    };
  }
};