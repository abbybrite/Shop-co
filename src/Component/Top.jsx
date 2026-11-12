import React, { useState } from "react";
import { topSelling } from "../Data/Product.js";
import ProductCard from "./ProductCard.jsx";

const Top = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleProducts = showAll ? topSelling : topSelling.slice(0, 4);

  return (
    <section className="px-4 md:px-10 py-12">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">
        TOP SELLING
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex justify-center mt-8 border-[#6a6969] border-b pb-10">
        <button
          onClick={() => setShowAll(!showAll)}
          className="border border-gray-300 rounded-full px-14 py-3 text-sm cursor-pointer hover:bg-gray-100"
        >
          {showAll ? "View Less" : "View All"}
        </button>
      </div>
    </section>
  );
};

export default Top;