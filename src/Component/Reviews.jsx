import React, { useRef } from "react";
import { FaStar, FaCheckCircle, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "Sarah M.",
    text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  },
  {
    id: 2,
    name: "Alex K.",
    text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
  },
  {
    id: 3,
    name: "James L.",
    text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
  {
    id: 4,
    name: "Moo E.",
    text: "Add your own review text here. Keep it a similar length to the others so the cards stay the same height.",
  },
];

const Reviews = () => {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    rowRef.current.scrollBy({ left: direction * 350, behavior: "smooth" });
  };

  return (
    <section className="px-4 md:px-10 py-12">
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold">OUR HAPPY CUSTOMERS</h2>

        <div className="flex gap-4 text-xl">
          <button onClick={() => scroll(-1)} className="cursor-pointer">
            <FaArrowLeft />
          </button>
          <button onClick={() => scroll(1)} className="cursor-pointer">
            <FaArrowRight />
          </button>
        </div>
      </div>

      <div
        ref={rowRef}
        className="flex gap-5 overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((review) => (
          <div
            key={review.id}
            className="min-w-75 md:min-w-95 border border-gray-200 rounded-2xl p-6"
          >
            <div className="flex text-yellow-400 gap-1">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>

            <div className="flex items-center gap-2 mt-3">
              <h3 className="font-bold text-lg">{review.name}</h3>
              <FaCheckCircle className="text-green-500" />
            </div>

            <p className="text-gray-500 mt-2 text-sm">"{review.text}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;