// ✅ Extend Jest with additional matchers
import "@testing-library/jest-dom";
import "jest-extended"; // Provides extra matchers like `.toBeOneOf()`

// ✅ List of known warnings to ignore
const ignoredWarnings = [
  "ReactDOM.render is no longer supported in React 18", // Example React 18 warning
  "Warning: Each child in a list should have a unique 'key' prop", // Common React warning
];

beforeEach(() => {
  // ✅ Mock console.error and filter out expected warnings
  jest.spyOn(console, "error").mockImplementation((message) => {
    if (ignoredWarnings.some((warning) => message.includes(warning))) {
      return;
    }
    throw new Error(`🚨 Console Error Detected: ${message}`);
  });

  // ✅ Mock console.warn and throw errors for unhandled warnings
  jest.spyOn(console, "warn").mockImplementation((message) => {
    throw new Error(`⚠️ Console Warning Detected: ${message}`);
  });
});

// ✅ Restore console mocks after each test
afterEach(() => {
  jest.restoreAllMocks();
});
