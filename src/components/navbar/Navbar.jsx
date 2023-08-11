import React from "react";
import { Link, useLocation, useSearchParams, NavLink } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import "./navbar.scss";
import Cart from "./Cart";
import Axios from "axios";
import { useSnackbar, enqueueSnackbar } from "notistack";

function Navbar({
  scrollToSection,
  sections,
  scrollTop,
  cartElts,
  setCartElts,
  // product,
  //  setProduct,
}) {
  console.log(`There are ${cartElts.length} elements(Navbar) `);

  const [sticky, setSticky] = React.useState(false);
  //const [searchParams, setSearchParams] = useSearchParams();
  const [showMenu, setShowMenu] = React.useState(false);
  const location = useLocation();
  const menuEl = React.useRef();
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // const [total, setTotal] = React.useState();

  let myTotal = () => {
    let getTotal = 0;
    for (let i = 0; i < cartElts.length; i++) {
      getTotal += cartElts[i].indTotal;
    }
    return getTotal;
  };

  let total = myTotal();
  // console.log(location.pathname);

  const isSticky = () => {
    window.scrollY > 95 ? setSticky(true) : setSticky(false);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", isSticky);

    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  const myStyle = {
    textDecoration: "underline",
  };

  const functionMenu = (e) => {
    e.preventDefault();
    setShowMenu((prev) => !prev);
  };

  // function getNewSearchParams(key, value) {
  //   const sp = new URLSearchParams(searchParams);
  //   if (value === null) {
  //     sp.delete(key);
  //   } else {
  //     sp.set(key, value);
  //   }
  //   // console.log(sp.toString());
  //   return `?${sp.toString()}`;
  // }

  if (showMenu) {
    // document.body.style.backgroundColor = "black";
    document.body.style.overflowY = "hidden";
    document.body.style.marginRight = "40%";
    document.body.style.transition = "0.8s";
  } else {
    // document.body.style.backgroundColor = "";
    document.body.style.overflowY = "scroll";
    document.body.style.marginRight = "0%";
    document.body.style.transition = "0.8s";
  }

  const removeElt = (id) => {
    setCartElts(
      cartElts.filter((cart) => {
        if (cart._id !== id) {
          return cart;
        }
      })
    );
  };

  const displayedCartElts = cartElts.map((cart) => {
    // let myTotal = cart.price * cart.nb + total;
    // setTotal(myTotal);

    return (
      <Cart
        // total={total}
        // setTotal={setTotal}
        key={cart._id}
        cart={cart}
        removeElt={removeElt}
      />
    );
  });
  console.log("In nav");
  console.log(cartElts.length);

  const handlePayment = async (e) => {
    e.preventDefault();

    setLoading(true);

    console.log(cartElts);

    if (cartElts.length > 0) {
      try {
        const buyProduct = await Axios.patch(
          "http://localhost:3000/api/products/payments",
          {
            myCarts: cartElts,
          }
        );
        enqueueSnackbar("Payment succeeded", {
          variant: "success",
        });
        setCartElts([]);
      } catch (error) {
        enqueueSnackbar(`Payment failed!!!${error.response.data.msg}`, {
          variant: "error",
        });
        // console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      enqueueSnackbar("Your cart is empty", { variant: "error" });
      setLoading(false);
    }
  };

  return (
    <>
      <div className={sticky ? "navbar active" : "navbar"}>
        <div className="logo">
          <Link style={{ display: "block" }} to="/">
            <span
              style={{
                fontFamily: "'Brush Script MT', cursive",
                fontSize: "50px",
                fontWeight: "bold",
                color: "black",
              }}
            >
              FindI
            </span>{" "}
            <br />
            <span style={{ fontSize: "17px", color: "gray" }}>Store</span>
          </Link>
        </div>

        <div className="middle">
          <NavLink
            style={({ isActive }) => (isActive ? myStyle : null)}
            to={`products/All`}
          >
            SHOP ALL
          </NavLink>
          {/* <NavLink to={`products/${getNewSearchParams("category", "Phones")}`}>
          PHONES
        </NavLink> */}
          <NavLink
            style={({ isActive }) => (isActive ? myStyle : null)}
            to={`products/Phones`}
          >
            PHONES
          </NavLink>
          {/* <NavLink to={`products/${getNewSearchParams("category", "Computers")}`}>
          COMPUTERS
        </NavLink> */}
          <NavLink
            style={({ isActive }) => (isActive ? myStyle : null)}
            to={`products/Computers`}
          >
            COMPUTERS
          </NavLink>
          {/* <NavLink to={`products/${getNewSearchParams("category", "Others")}`}>
          OTHERS
        </NavLink> */}
          <NavLink
            style={({ isActive }) => (isActive ? myStyle : null)}
            to={`products/Others`}
          >
            OTHERS
          </NavLink>
          <BiSearch />
        </div>

        <div className="left-nav">
          {location.pathname === "/" && (
            <div className="scrolls">
              <p onClick={() => scrollTop()}>Home</p>
              <p onClick={() => scrollToSection(sections.categories)}>
                Categories
              </p>
              <p onClick={() => scrollToSection(sections.featured)}>
                Featured products
              </p>
              <p onClick={() => scrollToSection(sections.whyUs)}>Why Us</p>
            </div>
          )}

          <p>Login</p>
          {showMenu === false && (
            <button onClick={(e) => functionMenu(e)}>
              My Cart ({cartElts.length})
            </button>
          )}
        </div>
      </div>
      <div
        ref={menuEl}
        className="cart-menu"
        style={showMenu ? { width: "40%" } : { width: "0px" }}
      >
        <form method="POST" onSubmit={handlePayment} className="menu-container">
          <div className="menu-header">
            <h1>Your Card</h1>
            <button onClick={(e) => functionMenu(e)}>x</button>
          </div>
          <hr />
          <div className="">
            {cartElts.length > 0 ? (
              displayedCartElts
            ) : (
              <h1 style={{ color: "gray" }}>No items</h1>
            )}
            {/* <h1 style={{ color: "gray" }}>Not items</h1> */}
          </div>
          <h2>
            Total price:<span className="total">${total}</span>
          </h2>

          <div className="menu-footer">
            {/* <button className="menu-continue">Continue Shopping</button> */}
            <button className={`menu-pay ${loading ? "loading" : null}`}>
              {loading ? "Please wait..." : "Make Payment"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Navbar;
