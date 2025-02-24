// ✅ Extend Jest with additional matchers
import "@testing-library/jest-dom";
import "jest-extended"; // Provides extra matchers like `.toBeOneOf()`

// ✅ Mock console errors to catch unexpected warnings in tests
beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation((message) => {
    // Ignore known warnings from libraries (like React hydration warnings)
    const ignoredWarnings = [
      "ReactDOM.render is no longer supported in React 18", // Example React 18 warning
    ];

    if (ignoredWarnings.some((warning) => message.includes(warning))) {
      return;
    }

    // Throw error for unhandled warnings
    throw new Error(`🚨 Console Error Detected: ${message}`);
  });

  jest.spyOn(console, "warn").mockImplementation((message) => {
    throw new Error(`⚠️ Console Warning Detected: ${message}`);
  });
});

// ✅ Restore console mocks after each test
afterEach(() => {
  jest.restoreAllMocks();
});
