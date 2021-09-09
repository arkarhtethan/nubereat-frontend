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
import CreateRestaurant from "../pages/owner/create-restaurant";
import MyRestaurants from "../pages/owner/my-restaurants";
import ConfirmEmail from "../pages/user/confirm-email";
import EditProfile from "../pages/user/edit-profile";

const clientRoutes = [
  {
    path: "/",
    component: <Restaurants />,
  },
  {
    path: "/search",
    component: <Search />,
  },
  {
    path: "/category/:slug",
    component: <Category />,
  },
  {
    path: "/restaurant/:id",
    component: <Restaurant />,
  },
];

const commonRoutes = [
  { path: "/confirm", component: <ConfirmEmail /> },
  { path: "/edit-profile", component: <EditProfile /> },
];

const restaurantRoutes = [
  { path: "/", component: <MyRestaurants /> },
  { path: "/create-restaurant", component: <CreateRestaurant /> },
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
        {data.me.role === "Client" &&
          clientRoutes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        {data.me.role === "Owner" &&
          restaurantRoutes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        {commonRoutes.map((route) => (
          <Route key={route.path} path={route.path}>
            {route.component}
          </Route>
        ))}
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default LoggedInRouter;
