import { gql, useLazyQuery } from "@apollo/client";
import React, { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useHistory, useLocation } from "react-router-dom";
import Restaurant from "../../components/restaurant";
import { RESTAURANT_FRAGMENT } from "../../fragment";
import {
  searchRestaurant,
  searchRestaurantVariables,
} from "../../__generated__/searchRestaurant";
import ResultNotFound from "../result-not-found";

const SEARCH_RESTAURANT = gql`
  query searchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      error
      ok
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

const Search = () => {
  const location = useLocation();
  const history = useHistory();
  const [page, setPage] = useState(1);

  const [executeQuery, { loading, data, called }] = useLazyQuery<
    searchRestaurant,
    searchRestaurantVariables
  >(SEARCH_RESTAURANT);

  const [_, query] = location.search.split("?term=");
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);

  useEffect(() => {
    if (!query) {
      return history.replace("/");
    }
    if (!called) {
      executeQuery({
        variables: {
          input: {
            page: 1,
            query,
          },
        },
      });
    }
  }, [history, location, called]);

  return (
    <div>
      <Helmet>
        <title> Search | Nuber Eats</title>
      </Helmet>
      {!loading &&
      data?.searchRestaurant.restaurants &&
      data?.searchRestaurant.restaurants?.length > 0 ? (
        <div className="max-w-screen-xl mx-auto mt-4 pb-20">
          <div className="py-16 bg-gray-200 pl-16">
            <h1 className="font-semibold text-4xl mb-4">“{query}”</h1>
            <h4 className="text-lg">
              {data?.searchRestaurant.restaurants.length} Results for “{query}”.
            </h4>
          </div>
          <div className=" px-5">
            <div className="grid md:grid-cols-3 gap-x-5 gap-y-10 mt-10">
              {data?.searchRestaurant.restaurants?.map((restaurant) => {
                return (
                  <Restaurant
                    key={restaurant.id}
                    id={restaurant.id}
                    coverImage={restaurant.coverImage}
                    categoryName={restaurant.category?.name}
                    name={restaurant.name}
                  />
                );
              })}
            </div>
            <div className="grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10">
              {page > 1 ? (
                <button
                  onClick={onPrevPageClick}
                  className="focus:outline-none font-medium text-2xl"
                >
                  &larr;
                </button>
              ) : (
                <div></div>
              )}
              <span className="mx-5">
                Page {page} of {data?.searchRestaurant?.totalPages}
              </span>
              {page !== data?.searchRestaurant?.totalPages ? (
                <button
                  onClick={onNextPageClick}
                  className="focus:outline-none font-medium text-2xl"
                >
                  &rarr;
                </button>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <ResultNotFound query={query} />
      )}
    </div>
  );
};

export default Search;
