// Waitlist service without direct Firebase client usage
export interface WaitlistEntry {
  email: string;
  timestamp: Date;
  status: 'pending' | 'approved' | 'notified';
}

export const addToWaitlist = async (email: string): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('📧 Attempting to add email to waitlist:', email);
    
    // Call Netlify function instead of direct Firebase
    const response = await fetch('/.netlify/functions/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.toLowerCase() }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.warn('⚠️ Waitlist function error:', result.message);
      return {
        success: false,
        message: result.message || "Unable to join waitlist right now. Please try again later."
      };
    }

    console.log('✅ Email successfully added to waitlist!');
    return {
      success: true,
      message: result.message
    };
  } catch (error) {
    console.error("❌ Waitlist function error:", error);
    
    return {
      success: false,
      message: "Unable to join waitlist right now. Please check your internet connection and try again."
    };
  }
};