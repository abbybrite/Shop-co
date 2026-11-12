import React from "react";
import Hero from "../Component/Hero.jsx";
import New from "../Component/New.jsx";
import Top from "../Component/Top.jsx";
import DressStyle from "../Component/DressStyle.jsx";
import Reviews from "../Component/Reviews.jsx";

const Home = () => {
  return (
    <>
      <Hero />
      <New />
      <Top />
      <DressStyle />
      <Reviews />
    </>
  );
};

export default Home;