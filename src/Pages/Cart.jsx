import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronRight, FaTrashAlt, FaMinus, FaPlus, FaTag, FaArrowRight } from "react-icons/fa";
import { useCart } from "../Context/CartContext.jsx";

const Cart = () => {
  const {
    items,
    changeQty,
    removeItem,
    promo,
    applyPromo,
    removePromo,
    subtotal,
    discountRate,
    discount,
    delivery,
    total,
  } = useCart();

  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleApply = () => {
    if (applyPromo(code)) {
      setError("");
      setCode("");
    } else {
      setError("Invalid promo code");
    }
  };

  return (
    <div className="px-4 md:px-10">
      {/* Breadcrumb */}
      <div className="border-t border-gray-200 py-5 flex items-center gap-2 text-sm text-gray-500">
        <Link to="/">Home</Link> <FaChevronRight className="text-xs" />
        <span className="text-black">Cart</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold">YOUR CART</h1>

      {items.length === 0 ? (
        <div className="border border-gray-200 rounded-2xl py-16 px-4 text-center mt-6 mb-20">
          <p className="text-xl font-bold">Your cart is empty</p>
          <p className="text-gray-500 text-sm mt-2">
            Add something you like and it will show up here.
          </p>
          <Link
            to="/casual"
            className="inline-block bg-black text-white rounded-full px-10 py-3 text-sm mt-6 hover:bg-gray-800"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-5 mt-6 mb-20">
          {/* Items */}
          <div className="lg:col-span-2 border border-gray-200 rounded-2xl p-4 md:p-6 h-fit">
            <div className="divide-y divide-gray-200">
              {items.map((item) => (
                <div key={item.key} className="flex gap-4 py-5 first:pt-0 last:pb-0">
                  <div className="bg-[#f0eeed] rounded-xl w-24 h-24 md:w-28 md:h-28 shrink-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between gap-2">
                      <div>
                        <h3 className="font-bold md:text-lg">{item.name}</h3>
                        <p className="text-xs md:text-sm mt-1">
                          Size: <span className="text-gray-500">{item.size}</span>
                        </p>
                        <p className="text-xs md:text-sm">
                          Color: <span className="text-gray-500 capitalize">{item.color}</span>
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.key)}
                        className="text-red-500 cursor-pointer self-start"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xl md:text-2xl font-bold">${item.price}</span>

                      <div className="bg-[#f0f0f0] rounded-full flex items-center gap-4 px-4 py-2 text-sm">
                        <button onClick={() => changeQty(item.key, -1)} className="cursor-pointer">
                          <FaMinus />
                        </button>
                        <span>{item.qty}</span>
                        <button onClick={() => changeQty(item.key, 1)} className="cursor-pointer">
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order summary */}
          <div className="border border-gray-200 rounded-2xl p-5 md:p-6 h-fit">
            <h2 className="text-xl md:text-2xl font-bold">Order Summary</h2>

            <div className="flex flex-col gap-4 mt-5">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-bold">${subtotal}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Discount (-{Math.round(discountRate * 100)}%)
                  </span>
                  <span className="font-bold text-red-500">-${discount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-gray-500">Delivery Fee</span>
                <span className="font-bold">${delivery}</span>
              </div>
            </div>

            <div className="flex justify-between border-t border-gray-200 mt-4 pt-4">
              <span>Total</span>
              <span className="text-xl md:text-2xl font-bold">${total}</span>
            </div>

            {/* Promo code */}
            <div className="flex gap-3 mt-5">
              <div className="flex-1 bg-[#f0f0f0] rounded-full flex items-center gap-2 px-4 py-3">
                <FaTag className="text-gray-400" />
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleApply()}
                  placeholder="Add promo code"
                  className="outline-none bg-transparent text-sm w-full"
                />
              </div>
              <button
                onClick={handleApply}
                className="bg-black text-white rounded-full px-6 text-sm cursor-pointer hover:bg-gray-800"
              >
                Apply
              </button>
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {promo && (
              <p className="text-green-600 text-sm mt-2">
                Code {promo} applied.{" "}
                <button onClick={removePromo} className="underline cursor-pointer">
                  Remove
                </button>
              </p>
            )}

            <Link
              to="/checkout"
              className="w-full bg-black text-white rounded-full py-4 text-sm mt-4 flex items-center justify-center gap-3 hover:bg-gray-800"
            >
              Go to Checkout <FaArrowRight />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;