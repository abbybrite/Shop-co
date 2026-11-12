import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaChevronRight,
  FaChevronDown,
  FaChevronUp,
  FaCheck,
  FaTimes,
  FaSlidersH,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

import ProductCard from "../Component/ProductCard.jsx";
import { casualProducts } from "../Data/Product.js";

const categories = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];
const dressStyles = ["Casual", "Formal", "Party", "Gym"];
const sizes = [
  "XX-Small",
  "X-Small",
  "Small",
  "Medium",
  "Large",
  "X-Large",
  "XX-Large",
  "3X-Large",
  "4X-Large",
];

const colors = [
  { name: "green", bg: "bg-green-500", check: "text-white" },
  { name: "red", bg: "bg-red-500", check: "text-white" },
  { name: "yellow", bg: "bg-yellow-400", check: "text-white" },
  { name: "orange", bg: "bg-orange-500", check: "text-white" },
  { name: "cyan", bg: "bg-cyan-400", check: "text-white" },
  { name: "blue", bg: "bg-blue-600", check: "text-white" },
  { name: "purple", bg: "bg-purple-600", check: "text-white" },
  { name: "pink", bg: "bg-pink-500", check: "text-white" },
  { name: "white", bg: "bg-white border border-gray-300", check: "text-black" },
  { name: "black", bg: "bg-black", check: "text-white" },
];

const MAX = 300;

// Styles the round handles on the two overlapping sliders
const thumb =
  "pointer-events-none absolute inset-0 appearance-none bg-transparent " +
  "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black " +
  "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-black";

// One collapsible block of the sidebar (title + chevron)
const FilterSection = ({ title, children }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="py-5 border-t border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-lg font-bold cursor-pointer"
      >
        {title}
        {open ? (
          <FaChevronUp className="text-sm" />
        ) : (
          <FaChevronDown className="text-sm" />
        )}
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
};

