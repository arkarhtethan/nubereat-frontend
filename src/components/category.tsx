import React from "react";

interface ICategoryProps {
  coverImage?: string;
  name: string;
}

const Category: React.FC<ICategoryProps> = ({ coverImage: image, name }) => {
  return (
    <div className="flex flex-col group items-center cursor-pointer">
      <div
        className="w-16 h-16 rounded-full bg-cover group-hover:bg-gray-200"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <span className="text-sm text-center font-medium">{name}</span>
    </div>
  );
};

export default Category;
