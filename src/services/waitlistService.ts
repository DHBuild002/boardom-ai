export const addToWaitlist = async (email: string, recaptchaToken?: string): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('Attempting to call waitlist function...');
    
    // Call Netlify function instead of direct Firebase
    const requestBody: { email: string; recaptchaToken?: string } = { 
      email: email.toLowerCase() 
    };

    if (recaptchaToken) {
      requestBody.recaptchaToken = recaptchaToken;
    }

    console.log('Request body:', requestBody);

    const response = await fetch('/.netlify/functions/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    let result;
    try {
      result = await response.json();
      console.log('Response data:', result);
    } catch (parseError) {
      console.error('Failed to parse response:', parseError);
      return {
        success: false,
        message: "Server response error. Please try again later."
      };
    }

    if (!response.ok) {
      return {
        success: false,
        message: result?.message || `Server error (${response.status}). Please try again later.`
      };
    }

    return {
      success: true,
      message: result?.message || "Successfully added to waitlist!"
    };
  } catch (error) {
    console.error('Network error:', error);
    return {
      success: false,
      message: "Network error. Please check your internet connection and try again."
    };
  }
};