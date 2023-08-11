import React from "react";
import { Link, useLocation, useSearchParams, NavLink } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import "./navbar.scss";
import Cart from "./Cart";
import Axios from "axios";
import Modal from "react-modal";
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
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [myDetails, setMyDetails] = React.useState({});
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    document.body.style.overflow = "hidden";
    subtitle.style.color = "blue";
  }

  function closeModal() {
    document.body.style.overflow = "scroll";
    setIsOpen(false);
  }

  // const [total, setTotal] = React.useState();

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%,-50%)",
      width: "60%",
      height: "75vh",
      // overflowY: "scroll",
    },
  };

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

    // setLoading(true);

    console.log(cartElts);

    if (cartElts.length > 0) {
      //try {
      // const buyProduct = await Axios.patch(
      //   "http://localhost:3000/api/products/payments",
      //   {
      //     myCarts: cartElts,
      //   }
      // );
      // enqueueSnackbar("Payment succeeded", {
      //   variant: "success",
      // });
      // setCartElts([]);
      setShowMenu(false);
      openModal();
      //} catch (error) {
      //enqueueSnackbar(`Payment failed!!!${error.response.data.msg}`, {
      //variant: "error",
      //});
      // console.log(error);
    }
    //finally {
    // setLoading(false);
    // }
    // }
    else {
      enqueueSnackbar("Your cart is empty", { variant: "error" });
      setLoading(false);
    }
  };

  Modal.setAppElement("#root");

  const modalCarts = cartElts.map((cart, key) => {
    return (
      <tr key={key}>
        <td>
          <img src={`http://localhost:3000/products/${cart.image}`} />
        </td>
        <td>{cart.name}</td>
        <td>{cart.nb}</td>
        <td>{cart.price}</td>
        <td style={{ fontWeight: "bold" }}>{cart.indTotal}</td>
      </tr>
    );
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMyDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    console.log("My details are");
    console.log(myDetails);
    setLoading(true);
    try {
      const buyProduct = await Axios.patch(
        "http://localhost:3000/api/products/payments",
        {
          myCarts: cartElts,
          myDetails: myDetails,
        }
      );
      enqueueSnackbar("Payment success", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(`Payment failed!!!}`, {
        variant: "error",
      });
    } finally {
      setCartElts([]);
      setIsOpen(false);
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
            {/* <button className={`menu-pay ${loading ? "loading" : null}`}>
              {loading ? "Please wait..." : "Make Payment"}
            </button> */}
            <button className={`menu-pay `}>Make payment</button>
          </div>
        </form>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example"
        // className="modal-container"
        overlayClassName="overlay"
      >
        <form onSubmit={handleSubmitPayment} className="modal-container">
          <div className="modal-header">
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
              Payement details:
            </h2>
            <button className="close" onClick={closeModal}>
              x
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Product image</th>
                <th>Product name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>{modalCarts}</tbody>
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td
                  style={{
                    fontWeight: "bold",
                    color: "blue",
                    fontSize: "20px",
                    padding: "10px 0",
                  }}
                >
                  ${total}
                </td>
              </tr>
            </tfoot>
          </table>
          {/* {modalCarts} */}
          {/* <p style={{ textAlign: "right" }}>Total:${total}</p> */}
          <h2>Your details:</h2>
          <label htmlFor="name">
            Name<sup style={{ color: "red" }}>*</sup>:
          </label>
          <br />
          <input
            onChange={handleChange}
            name="name"
            required
            type="text"
            id="name"
          />
          <br />
          <label htmlFor="phone">
            Phone number<sup style={{ color: "red" }}>*</sup>:
          </label>
          <br />
          <input
            onChange={handleChange}
            name="phone"
            required
            type="text"
            id="phone"
          />
          <br />
          <label htmlFor="address">
            Address<sup style={{ color: "red" }}>*</sup>::
          </label>
          <br />
          <input
            onChange={handleChange}
            name="address"
            required
            type="text"
            id="address"
          />
          <br />
          <button className={`confirm ${loading && "loading"}`}>
            {loading ? "Please wait" : "Confirm payment"}
          </button>
        </form>
      </Modal>
    </>
  );
}

export default Navbar;
