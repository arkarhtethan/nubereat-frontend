import React from "react";
import { Link } from "react-router-dom";
interface IRestaurantProps {
  id: number;
  coverImage: string;
  name: string;
  categoryName?: string;
}

const Restaurant: React.FC<IRestaurantProps> = ({
  id,
  coverImage,
  name,
  categoryName,
}) => {
  return (
    <Link to={`/restaurant/${id}`}>
      <div key={id} className="flex flex-col">
        <div
          className="py-28 bg-cover bg-center mb-3"
          style={{ backgroundImage: `url(${coverImage})` }}
        ></div>
        <h3 className="text-xl font-medium">{name}</h3>
        <span className="border-t mt-2 text-xs opacity-50 py-2 border-gray-300">
          {categoryName}
        </span>
      </div>
    </Link>
  );
};

export default Restaurant;
