import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";

import { TEXT } from "../../constants/Text";
import CreateAccountScreen from "../screens/CreateAccountScreen";

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

describe("CreateAccountScreen", () => {
  const setup = () => {
    return render(
      <CreateAccountScreen
        navigation={{ navigate: mockNavigate, goBack: mockGoBack }}
      />
    );
  };

  beforeEach(() => {
    mockNavigate.mockClear();
    mockGoBack.mockClear();
  });

  it("check all Text renders correctly", () => {
    const { getByText, getByPlaceholderText } = setup();

    expect(screen.getByText(TEXT.CREATE_ACCOUNT)).toBeTruthy();
    expect(screen.getByPlaceholderText(TEXT.FIRST_NAME)).toBeTruthy();
    expect(getByPlaceholderText(TEXT.LAST_NAME)).toBeTruthy();
    expect(getByPlaceholderText(TEXT.EMAIL_PLACEHOLDER)).toBeTruthy();
    expect(getByPlaceholderText(TEXT.PASSWORD)).toBeTruthy();
    expect(getByText(TEXT.CONTINUE)).toBeTruthy();
    expect(getByText(TEXT.RESET)).toBeTruthy();
  });

  it("navigates to ForgotPasswordScreen when reset link is pressed", () => {
    const { getByText } = setup();

    const resetLink = getByText(TEXT.RESET);
    fireEvent.press(resetLink);
    expect(mockNavigate).toHaveBeenCalledWith("ForgotPasswordScreen");
  });

  it("navigates to SignInScreen when Continue button is pressed", () => {
    const { getByText } = setup();

    const continueButton = getByText(TEXT.CONTINUE);
    fireEvent.press(continueButton);
    expect(mockNavigate).toHaveBeenCalledWith("SignInScreen");
  });
});
