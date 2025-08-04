import '@testing-library/jest-dom';

// Mock environment variables
Object.defineProperty(import.meta, 'env', {
  value: {
    VITE_RECAPTCHA_SITE_KEY: 'test-site-key-123456',
    VITE_FIREBASE_API_KEY: 'test-firebase-api-key',
    VITE_FIREBASE_PROJECT_ID: 'test-project-id',
  },
  writable: true,
});

// Mock window.grecaptcha
global.window.grecaptcha = {
  render: vi.fn(),
  reset: vi.fn(),
  getResponse: vi.fn(),
};

global.window.recaptchaReady = false;

// Mock fetch globally
global.fetch = vi.fn();