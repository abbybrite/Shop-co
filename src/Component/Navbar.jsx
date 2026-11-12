import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { CiShoppingCart } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { MdMenu, MdClose } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { useCart } from "../Context/CartContext.jsx";

const shopLinks = [
  { name: "Casual", to: "/casual" },
  { name: "T-shirts", to: "/product" },
  { name: "Shirts", to: "/product" },
  { name: "Jeans", to: "/product" },
  { name: "Polos", to: "/product" },
];
const links = [
  { name: "On Sale", href: "#" },
  { name: "New Arrivals", href: "#" },
  { name: "Brands", href: "#" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const { totalItems } = useCart();
  const [mobileShop, setMobileShop] = useState(false);

  const closeAll = () => {
    setOpen(false);
    setShopOpen(false);
    setMobileShop(false);
  };

  return (
    <nav className="relative flex items-center justify-between px-4 md:px-10 py-4 bg-white text-black">
      {/* Left: hamburger (phone only), logo, links (desktop only) */}
      <div className="flex items-center gap-3 lg:gap-10">
        <button
          className="md:hidden text-2xl cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {open ? <MdClose /> : <MdMenu />}
        </button>

        <Link to="/" onClick={closeAll}>
          <h3 className="font-bold text-xl md:text-lg">SHOP.CO</h3>
        </Link>

        <div className="hidden md:flex gap-5 items-center text-sm">
          {/* Shop dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <button
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => setShopOpen(!shopOpen)}
            >
              Shop
              <FaChevronDown
                className={`text-xs transition-transform ${shopOpen ? "rotate-180" : ""}`}
              />
            </button>

            {shopOpen && (
              <div className="absolute left-0 top-full pt-3 z-30">
                <div className="bg-white border border-gray-100 shadow-lg rounded-xl py-2 w-44">
                  {shopLinks.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      onClick={closeAll}
                      className="block px-4 py-2 hover:bg-[#f0f0f0]"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {links.map((link) => (
            <a key={link.name} href={link.href}>
              {link.name}
            </a>
          ))}
        </div>
      </div>

      {/* Middle: search bar (tablet and up) */}
      <div className="hidden md:flex flex-1 max-w-xl mx-6 items-center gap-2 bg-[#f0f0f0] px-4 py-2 rounded-full">
        <IoIosSearch className="text-xl" />
        <input
          type="text"
          placeholder="Search for products..."
          className="outline-0 w-full bg-transparent"
        />
      </div>

      <div className="flex items-center gap-4 text-2xl">
        <IoIosSearch className="md:hidden" />
        <Link to="/cart" className="relative">
          <CiShoppingCart />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
        <CgProfile />
      </div>

      {/* Phone dropdown menu */}
      {open && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md z-20 flex flex-col gap-4 px-4 py-5 text-sm">
          <div>
            <button
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setMobileShop(!mobileShop)}
            >
              Shop
              <FaChevronDown
                className={`text-xs transition-transform ${mobileShop ? "rotate-180" : ""}`}
              />
            </button>

            {mobileShop && (
              <div className="flex flex-col gap-3 pl-4 mt-3 text-gray-600">
                {shopLinks.map((item) => (
                  <Link key={item.name} to={item.to} onClick={closeAll}>
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {links.map((link) => (
            <a key={link.name} href={link.href} onClick={closeAll}>
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
