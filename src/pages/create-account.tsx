import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import nuberLogo from "../images/logo.svg";
import Button from "../components/button";
import { Link, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { UserRole } from "../__generated__/globalTypes";
import {
  createAccountMutationVariables,
  createAccountMutation,
} from "../__generated__/createAccountMutation";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

const CreateAccount = () => {
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ICreateAccountForm>({
    mode: "onChange",
    defaultValues: {
      role: UserRole.Client,
    },
  });

  const history = useHistory();

  const onCompleted = (data: createAccountMutation) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      // redirect to login
      alert("Account Created! Log in now!");
      history.push("/login");
    }
  };

  const [
    createAccountMutation,
    { loading, data: createAccountMutationResult },
  ] = useMutation<createAccountMutation, createAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );

  const onSubmit = () => {
    if (!loading) {
      const { email, password, role } = getValues();
      createAccountMutation({
        variables: { createAccountInput: { email, password, role } },
      });
    }
  };
  return (
    <div className="h-screen flex items-center flex-col pt-10 lg:pt-28 ">
      <Helmet>
        <title>Create Account | Nuber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5">
        <img src={nuberLogo} className="w-40 mb-10" />
        <h4 className="text-left font-medium w-full text-3xl mb-5">
          Let's get started
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full mb-3"
        >
          <input
            {...register("email", {
              required: "Email is required.",
              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            type="email"
            name="email"
            required
            placeholder="Email"
            className="input"
          />

          {errors.email?.type === "pattern" && (
            <FormError errorMessage="Please enter a valid email." />
          )}
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          <input
            {...register("password", {
              required: "Password is required.",
              minLength: 6,
            })}
            required
            type="password"
            name="password"
            placeholder="Password"
            className="input"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {errors.password?.type === "minLength" && (
            <FormError errorMessage="Password must be more than 10 chars." />
          )}
          <select
            {...register("role", {
              required: true,
            })}
            name="role"
            className="input bg-white"
          >
            {Object.keys(UserRole).map((role, index) => (
              <option key={index}>{role}</option>
            ))}
          </select>
          <Button
            canClick={isValid}
            loading={loading}
            actionText="Create Account"
          />
          {createAccountMutationResult?.createAccount.error && (
            <FormError
              errorMessage={createAccountMutationResult.createAccount.error}
            />
          )}
        </form>
        <div>
          Already have an account?{" "}
          <Link to="/login" className="text-lime-600 hover:underline">
            Log In.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
