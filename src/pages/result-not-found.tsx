import React from "react";
import { Link } from "react-router-dom";

interface IResultNotFoundProps {
  query: string;
}

const ResultNotFound: React.FC<IResultNotFoundProps> = ({ query }) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h2 className="font-semibold text-2xl mb-3">
        We didn’t find a match for “{query}”.
      </h2>
      <h4 className="font-medium text-base mb-5">
        Try searching for something else instead.
      </h4>
      <Link className="btn text-white px-16" to="/">
        View All Restaurants
      </Link>
    </div>
  );
};

export default ResultNotFound;
