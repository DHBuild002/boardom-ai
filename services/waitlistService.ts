export interface WaitlistEntry {
  email: string;
  timestamp: Date;
  status: 'pending' | 'approved' | 'notified';
}

export const addToWaitlist = async (email: string): Promise<{ success: boolean; message: string }> => {
  try {
    // Dynamic import to prevent bundling when not needed
    const { getFirestore } = await import('../firebaseConfig');
    const firestore = await getFirestore();
    
    if (!firestore) {
      return {
        success: false,
        message: "Waitlist is not available at this time."
      };
    }

    const { collection, addDoc, query, where, getDocs } = await import('firebase/firestore');

    // Check if email already exists
    const waitlistRef = collection(firestore, 'waitlist');
    const q = query(waitlistRef, where('email', '==', email.toLowerCase()));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return {
        success: false,
        message: "This email is already on the waitlist!"
      };
    }

    // Add new email to waitlist
    const waitlistEntry: WaitlistEntry = {
      email: email.toLowerCase(),
      timestamp: new Date(),
      status: 'pending'
    };

    await addDoc(waitlistRef, waitlistEntry);

    return {
      success: true,
      message: "Successfully added to waitlist!"
    };
  } catch (error) {
    console.warn("Waitlist service error:", error);
    return {
      success: false,
      message: "Unable to join waitlist right now. Please try again later."
    };
  }
};