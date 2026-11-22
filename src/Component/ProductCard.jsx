import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating.jsx";

const ProductCard = ({ product }) => {
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  return (
    <Link to={`/product/${product.id}`} className="block border border-gray-200 rounded-2xl p-3 shadow">
      <div className="bg-[#f0eeed] rounded-2xl aspect-square flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain p-4"
        />
      </div>

      <h3 className="font-semibold mt-3">{product.name}</h3>
      <Rating rating={product.rating} />

      <div className="flex items-center gap-2 mt-1">
        <span className="text-xl font-bold">${product.price}</span>
        {product.oldPrice && (
          <span className="text-xl font-bold text-gray-400 line-through">
            ${product.oldPrice}
          </span>
        )}
        {discount && (
          <span className="text-xs text-red-500 bg-red-100 rounded-full px-3 py-1">
            -{discount}%
          </span>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;