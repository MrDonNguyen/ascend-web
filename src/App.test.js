import { render, screen } from "@testing-library/react";
import App from "./App";

describe("🧪 Ascend Meetups App Tests", () => {
  // ✅ Test if the header renders properly
  test("renders the Ascend Meetups header", () => {
    render(<App />);
    const headerElement = screen.getByRole("heading", { name: /Welcome to Ascend Meetups/i });
    expect(headerElement).toBeInTheDocument();
  });

  // ✅ Test if the Upcoming Meetups section is present
  test("renders the Upcoming Meetups section", () => {
    render(<App />);
    const meetupsHeading = screen.getByRole("heading", { name: /Upcoming Meetups/i });
    expect(meetupsHeading).toBeInTheDocument();
  });

  // ✅ Test if the "No meetups found" message appears when no meetups exist
  test("displays a message when there are no meetups", () => {
    render(<App />);
    const noMeetupsMessage = screen.getByText(/No meetups found/i);
    expect(noMeetupsMessage).toBeInTheDocument();
  });

  // ✅ Test if the form is present
  test("renders the Meetup Form", () => {
    render(<App />);
    const formTitle = screen.getByText(/Create a Meetup/i);
    expect(formTitle).toBeInTheDocument();
  });

  // ✅ Test if the Add Meetup button exists
  test("renders the Add Meetup button", () => {
    render(<App />);
    const addButton = screen.getByRole("button", { name: /add meetup/i });
    expect(addButton).toBeInTheDocument();
  });
});
