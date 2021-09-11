import React from "react";

interface IDishProps {
  name: string;
  description: string;
  price: number;
}

const Dish: React.FC<IDishProps> = ({ name, description, price }) => {
  return (
    <div className="px-8 pt-3 pb-4 border hover:border-gray-600 transition-all">
      <div className="mb-3">
        <h3 className="font-semibold">{name}</h3>
        <h5 className="font-medium">{description}</h5>
      </div>
      <span>$ {price}</span>
    </div>
  );
};

export default Dish;
