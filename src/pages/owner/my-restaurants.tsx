import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Restaurant from "../../components/restaurant";
import { RESTAURANT_FRAGMENT } from "../../fragment";
import { myRestaurants } from "../../__generated__/myRestaurants";

export const MY_RESTAURANTS = gql`
  query myRestaurants {
    myRestaurants {
      ok
      error
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

const MyRestaurants = () => {
  const { data } = useQuery<myRestaurants>(MY_RESTAURANTS);
  return (
    <div>
      <Helmet>
        <title>My Restaurants | Uber</title>
      </Helmet>
      <div className="max-w-screen-2xl mx-auto mt-16 px-5">
        <h2 className="text-xl font-medium mb-10">My Restaurants</h2>
        {data?.myRestaurants.ok &&
        data.myRestaurants.restaurants.length === 0 ? (
          <>
            <h4 className="text-xl mb-5">You have no restaurants.</h4>
            <Link
              className="text-lime-600 hove:underline"
              to="/create-restaurant"
            >
              Create one &rarr;
            </Link>
          </>
        ) : (
          <div className="grid md:grid-cols-3 gap-x-5 gap-y-10 mt-10">
            {data?.myRestaurants.restaurants?.map((restaurant) => {
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
        )}
      </div>
    </div>
  );
};

export default MyRestaurants;
