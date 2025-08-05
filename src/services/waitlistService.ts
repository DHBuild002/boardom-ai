export const addToWaitlist = async (email: string, recaptchaToken?: string): Promise<{ success: boolean; message: string }> => {
  try {
    // Check if we're in development mode (Vite dev server)
    const isDevelopment = import.meta.env.DEV;
    
    if (isDevelopment) {
      // In development, simulate the waitlist functionality
      console.log('Development mode: Simulating waitlist signup for:', email);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate success (you can change this to test error states)
      return {
        success: true,
        message: "Successfully added to waitlist! (Development mode - not actually saved)"
      };
    }
    
    // Production: Call Netlify function
    console.log('Production mode: Calling Netlify function...');
    const requestBody: { email: string; recaptchaToken?: string } = { 
      email: email.toLowerCase() 
    };

    if (recaptchaToken) {
      requestBody.recaptchaToken = recaptchaToken;
    }

    const response = await fetch('/.netlify/functions/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
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
        message: result?.message || `Server error (${response.status}). Please try again later.`
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