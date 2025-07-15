import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { firestore, isFirebaseConfigured } from '../firebaseConfig';

export interface WaitlistEntry {
  email: string;
  timestamp: Date;
  status: 'pending' | 'approved' | 'notified';
}

export const addToWaitlist = async (email: string): Promise<{ success: boolean; message: string }> => {
  if (!isFirebaseConfigured()) {
    return {
      success: false,
      message: "Firebase is not configured. Please add your Firebase configuration."
    };
  }

  try {
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
    console.error("Error adding to waitlist:", error);
    return {
      success: false,
      message: "Failed to add to waitlist. Please try again."
    };
  }
};