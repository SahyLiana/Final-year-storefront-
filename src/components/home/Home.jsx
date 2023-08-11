import React from "react";
import "./home.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useOutletContext } from "react-router-dom";
import Categories from "../categories/Categories";
import Featured from "../featured/Featured";
import WhyUs from "../whyus/WhyUs";

function Home() {
  const [home, categories, featured, whyUs] = useOutletContext();

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    AOS.init({ duration: 1900 });
  });

  return (
    <div className="home">
      <div className="banner">
        <div className="container">
          <div className="content" data-aos="fade-left">
            <p>Black Friday</p>
            <h1>Up to 50% off</h1>
            <h3>Hundreds of Electronic devices</h3>
            <Link to="products/All">SHOP NOW</Link>
          </div>
        </div>
      </div>
      <Categories myRef={categories} />
      <Featured myRef={featured} />
      <WhyUs myRef={whyUs} />
    </div>
  );
}

export default Home;
