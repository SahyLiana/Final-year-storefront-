import React from "react";
import Card from "../featured/Card";
import "./productList.scss";

function ProductList({ productsData }) {
  //   console.log(productsData);
  const displayedCard =
    productsData.length > 0 ? (
      productsData.map((product, index) => {
        return <Card key={index} product={product} />;
      })
    ) : (
      <h1>Not items...</h1>
    );
  return <div className="product-list">{displayedCard}</div>;
}

export default ProductList;
