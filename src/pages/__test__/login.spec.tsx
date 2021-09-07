import { ApolloProvider } from "@apollo/client";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import {
  getByRole,
  render,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import Login from "../login";
import userEvent from "@testing-library/user-event";
import { LOGIN_MUTATION } from "../login";

describe("<Login/>", () => {
  let renderResult: RenderResult;
  let mockedClient: MockApolloClient;
  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <HelmetProvider>
          <BrowserRouter>
            <ApolloProvider client={mockedClient}>
              <Login />
            </ApolloProvider>
          </BrowserRouter>
        </HelmetProvider>
      );
    });
  });

  it("should renders OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Login | Nuber Eats");
    });
  });

  it("should display email validation errors", async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    await waitFor(() => {
      userEvent.type(email, "this@wont");
    });
    let errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/Please enter a valid email./i);
    await waitFor(() => {
      userEvent.clear(email);
    });
    errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/Email is required./i);
  });

  it("should display password required errors ", async () => {
    const { getByPlaceholderText, getByRole, debug } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const submit = getByRole("button");
    await waitFor(() => {
      userEvent.type(email, "this@wont.com");
      userEvent.click(submit);
    });
    let errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/password is required./i);
  });

  it("submits form and calls mutation. ", async () => {
    const formData = {
      email: "real@test.com",
      password: "123",
    };
    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        login: { ok: true, error: "mutation-error", token: "xxx" },
      },
    });
    mockedClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);
    const { getByPlaceholderText, getByRole, debug } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitBtn = getByRole("button");
    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(submitBtn);
    });
    expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedMutationResponse).toHaveBeenCalledWith({
      loginInput: {
        ...formData,
      },
    });
    let errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/mutation-error/i);
  });
});
