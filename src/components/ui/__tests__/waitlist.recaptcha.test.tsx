import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Component as WaitlistComponent } from '@/components/ui/waitlist';

// Mock the waitlist service
vi.mock('@/services/waitlistService', () => ({
  addToWaitlist: vi.fn(),
}));

describe('Waitlist Component - reCAPTCHA Integration', () => {
  const mockRender = vi.fn();
  const mockReset = vi.fn();
  const mockGetResponse = vi.fn();

  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks();
    
    // Mock window.grecaptcha
    global.window.grecaptcha = {
      render: mockRender,
      reset: mockReset,
      getResponse: mockGetResponse,
    };
    
    global.window.recaptchaReady = true;
    
    // Mock location to simulate production environment (not WebContainer)
    Object.defineProperty(window, 'location', {
      value: {
        hostname: 'example.com',
      },
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render reCAPTCHA widget when API is ready and not in WebContainer', async () => {
    render(<WaitlistComponent mode="light" />);

    // Wait for component to mount and useEffect to run
    await waitFor(() => {
      expect(mockRender).toHaveBeenCalledWith(
        expect.any(HTMLElement),
        expect.objectContaining({
          sitekey: 'test-site-key-123456',
          callback: expect.any(Function),
          'expired-callback': expect.any(Function),
          'error-callback': expect.any(Function),
        })
      );
    });
  });

  it('should not render reCAPTCHA in WebContainer environment', async () => {
    // Mock WebContainer environment
    Object.defineProperty(window, 'location', {
      value: {
        hostname: 'webcontainer-api.io',
      },
      writable: true,
    });

    render(<WaitlistComponent mode="light" />);

    // Wait a bit to ensure useEffect has run
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(mockRender).not.toHaveBeenCalled();
    expect(screen.getByText(/reCAPTCHA is disabled in development environment/)).toBeInTheDocument();
  });

  it('should show configuration warning when site key is missing', async () => {
    // Mock missing site key
    Object.defineProperty(import.meta, 'env', {
      value: {
        VITE_RECAPTCHA_SITE_KEY: undefined,
      },
      writable: true,
    });

    render(<WaitlistComponent mode="light" />);

    expect(screen.getByText(/reCAPTCHA is not configured/)).toBeInTheDocument();
  });

  it('should handle reCAPTCHA callback and enable form submission', async () => {
    const user = userEvent.setup();
    let recaptchaCallback: (token: string) => void;

    // Capture the callback function when render is called
    mockRender.mockImplementation((element, config) => {
      recaptchaCallback = config.callback;
    });

    render(<WaitlistComponent mode="light" />);

    // Wait for reCAPTCHA to render
    await waitFor(() => {
      expect(mockRender).toHaveBeenCalled();
    });

    // Enter email
    const emailInput = screen.getByPlaceholderText('Your email');
    await user.type(emailInput, 'test@example.com');

    // Initially, submit button should be disabled (no reCAPTCHA token)
    const submitButton = screen.getByRole('button', { name: /join/i });
    expect(submitButton).toBeDisabled();

    // Simulate reCAPTCHA callback with token
    recaptchaCallback!('test-recaptcha-token');

    // Now submit button should be enabled
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('should handle reCAPTCHA expiration and disable form submission', async () => {
    const user = userEvent.setup();
    let recaptchaCallback: (token: string) => void;
    let expiredCallback: () => void;

    // Capture the callbacks when render is called
    mockRender.mockImplementation((element, config) => {
      recaptchaCallback = config.callback;
      expiredCallback = config['expired-callback'];
    });

    render(<WaitlistComponent mode="light" />);

    // Wait for reCAPTCHA to render
    await waitFor(() => {
      expect(mockRender).toHaveBeenCalled();
    });

    // Enter email and get reCAPTCHA token
    const emailInput = screen.getByPlaceholderText('Your email');
    await user.type(emailInput, 'test@example.com');
    recaptchaCallback!('test-recaptcha-token');

    const submitButton = screen.getByRole('button', { name: /join/i });
    
    // Button should be enabled with token
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    // Simulate reCAPTCHA expiration
    expiredCallback!();

    // Button should be disabled again
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  it('should reset reCAPTCHA after successful form submission', async () => {
    const user = userEvent.setup();
    let recaptchaCallback: (token: string) => void;

    // Mock successful waitlist service response
    const { addToWaitlist } = await import('@/services/waitlistService');
    vi.mocked(addToWaitlist).mockResolvedValue({
      success: true,
      message: 'Successfully added to waitlist!',
    });

    mockRender.mockImplementation((element, config) => {
      recaptchaCallback = config.callback;
    });

    render(<WaitlistComponent mode="light" />);

    // Wait for reCAPTCHA to render
    await waitFor(() => {
      expect(mockRender).toHaveBeenCalled();
    });

    // Fill form and submit
    const emailInput = screen.getByPlaceholderText('Your email');
    await user.type(emailInput, 'test@example.com');
    recaptchaCallback!('test-recaptcha-token');

    const submitButton = screen.getByRole('button', { name: /join/i });
    await user.click(submitButton);

    // Wait for successful submission
    await waitFor(() => {
      expect(screen.getByText(/You are on the waitlist/)).toBeInTheDocument();
    });

    // Verify reCAPTCHA was reset
    expect(mockReset).toHaveBeenCalled();
  });

  it('should listen for recaptcha-api-ready event', async () => {
    // Start with API not ready
    global.window.recaptchaReady = false;

    render(<WaitlistComponent mode="light" />);

    // reCAPTCHA should not render initially
    expect(mockRender).not.toHaveBeenCalled();

    // Simulate the API becoming ready
    global.window.recaptchaReady = true;
    const event = new Event('recaptcha-api-ready');
    document.dispatchEvent(event);

    // Wait for the event handler to process
    await waitFor(() => {
      expect(mockRender).toHaveBeenCalled();
    });
  });
});