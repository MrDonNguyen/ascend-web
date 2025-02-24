import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the Ascend Meetups header", () => {
  render(<App />);
  
  // ✅ Check if the app header is present
  const headerElement = screen.getByText(/Welcome to Ascend Meetups/i);
  expect(headerElement).toBeInTheDocument();
});

test("renders the Upcoming Meetups section", () => {
  render(<App />);
  
  // ✅ Check if the "Upcoming Meetups" section exists
  const meetupsHeading = screen.getByText(/Upcoming Meetups/i);
  expect(meetupsHeading).toBeInTheDocument();
});
