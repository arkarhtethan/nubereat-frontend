import { ApolloError, gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import {
  LogInMutation,
  LogInMutationVariables,
} from "../__generated__/LogInMutation";
import nuberLogo from "../images/logo.svg";
import Button from "../components/button";
import { Link } from "react-router-dom";

const LOGIN_MUTATION = gql`
  mutation LogInMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ILoginForm>({
    mode: "onChange",
  });

  const onCompleted = (data: LogInMutation) => {
    if (data.login.ok) {
      const {
        login: { ok, token },
      } = data;
      if (ok) {
        console.log(token);
      }
    }
  };

  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    LogInMutation,
    LogInMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });
  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };
  return (
    <div className="h-screen flex items-center flex-col pt-10 lg:pt-28 ">
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5">
        <img src={nuberLogo} className="w-40 mb-10" />
        <h4 className="text-left font-medium w-full text-3xl mb-5">
          Welcome back
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full mb-3"
        >
          <input
            {...register("email", { required: "Email is required." })}
            type="email"
            name="email"
            required
            placeholder="Email"
            className="input"
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          <input
            {...register("password", {
              required: "Password is required.",
              minLength: 10,
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
          <Button canClick={isValid} loading={loading} actionText="Log In" />
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
        <div>
          New to Nuber?{" "}
          <Link to="/create-account" className="text-lime-600 hover:underline">
            Create an Account.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;