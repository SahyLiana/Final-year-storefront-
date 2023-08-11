import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./categories.scss";
import Computer from "../../assets/laptop.png";
import Phones from "../../assets/CategoryPhone-min.jpg";
import Others from "../../assets/gadget.png";
import Category from "./Category";
import { Link } from "react-router-dom";

function Categories({ myRef }) {
  const categories = [
    {
      id: 1,
      photo: Computer,
      name: "Computers",
    },
    {
      id: 2,
      photo: Phones,
      name: "Phones",
    },
    {
      id: 3,
      photo: Others,
      name: "Others",
    },
  ];

  const displayedCag = categories.map((category, key) => (
    <Link key={key} to={`/products/${category.name}`}>
      <Category category={category} />
    </Link>
  ));

  React.useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);
  return (
    <div className="categories " data-aos="slide-up" ref={myRef}>
      <p>Our categories</p>
      <h1>Shop by category</h1>
      <div className="down-line"></div>
      <div className="cards">{displayedCag}</div>
    </div>
    // <p>Categories</p>
  );
}

export default Categories;
