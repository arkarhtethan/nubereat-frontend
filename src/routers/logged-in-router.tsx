import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { isLoggedInVar } from "../apollo";
import Header from "../components/header";
import { useMe } from "../hooks/useMe";
import PageNotFound from "../pages/404";
import Category from "../pages/client/category";
import Restaurant from "../pages/client/restaurant";
import Restaurants from "../pages/client/restaurants";
import Search from "../pages/client/search";
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
  <Route key={4} path="/search">
    <Search />
  </Route>,
  <Route key={5} path="/category/:slug">
    <Category />
  </Route>,
  <Route key={6} path="/restaurant/:id">
    <Restaurant />
  </Route>,
];

const LoggedInRouter: React.FC = () => {
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