const Casual = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [min, setMin] = useState(50);
  const [max, setMax] = useState(200);
  const [color, setColor] = useState("blue");
  const [size, setSize] = useState("Large");
  const [page, setPage] = useState(1);

  const pages = [1, 2, 3, "...", 8, 9, 10];

  return (
    <div className="px-4 md:px-10">
      {/* Breadcrumb */}
      <div className="border-t border-gray-200 py-5 flex items-center gap-2 text-sm text-gray-500">
        <Link to="/">Home</Link> <FaChevronRight className="text-xs" />
        <span className="text-black">Casual</span>
      </div>

      <div className="grid lg:grid-cols-[17rem_1fr] gap-6">
        {/* Sidebar */}
        <aside>
          {/* Phone-only button that opens the filters */}
          <button
            onClick={() => setShowFilters(true)}
            className="lg:hidden flex items-center gap-2 bg-[#f0f0f0] rounded-full px-5 py-3 text-sm cursor-pointer mb-4"
          >
            <FaSlidersH /> Filters
          </button>

          {/* Dark backdrop behind the phone sheet */}
          {showFilters && (
            <div
              onClick={() => setShowFilters(false)}
              className="lg:hidden fixed inset-x-0 bottom-0 top-24 bg-black/40 z-40"
            />
          )}

          {/* Phone: slide-over sheet. Large screens: normal sidebar */}
          <div
            className={`${
              showFilters
                ? "fixed inset-x-0 bottom-0 top-24 z-50 overflow-y-auto rounded-t-3xl bg-white px-5 pt-5"
                : "hidden"
            } lg:static lg:z-auto lg:block lg:overflow-visible lg:rounded-2xl lg:border lg:border-gray-200 lg:px-5 lg:pt-5 lg:pb-5`}
          >
            <div className="flex items-center justify-between pb-5">
              <h2 className="text-xl font-bold">Filters</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="lg:hidden text-xl cursor-pointer"
              >
                <FaTimes />
              </button>
              <FaSlidersH className="hidden lg:block text-gray-400" />
            </div>

            {/* Categories */}
            <div className="border-t border-gray-200 py-5 flex flex-col gap-4">
              {categories.map((c) => (
                <button
                  key={c}
                  className="flex items-center justify-between text-gray-500 text-sm cursor-pointer hover:text-black"
                >
                  {c} <FaChevronRight className="text-xs" />
                </button>
              ))}
            </div>

            {/* Price */}
            <FilterSection title="Price">
              <div className="relative h-4 mx-1">
                <div className="absolute top-1/2 -translate-y-1/2 h-1.5 w-full rounded bg-gray-200" />
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-1.5 rounded bg-black"
                  style={{
                    left: `${(min / MAX) * 100}%`,
                    width: `${((max - min) / MAX) * 100}%`,
                  }}
                />
                <input
                  type="range"
                  min="0"
                  max={MAX}
                  value={min}
                  onChange={(e) =>
                    setMin(Math.min(Number(e.target.value), max - 10))
                  }
                  className={thumb}
                />
                <input
                  type="range"
                  min="0"
                  max={MAX}
                  value={max}
                  onChange={(e) =>
                    setMax(Math.max(Number(e.target.value), min + 10))
                  }
                  className={thumb}
                />
              </div>
              <div className="flex justify-between text-sm mt-3">
                <span>${min}</span>
                <span>${max}</span>
              </div>
            </FilterSection>

            {/* Colors */}
            <FilterSection title="Colors">
              <div className="flex flex-wrap gap-3">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    className={`w-8 h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center text-sm cursor-pointer ${c.bg} ${c.check}`}
                  >
                    {color === c.name && <FaCheck />}
                  </button>
                ))}
              </div>
            </FilterSection>

            {/* Size */}
            <FilterSection title="Size">
              <div className="flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-4 py-2 rounded-full text-sm cursor-pointer ${
                      size === s
                        ? "bg-black text-white"
                        : "bg-[#f0f0f0] text-gray-500"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </FilterSection>

            {/* Dress style */}
            <FilterSection title="Dress Style">
              <div className="flex flex-col gap-4">
                {dressStyles.map((d) => (
                  <button
                    key={d}
                    className="flex items-center justify-between text-gray-500 text-sm cursor-pointer hover:text-black"
                  >
                    {d} <FaChevronRight className="text-xs" />
                  </button>
                ))}
              </div>
            </FilterSection>

            {/* Apply button: stays pinned to the bottom of the sheet on phones */}
            <div className="sticky bottom-0 bg-white pt-3 pb-5 lg:static lg:p-0">
              <button
                onClick={() => setShowFilters(false)}
                className="w-full bg-black text-white rounded-full py-3 text-sm cursor-pointer hover:bg-gray-800"
              >
                Apply Filter
              </button>
            </div>
          </div>
        </aside>

        {/* Products */}
        <section>
          <div className="flex items-end justify-between flex-wrap gap-2">
            <h1 className="text-3xl font-bold">Casual</h1>
            <p className="text-sm text-gray-500">
              Showing 1-10 of 100 Products
              <span className="ml-3">
                Sort by:{" "}
                <span className="text-black inline-flex items-center gap-1">
                  Most Popular <FaChevronDown className="text-xs" />
                </span>
              </span>
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5">
            {casualProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="border-t border-gray-200 mt-8 pt-6 mb-16 flex items-center justify-between gap-3">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
            >
              <FaArrowLeft /> <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
              {pages.map((p, i) =>
                p === "..." ? (
                  <span key={i} className="px-2">
                    ...
                  </span>
                ) : (
                  <button
                    key={i}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-lg cursor-pointer ${
                      page === p
                        ? "bg-[#f0f0f0] text-black"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {p}
                  </button>
                ),
              )}
            </div>

            <button
              onClick={() => setPage(Math.min(10, page + 1))}
              className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
            >
              <span className="hidden sm:inline">Next</span> <FaArrowRight />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Casual;
