import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { allProducts } from "../Data/Product.js";

const SearchBox = ({ onSelect, className = "" }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const text = query.trim().toLowerCase();

  // Find matches, skip repeated names, keep the first 6
  const results = [];
  if (text) {
    for (const product of allProducts) {
      const matches = product.name.toLowerCase().includes(text);
      const alreadyAdded = results.some((r) => r.name === product.name);
      if (matches && !alreadyAdded) results.push(product);
      if (results.length === 6) break;
    }
  }

  const close = () => {
    setQuery("");
    if (onSelect) onSelect();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && results.length > 0) {
      navigate(`/product/${results[0].id}`);
      close();
    }
    if (e.key === "Escape") close();
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center gap-2 bg-[#f0f0f0] px-4 py-2 rounded-full">
        <IoIosSearch className="text-xl" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for products..."
          className="outline-0 w-full bg-transparent"
        />
      </div>

      {text && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-100 shadow-lg rounded-2xl py-2 z-40 max-h-96 overflow-y-auto">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-gray-500">No products found</p>
          ) : (
            results.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                onClick={close}
                className="flex items-center gap-3 px-4 py-2 hover:bg-[#f0f0f0]"
              >
                <img
                  src={product.image}
                  alt=""
                  className="w-12 h-12 object-contain bg-[#f0eeed] rounded-lg p-1"
                />
                <div>
                  <p className="text-sm font-medium">{product.name}</p>
                  <p className="text-sm text-gray-500">${product.price}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;