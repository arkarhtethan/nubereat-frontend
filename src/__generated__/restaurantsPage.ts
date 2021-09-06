/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RestaurantsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: restaurantsPage
// ====================================================

export interface restaurantsPage_allCategories_categories {
  __typename: "Category";
  id: number;
  name: string;
  coverImage: string | null;
  slug: string;
  restaurantCount: number;
}

export interface restaurantsPage_allCategories {
  __typename: "AllCategoriesOutput";
  ok: boolean;
  error: string | null;
  categories: restaurantsPage_allCategories_categories[] | null;
}

export interface restaurantsPage_restaurants_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface restaurantsPage_restaurants_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: restaurantsPage_restaurants_restaurants_category | null;
  address: string;
  isPromoted: boolean;
}

export interface restaurantsPage_restaurants {
  __typename: "RestaurantsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  restaurants: restaurantsPage_restaurants_restaurants[] | null;
}

export interface restaurantsPage {
  allCategories: restaurantsPage_allCategories;
  restaurants: restaurantsPage_restaurants;
}

export interface restaurantsPageVariables {
  input: RestaurantsInput;
}
