import React from "react";
import App from "./App";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { renderWithProviders } from "./test-utils";
import { beforeEach } from "vitest";

describe("Given user visit page", () => {
  beforeEach(() => {
    renderWithProviders(<App />);
  });
  it("should render a create account button", () => {
    expect(screen.getByText(/Create Account/i)).toBeInTheDocument();
  });
  describe("When user click on create account button", () => {
    beforeEach(() => {
      const navButton = screen.getByText(/Create Account/i);
      fireEvent.click(navButton);
    });
    it("should render a modal", () => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
    it("should render an account creation form first", () => {
      expect(screen.getByText(/Create An Account/i)).toBeInTheDocument();
      expect(
        screen.queryByText(/Provide account details/i)
      ).not.toBeInTheDocument();
    });
    it("should disable submit button by default", () => {
      const formSubmitButton = screen.getByTestId(/form-button/i);
      expect(formSubmitButton).toBeDisabled();
    });
    describe("When user close the modal", () => {
      it("should close the modal", async () => {
        const closeButton = screen.getByTestId(/close-button/i);
        fireEvent.click(closeButton);
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      });
      it("should reset all form value when reopen", () => {
        const firstNameField = screen.getByTestId(/firstName/i);
        fireEvent.input(firstNameField, {
          target: {
            value: "testFirstName",
          },
        });
        const closeButton = screen.getByTestId(/close-button/i);
        fireEvent.click(closeButton);
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
        const navButton = screen.getByTestId(/create-account-button/i);
        fireEvent.click(navButton);
        expect(screen.getByRole("dialog")).toBeInTheDocument();
        expect(screen.getByTestId(/firstName/i).getAttribute("value")).toBe("");
      });
    });
    describe("When user fill some input fields and submit", () => {
      beforeEach(() => {
        const firstNameField = screen.getByTestId(/firstName/i);
        const checkBoxField = screen.getByTestId(/termsAgreement/i);
        const formSubmitButton = screen.getByTestId(/form-button/i);
        fireEvent.input(firstNameField, {
          target: {
            value: "testFirstName",
          },
        });
        fireEvent.click(checkBoxField);
        fireEvent.click(formSubmitButton);
      });
      it("should output error message", () => {
        expect(screen.getByText(/Last Name is required/i)).toHaveClass(
          "opacity-100"
        );
        expect(screen.getByText(/Email is required/i)).toHaveClass(
          "opacity-100"
        );
        expect(screen.getByText(/Password is required/i)).toHaveClass(
          "opacity-100"
        );
        expect(screen.getByText(/Accept these terms to continue/i)).toHaveClass(
          "opacity-100"
        );
      });
      describe("When user interact with error field", () => {
        beforeEach(() => {
          const firstNameField = screen.getByTestId(/firstName/i);
          fireEvent.input(firstNameField, {
            target: {
              value: "testFirstName",
            },
          });
        });
        it("should hide error message", () => {
          expect(screen.getByText("First Name is required")).toHaveClass(
            "opacity-0"
          );
        });
      });
    });
    describe("When user fill all input fields and submit", () => {
      beforeEach(() => {
        const firstNameField = screen.getByTestId(/firstName/i);
        const lastNameField = screen.getByTestId(/lastName/i);
        const emailField = screen.getByTestId(/email/i);
        const passwordField = screen.getByTestId(/password/i);
        const checkBoxField = screen.getByTestId(/termsAgreement/i);
        fireEvent.input(firstNameField, {
          target: {
            value: "testFirstName",
          },
        });
        fireEvent.input(lastNameField, {
          target: {
            value: "testLastName",
          },
        });
        fireEvent.input(emailField, {
          target: {
            value: "testEmail@gmail.com",
          },
        });
        fireEvent.input(passwordField, {
          target: {
            value: "testPassword",
          },
        });
        fireEvent.click(checkBoxField);
      });
      it("should contain correct value", () => {
        const firstNameField = screen.getByTestId(/firstName/i);
        const lastNameField = screen.getByTestId(/lastName/i);
        const emailField = screen.getByTestId(/email/i);
        const passwordField = screen.getByTestId(/password/i);
        const checkBoxField = screen.getByTestId(/termsAgreement/i);
        expect(firstNameField.getAttribute("value")).toBe("testFirstName");
        expect(lastNameField.getAttribute("value")).toBe("testLastName");
        expect(emailField.getAttribute("value")).toBe("testEmail@gmail.com");
        expect(passwordField.getAttribute("value")).toBe("testPassword");
        expect(screen.queryByText("is required")).not.toBeInTheDocument();
        expect(checkBoxField.checked).toEqual(true);
      });
      it("should submit and go to account details form", async () => {
        const formSubmitButton = screen.getByTestId(/form-button/i);
        fireEvent.click(formSubmitButton);
        await waitFor(() => {
          expect(
            screen.getByText(/Provide account details/i)
          ).toBeInTheDocument();
          expect(screen.getByText(/Complete now/i)).toBeDisabled();
        });
      });
    });
  });
});
