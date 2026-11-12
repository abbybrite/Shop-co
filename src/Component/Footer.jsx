import React from "react";
import { MdEmail } from "react-icons/md";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcApplePay,
} from "react-icons/fa";

const columns = [
  { title: "COMPANY", links: ["About", "Features", "Works", "Career"] },
  { title: "HELP", links: ["Customer Support", "Delivery Details", "Terms & Conditions", "Privacy Policy"] },
  { title: "FAQ", links: ["Account", "Manage Deliveries", "Orders", "Payments"] },
  { title: "RESOURCES", links: ["Free eBooks", "Development Tutorial", "How to - Blog", "Youtube Playlist"] },
];

const Footer = () => {
  return (
    <footer>
      {/* Newsletter box, pulled down so it overlaps the grey area */}
      <div className="relative z-10 px-4 md:px-10 -mb-20">
        <div className="bg-black rounded-3xl px-6 md:px-16 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <h2 className="text-white text-3xl md:text-4xl font-extrabold max-w-md">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h2>

          <div className="flex flex-col gap-3 w-full md:w-80">
            <div className="bg-white rounded-full flex items-center gap-3 px-4 py-3">
              <MdEmail className="text-gray-400 text-xl" />
              <input
                type="email"
                placeholder="Enter your email address"
                className="outline-none text-sm w-full"
              />
            </div>
            <button className="bg-white rounded-full py-3 text-sm font-medium cursor-pointer hover:bg-gray-200">
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </div>

      {/* Grey footer */}
      <div className="bg-[#f0f0f0] px-4 md:px-10 pt-32 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          <div className="col-span-2">
            <h2 className="text-3xl font-extrabold">SHOP.CO</h2>
            <p className="text-gray-500 text-sm mt-4 max-w-xs">
              We have clothes that suits your style and which you're proud to wear. From women to men.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="#" className="bg-white border border-gray-200 rounded-full p-2 text-sm"><FaTwitter /></a>
              <a href="#" className="bg-black text-white rounded-full p-2 text-sm"><FaFacebookF /></a>
              <a href="#" className="bg-white border border-gray-200 rounded-full p-2 text-sm"><FaInstagram /></a>
              <a href="#" className="bg-white border border-gray-200 rounded-full p-2 text-sm"><FaGithub /></a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="tracking-widest text-sm">{col.title}</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-500 text-sm hover:text-black">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-300 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">Shop.co © 2000-2023, All Rights Reserved</p>
          <div className="flex gap-2 text-4xl text-gray-600">
            <FaCcVisa />
            <FaCcMastercard />
            <FaCcPaypal />
            <FaCcApplePay />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;