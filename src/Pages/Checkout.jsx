import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronRight, FaCheckCircle } from "react-icons/fa";
import { useCart } from "../Context/CartContext.jsx";

// One form field. Defined outside Checkout so typing doesn't lose focus.
const Field = ({ label, name, type = "text", value, onChange, error, placeholder }) => (
  <div>
    <label htmlFor={name} className="text-sm text-gray-500">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full bg-[#f0f0f0] rounded-xl px-4 py-3 mt-1 outline-none border ${
        error ? "border-red-400" : "border-transparent"
      }`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const paymentOptions = [
  { id: "delivery", label: "Pay on delivery" },
  { id: "card", label: "Card (demo only, no payment is taken)" },
];

const Checkout = () => {
  const { items, promo, subtotal, discountRate, discount, delivery, total, clearCart } = useCart();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });
  const [payment, setPayment] = useState("delivery");
  const [errors, setErrors] = useState({});
  const [order, setOrder] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const found = {};
    if (!form.fullName.trim()) found.fullName = "Enter your full name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) found.email = "Enter a valid email address";
    if (form.phone.trim().length < 7) found.phone = "Enter a valid phone number";
    if (!form.address.trim()) found.address = "Enter your address";
    if (!form.city.trim()) found.city = "Enter your city";
    if (!form.state.trim()) found.state = "Enter your state";
    return found;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    // Save what the thank-you screen needs BEFORE the cart is emptied
    setOrder({
      number: Math.floor(100000 + Math.random() * 900000),
      name: form.fullName.trim(),
      total,
    });
    clearCart();
  };

  // Thank-you screen after placing the order
  if (order) {
    return (
      <div className="px-4 md:px-10 py-20 text-center">
        <FaCheckCircle className="text-green-500 text-5xl mx-auto" />
        <h1 className="text-3xl md:text-4xl font-extrabold mt-6">THANK YOU, {order.name.toUpperCase()}!</h1>
        <p className="text-gray-500 mt-3">
          Your order #{order.number} has been placed. Total: ${order.total}
        </p>
        <Link
          to="/"
          className="inline-block bg-black text-white rounded-full px-10 py-3 text-sm mt-8 hover:bg-gray-800"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  // Nothing to check out
  if (items.length === 0) {
    return (
      <div className="px-4 md:px-10 py-20 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <Link
          to="/casual"
          className="inline-block bg-black text-white rounded-full px-10 py-3 text-sm mt-6 hover:bg-gray-800"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-10">
      {/* Breadcrumb */}
      <div className="border-t border-gray-200 py-5 flex items-center gap-2 text-sm text-gray-500">
        <Link to="/">Home</Link> <FaChevronRight className="text-xs" />
        <Link to="/cart">Cart</Link> <FaChevronRight className="text-xs" />
        <span className="text-black">Checkout</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold">CHECKOUT</h1>

      <form onSubmit={handleSubmit} noValidate className="grid lg:grid-cols-3 gap-5 mt-6 mb-20">
        {/* Left: details and payment */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          <div className="border border-gray-200 rounded-2xl p-5 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold">Delivery Details</h2>

            <div className="grid md:grid-cols-2 gap-4 mt-5">
              <Field label="Full name" name="fullName" value={form.fullName} onChange={handleChange} error={errors.fullName} placeholder="Ada Lovelace" />
              <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="you@example.com" />
              <Field label="Phone number" name="phone" type="tel" value={form.phone} onChange={handleChange} error={errors.phone} placeholder="0801 234 5678" />
              <Field label="City" name="city" value={form.city} onChange={handleChange} error={errors.city} placeholder="Lagos" />
              <div className="md:col-span-2">
                <Field label="Address" name="address" value={form.address} onChange={handleChange} error={errors.address} placeholder="House number and street" />
              </div>
              <Field label="State" name="state" value={form.state} onChange={handleChange} error={errors.state} placeholder="Lagos State" />
            </div>
          </div>

          <div className="border border-gray-200 rounded-2xl p-5 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold">Payment Method</h2>

            <div className="flex flex-col gap-3 mt-5">
              {paymentOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer ${
                    payment === option.id ? "border-black" : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === option.id}
                    onChange={() => setPayment(option.id)}
                    className="accent-black"
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right: order summary */}
        <div className="border border-gray-200 rounded-2xl p-5 md:p-6 h-fit">
          <h2 className="text-xl md:text-2xl font-bold">Order Summary</h2>

          <div className="divide-y divide-gray-200 mt-5">
            {items.map((item) => (
              <div key={item.key} className="flex gap-3 py-3 first:pt-0">
                <div className="bg-[#f0eeed] rounded-lg w-16 h-16 shrink-0 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                </div>
                <div className="flex-1 text-sm">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-500">
                    {item.size}, <span className="capitalize">{item.color}</span> x {item.qty}
                  </p>
                </div>
                <span className="font-bold text-sm">${item.price * item.qty}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 border-t border-gray-200 mt-3 pt-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-bold">${subtotal}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-500">
                  Discount {promo && `(${promo}, -${Math.round(discountRate * 100)}%)`}
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

          <button
            type="submit"
            className="w-full bg-black text-white rounded-full py-4 text-sm mt-5 cursor-pointer hover:bg-gray-800"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;