export interface WaitlistEntry {
  email: string;
  timestamp: Date;
  status: 'pending' | 'approved' | 'notified';
}

export const addToWaitlist = async (email: string): Promise<{ success: boolean; message: string }> => {
  try {
    // Call Netlify function instead of direct Firebase
    const response = await fetch('/.netlify/functions/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email: email.toLowerCase() }),
    });

    let result;
    try {
      result = await response.json();
    } catch (parseError) {
      return {
        success: false,
        message: "Server response error. Please try again later."
      };
    }

    if (!response.ok) {
      return {
        success: false,
        message: result?.message || "Unable to join waitlist right now. Please try again later."
      };
    }

    return {
      success: true,
      message: result?.message || "Successfully added to waitlist!"
    };
  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your internet connection and try again."
    };
  }
};