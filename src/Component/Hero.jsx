import React from "react";

const Hero = () => {
  return (
    <div>
      <section className="relative bg-[#f0f0f0] md:bg-[url('/Images/p1.png')] md:bg-cover md:bg-center md:h-135 w-full">
        {/* Text */}
        <div className="px-4 md:px-10 pt-8 pb-6 md:py-20">
          <h1 className="text-4xl md:text-4xl font-extrabold md:w-90">
            FIND CLOTHES THAT MATCH YOUR STYLE
          </h1>
          <p className="text-[#6a6969] md:w-135 py-5 text-sm md:text-base">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <button className="text-white bg-black px-8 py-3 md:py-2 rounded-3xl w-full md:w-auto cursor-pointer">
            Shop Now
          </button>
        </div>

        {/* Stats */}
        <div className="px-4 md:px-10 flex flex-wrap justify-center md:justify-start gap-y-4 md:gap-y-0 md:gap-10 text-center md:text-left">
          <div className="border-[#6a6969] border-r px-6 md:px-0 md:pr-5">
            <h2 className="text-2xl font-bold">200+</h2>
            <p className="text-[#6a6969] text-xs md:text-base">International Brands</p>
          </div>
          <div className="md:border-[#6a6969] md:border-r px-6 md:px-0 md:pr-5">
            <h2 className="text-2xl font-bold">2,000+</h2>
            <p className="text-[#6a6969] text-xs md:text-base">High-Quality Products</p>
          </div>
          <div className="px-6 md:px-0">
            <h2 className="text-2xl font-bold">30,000+</h2>
            <p className="text-[#6a6969] text-xs md:text-base">Happy Customers</p>
          </div>
        </div>

        {/* Image (phone only) */}
        <img
          src="/Images/p1.png"
          alt="Fashion models"
          className="md:hidden block w-full h-96 object-cover object-right mt-6"
        />

        {/* Stars: cover the phone image area, or the whole hero on desktop */}
        <div className="absolute inset-x-0 bottom-0 h-96 md:inset-0 md:h-auto pointer-events-none">
          <img
            src="/Images/p2.png"
            alt=""
            className="absolute right-[8%] top-[10%] md:right-[5%] md:top-[18%] w-12 md:w-18.75"
          />
          <img
            src="/Images/p3.png"
            alt=""
            className="absolute left-[6%] top-[45%] md:left-[51%] md:top-[50%] w-8 md:w-10"
          />
        </div>
      </section>

      {/* Brands */}
      <div className="bg-black text-white flex flex-wrap justify-center md:justify-around gap-x-8 gap-y-3 px-4 py-6 md:py-2 text-xl md:text-2xl">
        <h2>VERSACE</h2>
        <h2>ZARA</h2>
        <h2>GUCCI</h2>
        <h2>PRADA</h2>
        <h2>CALVIN KLEIN</h2>
      </div>
    </div>
  );
};

export default Hero;