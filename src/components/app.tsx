import { useReactiveVar } from "@apollo/client";
import React from "react";
import { isLoggedInVar } from "../apollo";
import LoggedInRouter from "../routers/logged-in-router";
import LoggedOutRouter from "../routers/logged-out-router";

export const App: React.FC = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
};
