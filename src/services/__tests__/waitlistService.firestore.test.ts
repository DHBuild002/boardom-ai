import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { addToWaitlist } from '@/services/waitlistService';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('Waitlist Service - Firestore Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should successfully add email to waitlist via Netlify function', async () => {
    // Mock successful response from Netlify function
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        message: 'Successfully added to waitlist! We\'ll notify you when boardom is ready.',
        debug: {
          email: 'test@example.com',
          documentId: 'mock-doc-id-123',
          timestamp: '2025-01-27T21:00:00.000Z',
        },
      }),
    });

    const result = await addToWaitlist('test@example.com', 'mock-recaptcha-token');

    // Verify the fetch call
    expect(mockFetch).toHaveBeenCalledWith('/.netlify/functions/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ 
        email: 'test@example.com',
        recaptchaToken: 'mock-recaptcha-token',
      }),
    });

    // Verify the result
    expect(result).toEqual({
      success: true,
      message: 'Successfully added to waitlist! We\'ll notify you when boardom is ready.',
    });
  });

  it('should handle duplicate email error from Firestore', async () => {
    // Mock 409 Conflict response (email already exists)
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 409,
      json: async () => ({
        success: false,
        message: 'This email is already on the waitlist.',
        debug: {
          email: 'duplicate@example.com',
          existingDocs: 1,
        },
      }),
    });

    const result = await addToWaitlist('duplicate@example.com', 'mock-recaptcha-token');

    expect(result).toEqual({
      success: false,
      message: 'This email is already on the waitlist.',
    });
  });

  it('should handle invalid email format error', async () => {
    // Mock 400 Bad Request response
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({
        success: false,
        message: 'Please enter a valid email address.',
        debug: {
          email: 'invalid-email',
          passedRegex: false,
        },
      }),
    });

    const result = await addToWaitlist('invalid-email', 'mock-recaptcha-token');

    expect(result).toEqual({
      success: false,
      message: 'Please enter a valid email address.',
    });
  });

  it('should handle Firebase/Firestore connection errors', async () => {
    // Mock 500 Internal Server Error response
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({
        success: false,
        message: 'Failed to join waitlist. Please try again later.',
        debug: {
          error: 'Firebase initialization failed',
          details: 'Invalid private key format',
        },
      }),
    });

    const result = await addToWaitlist('test@example.com', 'mock-recaptcha-token');

    expect(result).toEqual({
      success: false,
      message: 'Failed to join waitlist. Please try again later.',
    });
  });

  it('should handle network errors gracefully', async () => {
    // Mock network failure
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await addToWaitlist('test@example.com', 'mock-recaptcha-token');

    expect(result).toEqual({
      success: false,
      message: 'Network error. Please check your internet connection and try again.',
    });
  });

  it('should handle malformed JSON response', async () => {
    // Mock response with invalid JSON
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => {
        throw new Error('Invalid JSON');
      },
    });

    const result = await addToWaitlist('test@example.com', 'mock-recaptcha-token');

    expect(result).toEqual({
      success: false,
      message: 'Server response error. Please try again later.',
    });
  });

  it('should normalize email to lowercase', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        message: 'Successfully added to waitlist!',
      }),
    });

    await addToWaitlist('TEST@EXAMPLE.COM', 'mock-recaptcha-token');

    // Verify email was normalized to lowercase
    expect(mockFetch).toHaveBeenCalledWith('/.netlify/functions/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ 
        email: 'test@example.com',
        recaptchaToken: 'mock-recaptcha-token',
      }),
    });
  });

  it('should handle missing reCAPTCHA token', async () => {
    const result = await addToWaitlist('test@example.com');

    // Should still make the request but without recaptchaToken
    expect(mockFetch).toHaveBeenCalledWith('/.netlify/functions/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ 
        email: 'test@example.com',
      }),
    });
  });
});