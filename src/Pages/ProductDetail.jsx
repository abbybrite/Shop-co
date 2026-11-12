import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaChevronRight,
  FaChevronDown,
  FaCheck,
  FaCheckCircle,
  FaMinus,
  FaPlus,
  FaEllipsisH,
  FaSlidersH,
} from "react-icons/fa";
import Rating from "../Component/Rating.jsx";
import ProductCard from "../Component/ProductCard.jsx";
import { useCart } from "../Context/CartContext.jsx";
import { allProducts, related } from "../Data/Product.js";

const colors = [
  { name: "olive", bg: "bg-[#4f4631]" },
  { name: "green", bg: "bg-[#314f4a]" },
  { name: "navy", bg: "bg-[#31344f]" },
];

const sizes = ["Small", "Medium", "Large", "X-Large"];
const tabs = ["Product Details", "Rating & Reviews", "FAQs"];

const DEFAULT_DESCRIPTION =
  "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.";

const reviews = [
  { id: 1, name: "Samantha D.", rating: 4.5, date: "August 14, 2023", text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt." },
  { id: 2, name: "Alex M.", rating: 4, date: "August 15, 2023", text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me." },
  { id: 3, name: "Ethan R.", rating: 3.5, date: "August 16, 2023", text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt." },
  { id: 4, name: "Olivia P.", rating: 4, date: "August 17, 2023", text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out." },
  { id: 5, name: "Liam K.", rating: 4, date: "August 18, 2023", text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion." },
  { id: 6, name: "Ava H.", rating: 4.5, date: "August 19, 2023", text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter." },
];

// The page itself. It receives one product and shows it.
const ProductView = ({ product }) => {
  const images = product.images || [product.image];
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [color, setColor] = useState("olive");
  const [size, setSize] = useState("Large");
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("Rating & Reviews");
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [added, setAdded] = useState(false);

  // Start at the top of the page whenever a product opens
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size,
      color,
      qty,
      image: images[0],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 4);
  const otherProducts = related.filter((p) => p.id !== product.id);

  return (
    <div className="px-4 md:px-10">
      {/* Breadcrumb */}
      <div className="border-t border-gray-200 py-5 flex items-center gap-2 text-sm text-gray-500 flex-wrap">
        <Link to="/">Home</Link> <FaChevronRight className="text-xs" />
        <span>Shop</span> <FaChevronRight className="text-xs" />
        <span>Men</span> <FaChevronRight className="text-xs" />
        <span className="text-black">T-shirts</span>
      </div>

      {/* Product info */}
      <section className="grid lg:grid-cols-2 gap-8 lg:gap-10">
        {/* Gallery */}
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-3 md:w-32">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-20 md:w-full shrink-0 bg-[#f0eeed] rounded-2xl aspect-square overflow-hidden cursor-pointer border ${
                  activeImage === i ? "border-black" : "border-transparent"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-contain p-2" />
              </button>
            ))}
          </div>

          <div className="flex-1 bg-[#f0eeed] rounded-2xl aspect-square overflow-hidden">
            <img
              src={images[activeImage]}
              alt={product.name}
              className="w-full h-full object-contain p-4"
            />
          </div>
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold wrap-break-word">
            {product.name.toUpperCase()}
          </h1>
          <div className="mt-3">
            <Rating rating={product.rating} size="text-lg" />
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-3">
            <span className="text-2xl md:text-3xl font-bold">${product.price}</span>
            {product.oldPrice && (
              <span className="text-2xl md:text-3xl font-bold text-gray-400 line-through">
                ${product.oldPrice}
              </span>
            )}
            {discount && (
              <span className="text-sm text-red-500 bg-red-100 rounded-full px-3 py-1">
                -{discount}%
              </span>
            )}
          </div>

          <p className="text-gray-500 text-sm mt-4 pb-5 border-b border-gray-200">
            {product.description || DEFAULT_DESCRIPTION}
          </p>

          {/* Colors */}
          <div className="py-5 border-b border-gray-200">
            <p className="text-gray-500 text-sm">Select Colors</p>
            <div className="flex gap-3 mt-3">
              {colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm cursor-pointer ${c.bg}`}
                >
                  {color === c.name && <FaCheck />}
                </button>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="py-5 border-b border-gray-200">
            <p className="text-gray-500 text-sm">Choose Size</p>
            <div className="flex flex-wrap gap-3 mt-3">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-6 py-2 rounded-full text-sm cursor-pointer ${
                    size === s ? "bg-black text-white" : "bg-[#f0f0f0] text-gray-600"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + Add to cart */}
          <div className="flex gap-4 pt-5">
            <div className="bg-[#f0f0f0] rounded-full flex items-center justify-between gap-6 px-5 py-3">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="cursor-pointer">
                <FaMinus />
              </button>
              <span className="text-sm">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="cursor-pointer">
                <FaPlus />
              </button>
            </div>
            <button
              onClick={handleAdd}
              className="flex-1 bg-black text-white rounded-full py-3 text-sm cursor-pointer hover:bg-gray-800"
            >
              {added ? "Added to cart ✓" : "Add to Cart"}
            </button>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="mt-16">
        <div className="flex">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-4 text-sm md:text-lg cursor-pointer border-b ${
                tab === t
                  ? "border-black border-b-2 text-black font-medium"
                  : "border-gray-200 text-gray-500"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "Rating & Reviews" && (
          <div className="mt-8">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <h2 className="text-xl md:text-2xl font-bold">
                All Reviews <span className="text-sm font-normal text-gray-400">(451)</span>
              </h2>
              <div className="flex items-center gap-3">
                <button className="bg-[#f0f0f0] rounded-full p-3 cursor-pointer">
                  <FaSlidersH />
                </button>
                <button className="bg-[#f0f0f0] rounded-full px-5 py-3 text-sm flex items-center gap-3 cursor-pointer">
                  Latest <FaChevronDown className="text-xs" />
                </button>
                <button className="bg-black text-white rounded-full px-5 py-3 text-sm cursor-pointer">
                  Write a Review
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
              {visibleReviews.map((r) => (
                <div key={r.id} className="border border-gray-200 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <Rating rating={r.rating} showText={false} size="text-lg" />
                    <FaEllipsisH className="text-gray-400" />
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <h3 className="font-bold text-lg">{r.name}</h3>
                    <FaCheckCircle className="text-green-500" />
                  </div>
                  <p className="text-gray-500 text-sm mt-2">"{r.text}"</p>
                  <p className="text-gray-500 text-sm mt-5">Posted on {r.date}</p>
                </div>
              ))}
            </div>

            {!showAllReviews && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setShowAllReviews(true)}
                  className="border border-gray-300 rounded-full px-10 py-3 text-sm cursor-pointer hover:bg-gray-100"
                >
                  Load More Reviews
                </button>
              </div>
            )}
          </div>
        )}

        {tab === "Product Details" && (
          <p className="mt-8 text-gray-500">Add your product details text here.</p>
        )}
        {tab === "FAQs" && (
          <p className="mt-8 text-gray-500">Add your FAQs here.</p>
        )}
      </section>

      {/* You might also like */}
      <section className="py-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">
          YOU MIGHT ALSO LIKE
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {otherProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
};

// The route component: reads the id from the address and finds the product
const ProductDetail = () => {
  const { id } = useParams();
  const product = id
    ? allProducts.find((p) => String(p.id) === id)
    : allProducts[0];

  if (!product) {
    return (
      <div className="px-4 md:px-10 py-20 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link
          to="/"
          className="inline-block bg-black text-white rounded-full px-10 py-3 text-sm mt-6"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  // key={product.id} resets the page (size, color, quantity) for each new product
  return <ProductView key={product.id} product={product} />;
};

export default ProductDetail;