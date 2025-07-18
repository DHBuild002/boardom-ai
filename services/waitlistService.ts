import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { getFirestoreInstance } from '../firebaseConfig';

export interface WaitlistEntry {
  email: string;
  timestamp: Date;
  status: 'pending' | 'approved' | 'notified';
}

export const addToWaitlist = async (email: string): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('📧 Attempting to add email to waitlist:', email);
    
    const firestore = getFirestoreInstance();
    
    if (!firestore) {
      console.warn('⚠️ Firestore not available - configuration issue');
      return {
        success: false,
        message: "Waitlist service is not available at this time. Please try again later."
      };
    }

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
      message: "Successfully added to waitlist! We'll notify you when boardom is ready."
    };
  } catch (error) {
    console.error("❌ Waitlist service error:", error);
    
    // More specific error handling
    if (error instanceof Error) {
      if (error.message.includes('permission-denied')) {
        return {
          success: false,
          message: "Access denied. Please check your Firebase security rules."
        };
      }
      if (error.message.includes('network')) {
        return {
          success: false,
          message: "Network error. Please check your internet connection and try again."
        };
      }
    }
    
    return {
      success: false,
      message: "Unable to join waitlist right now. Please try again later."
    };
  }
};