import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { RESTAURANT_FRAGMENT } from "../../fragment";
import {
  restaurant,
  restaurantVariables,
} from "../../__generated__/restaurant";

const RESTAURANT_QUERY = gql`
  query restaurant($input: RestaurantInput!) {
    restaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        category {
          name
          slug
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

interface IRestaurantParams {
  id: string;
}

const Restaurant = () => {
  const params = useParams<IRestaurantParams>();
  const { loading, data } = useQuery<restaurant, restaurantVariables>(
    RESTAURANT_QUERY,
    {
      variables: {
        input: {
          restaurantId: +params.id,
        },
      },
    }
  );

  return (
    <div>
      <div
        className="py-36 bg-cover bg-no-repeat bg-center bg-gray-800"
        style={{
          backgroundImage: `url(${data?.restaurant.restaurant?.coverImage})`,
        }}
      >
        <div className="bg-white w-3/12 py-3 pl-16">
          <h4 className="text-2xl font-semibold mb-2">
            {data?.restaurant.restaurant?.name}
          </h4>
          <h5 className="text-small font-light mb-2">
            <Link
              className="underline"
              to={`/category/${data?.restaurant?.restaurant?.category?.slug}`}
            >
              {data?.restaurant?.restaurant?.category?.name}
            </Link>
          </h5>
          <h6 className="mb-2">{data?.restaurant?.restaurant?.address}</h6>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
