import React from "react";

const styles = [
  { id: 1, name: "Casual", image: "/Images/casual.png", span: "md:col-span-1" },
  { id: 2, name: "Formal", image: "/Images/formal.png", span: "md:col-span-2" },
  { id: 3, name: "Party", image: "/Images/party.png", span: "md:col-span-2" },
  { id: 4, name: "Gym", image: "/Images/gym.png", span: "md:col-span-1" },
];

const DressStyle = () => {
  return (
    <section className="px-4 md:px-10 py-12">
      <div className="bg-[#f0f0f0] rounded-3xl px-6 md:px-16 py-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">
          BROWSE BY DRESS STYLE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {styles.map((style) => (
            <div
              key={style.id}
              className={`relative h-48 md:h-64 rounded-2xl overflow-hidden bg-white ${style.span}`}
            >
              <h3 className="absolute top-6 left-6 text-2xl font-bold z-10">
                {style.name}
              </h3>
              <img
                src={style.image}
                alt={style.name}
                className="absolute right-0 top-0 h-full w-full object-cover object-right"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DressStyle;