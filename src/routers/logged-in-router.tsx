import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { isLoggedInVar } from "../apollo";
import Header from "../components/header";
import { useMe } from "../hooks/useMe";
import PageNotFound from "../pages/404";
import Restaurants from "../pages/client/restaurants";
import ConfirmEmail from "../pages/user/confirm-email";
import EditProfile from "../pages/user/edit-profile";

const ClientRoute = [
  <Route key={1} path="/" exact>
    <Restaurants />
  </Route>,
  <Route key={2} path="/confirm" exact>
    <ConfirmEmail />
  </Route>,
  <Route key={3} path="/edit-profile" exact>
    <EditProfile />
  </Route>,
];

const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (error) {
    isLoggedInVar(false);
  }
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading....</span>
      </div>
    );
  }
  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === "Client" && ClientRoute}
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default LoggedInRouter;
