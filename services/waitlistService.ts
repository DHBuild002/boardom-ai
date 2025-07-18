// Waitlist service without direct Firebase client usage
export interface WaitlistEntry {
  email: string;
  timestamp: Date;
  status: 'pending' | 'approved' | 'notified';
}

export const addToWaitlist = async (email: string): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('📧 Attempting to add email to waitlist:', email);
    
    // Call serverless function instead of direct Firebase
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.toLowerCase() }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.warn('⚠️ Waitlist API error:', result.message);
      return {
        success: false,
        message: result.message || "Unable to join waitlist right now. Please try again later."
      };
    }

    console.log('✅ Email successfully added to waitlist!');
    return {
      success: true,
      message: "Successfully added to waitlist! We'll notify you when boardom is ready."
    };
  } catch (error) {
    console.error("❌ Waitlist service error:", error);
    
    return {
      success: false,
      message: "Unable to join waitlist right now. Please check your internet connection and try again."
    };
  }
};