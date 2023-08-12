import React from "react";

function PaymentMenu({
  handlePayment,
  functionMenu,
  total,
  cartElts,
  displayedCartElts,
}) {
  return (
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
  );
}

export default PaymentMenu;
