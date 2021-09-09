import { gql, useApolloClient, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Button from "../../components/button";
import { FormError } from "../../components/form-error";
import {
  createRestaurant,
  createRestaurantVariables,
} from "../../__generated__/createRestaurant";
import { MY_RESTAURANTS } from "./my-restaurants";

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      error
      ok
      restaurantId
    }
  }
`;

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
  file: FileList;
}

const CreateRestaurant = () => {
  const client = useApolloClient();
  const location = useHistory();
  const [imageUrl, setImageUrl] = useState("");
  const onCompleted = (data: createRestaurant) => {
    const {
      createRestaurant: { ok, restaurantId },
    } = data;
    if (ok) {
      setUploading(false);
      const queryResult = client.readQuery({ query: MY_RESTAURANTS });
      if (queryResult) {
        const { name, categoryName, address } = getValues();
        client.writeQuery({
          query: MY_RESTAURANTS,
          data: {
            myRestaurants: {
              ...queryResult.myRestaurants,
              restaurants: [
                ...queryResult.myRestaurants.restaurants,
                {
                  address: address,
                  category: {
                    name: categoryName,
                    __typename: "Category",
                  },
                  coverImage: imageUrl,
                  id: restaurantId,
                  isPromoted: false,
                  name,
                  __typename: "Restaurant",
                },
              ],
            },
          },
        });
        location.push("/");
      }
    }
  };
  const [createRestaurantMutation, { loading, error, data }] = useMutation<
    createRestaurant,
    createRestaurantVariables
  >(CREATE_RESTAURANT_MUTATION, { onCompleted });
  const { register, getValues, formState, handleSubmit } = useForm<IFormProps>({
    mode: "onChange",
  });
  const [uploading, setUploading] = useState(false);
  const onSubmit = async () => {
    try {
      setUploading(true);
      const { file, name, categoryName, address } = getValues();
      const actualFile = file[0];
      const formBody = new FormData();
      formBody.append("file", actualFile);
      const { url: coverImage } = await (
        await fetch("http://localhost:3000/uploads", {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formBody,
        })
      ).json();
      setImageUrl(coverImage);
      createRestaurantMutation({
        variables: {
          input: {
            name,
            categoryName,
            address,
            coverImage,
          },
        },
      });
    } catch (error) {}
  };

  return (
    <div className="container flex flex-col items-center mt-24">
      <Helmet>
        <title>Add Restaurant | Nuber Eats</title>
      </Helmet>
      <h1 className="font-semibold text-2xl mb-3">Add Restaurant</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
      >
        <input
          type="text"
          className="input"
          placeholder="Name"
          {...register("name", { required: "Name is required." })}
        />
        <input
          type="text"
          className="input"
          placeholder="Address"
          {...register("address", { required: "Address is required." })}
        />
        <input
          type="text"
          className="input"
          placeholder="Category Name"
          {...register("categoryName", {
            required: "Category Name is required.",
          })}
        />
        <div>
          <input
            accept="image/*"
            type="file"
            {...register("file", { required: true })}
          />
        </div>
        <Button
          loading={uploading}
          canClick={formState.isValid}
          actionText="Create Restaurant"
        />
        {data?.createRestaurant?.error && (
          <FormError errorMessage={data?.createRestaurant?.error} />
        )}
      </form>
    </div>
  );
};

export default CreateRestaurant;
