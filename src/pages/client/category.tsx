import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useParams } from "react-router-dom";
import Restaurant from "../../components/restaurant";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragment";
import { category, categoryVariables } from "../../__generated__/category";

interface ICategoryParams {
  slug: string;
}

const CATEGORY_QUERY = gql`
  query category($input: CategoryInput!) {
    category(input: $input) {
      error
      ok
      totalPages
      totalResults
      category {
        restaurants {
          ...RestaurantParts
        }
        ...CategoryParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

const Category = () => {
  const params = useParams<ICategoryParams>();
  const [page, setPage] = useState(1);
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);

  const { data, loading } = useQuery<category, categoryVariables>(
    CATEGORY_QUERY,
    {
      variables: {
        input: {
          page: 1,
          slug: params.slug,
        },
      },
    }
  );
  console.log(data?.category.category.restaurants);
  return (
    <div>
      <Helmet>
        <title> Category | Nuber Eats</title>
      </Helmet>
      {!loading &&
        data?.category.category.restaurants &&
        data?.category.category.restaurants?.length > 0 && (
          <div className="max-w-screen-xl mx-auto mt-4 px-5 pb-20">
            <div>
              <h1 className="font-semibold text-2xl">
                “{data?.category.category.name}”
              </h1>
              <h4>
                {data?.category.category.restaurants?.length} Results for “
                {data?.category.category.name}
                ”.
              </h4>
            </div>
            <div className="grid md:grid-cols-3 gap-x-5 gap-y-10 mt-10">
              {data?.category.category.restaurants?.map((restaurant) => {
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
                Page {page} of {data?.category.totalPages}
              </span>
              {page !== data?.category.totalPages ? (
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
        )}
    </div>
  );
};

export default Category;
