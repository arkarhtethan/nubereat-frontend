import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Helmet>
        <title>Page Not Found | Nuber Eats</title>
      </Helmet>
      <h2 className="font-semibold text-2xl mb-3">Page Not Found.</h2>
      <h4 className="font-medium text-base mb-5">
        The page you're looking for doesn't exists or has moved.
      </h4>
      <Link className="hover:underline text-lime-600" to="/">
        Go back home &rarr;
      </Link>
    </div>
  );
};

export default PageNotFound;
