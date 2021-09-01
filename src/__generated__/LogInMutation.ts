/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: LogInMutation
// ====================================================

export interface LogInMutation_login {
  __typename: "LoginOutput";
  ok: boolean;
  token: string | null;
  error: string | null;
}

export interface LogInMutation {
  login: LogInMutation_login;
}

export interface LogInMutationVariables {
  loginInput: LoginInput;
}
