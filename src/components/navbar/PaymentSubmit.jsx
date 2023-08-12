import React from "react";

function PaymentSubmit({
  handleSubmitPayment,
  subtitle,
  closeModal,
  handleChange,
  loading,
  modalCarts = { modalCarts },
  total = { total },
}) {
  return (
    <form onSubmit={handleSubmitPayment} className="modal-container">
      <div className="modal-header">
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Payement details:</h2>
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
        Address<sup style={{ color: "red" }}>*</sup>:
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
  );
}

export default PaymentSubmit;
