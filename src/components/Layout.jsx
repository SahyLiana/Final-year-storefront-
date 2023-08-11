import React from "react";
import Footer from "./footer/Footer";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";

function Layout() {
  const home = React.useRef(null);
  const categories = React.useRef(null);
  const featured = React.useRef(null);
  const whyUs = React.useRef(null);
  // const [total, setTotal] = React.useState(0);

  //CART ADD,ELEMENTS
  const [cartElts, setCartElts] = React.useState([]);
  const [product, setProduct] = React.useState({});

  console.log(cartElts);

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop - 100,
      behavior: "smooth",
    });
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      <Navbar
        scrollToSection={scrollToSection}
        cartElts={cartElts}
        setCartElts={setCartElts}
        product={product}
        setProduct={setProduct}
        sections={{ home, categories, featured, whyUs, cartElts, setCartElts }}
        scrollTop={scrollTop}
        // total={total}
        // setTotal={setTotal}
      />
      <Outlet
        context={[
          home,
          categories,
          featured,
          whyUs,
          cartElts,
          setCartElts,
          product,
          setProduct,
        ]}
      />
      <Footer />
    </div>
  );
}

export default Layout;
