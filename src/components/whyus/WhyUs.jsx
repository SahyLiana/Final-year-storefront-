import React from "react";
import "./whyus.scss";
import { FaTruck } from "react-icons/fa";
import { GoContainer } from "react-icons/go";
import { BsShieldShaded } from "react-icons/bs";
import { BiCartDownload } from "react-icons/bi";
// import Card from "./Card";
const Card = React.lazy(() => import("./Card"));
import AOS from "aos";
import "aos/dist/aos.css";

function WhyUs({ myRef }) {
  const whyArray = [
    {
      id: 1,
      title: "Fast Delivery",
      logo: <FaTruck />,
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa nostrum sit ab illum incidunt nobis unde molestiae repudiandae? Rem libero quae minus vel corrupti ab delectus nulla nisi expedita quos.",
    },
    {
      id: 2,
      title: "Free Shipping",
      logo: <GoContainer />,
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa nostrum sit ab illum incidunt nobis unde molestiae repudiandae? Rem libero quae minus vel corrupti ab delectus nulla nisi expedita quos.",
    },
    {
      id: 3,
      title: "Secure Checkout",
      logo: <BsShieldShaded />,
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa nostrum sit ab illum incidunt nobis unde molestiae repudiandae? Rem libero quae minus vel corrupti ab delectus nulla nisi expedita quos.",
    },
    {
      id: 4,
      title: "Easy Returns",
      logo: <BiCartDownload />,
      text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa nostrum sit ab illum incidunt nobis unde molestiae repudiandae? Rem libero quae minus vel corrupti ab delectus nulla nisi expedita quos.",
    },
  ];

  React.useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  const CardElts = whyArray.map((card) => (
    <React.Suspense key={card.id}>
      <Card title={card.title} logo={card.logo} text={card.text} />
    </React.Suspense>
  ));

  return (
    <div className="whyus" data-aos="slide-up" ref={myRef}>
      <div className="header">
        <p>Best Products</p>
        <h1>WHY CHOOSE US</h1>
        <div className="line"></div>
      </div>
      <div className="whycontent">{CardElts}</div>
    </div>
  );
}

export default WhyUs;
