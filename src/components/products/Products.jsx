import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Axios from "axios";
import "./products.scss";
import AOS from "aos";
import "aos/dist/aos.css";
// import ProductList from "./ProductList";
const ProductList = React.lazy(() => import("./ProductList"));
// import Pagination from "./Pagination";
const Pagination = React.lazy(() => import("./Pagination"));

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  // const params = searchParams.get("category");
  // const [myCategory, setMyCategory] = React.useState(null);
  const [products, setProducts] = React.useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const [loading, setLoading] = React.useState(false);
  const [selectedFilter, setSelectedFilter] = React.useState({ sorting: "" });
  let { category } = useParams();
  if (category === "All") {
    // setMyCategory(myCategory);
    category = null;
  } else {
    category = category;
  }
  //W} else {
  // setMyCategory(null);
  // }
  // console.log(params);
  console.log(category);

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const getData = async () => {
      try {
        AOS.init({ duration: 1000 });
        setLoading(true);

        const sorting = searchParams.get("sorting");
        console.log(sorting);
        const productsAPI = await Axios.get(
          "http://localhost:3000/api/products",
          {
            params: {
              category: category,
              sort: sorting,
            },
          }
        );

        // console.log(productsAPI.data.products);
        setProducts(productsAPI.data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [category, selectedFilter.sorting]);

  // console.log(products);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = products.slice(firstPostIndex, lastPostIndex);

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

  const handleChange = (event) => {
    // const value = event.target.value;
    // console.log(value);

    //OR//////

    const { name, value } = event.target;

    setSelectedFilter((prev) => ({ ...prev, [name]: value }));
    // getNewSearchParams("test", "value");
    setSearchParams((params) => {
      params.set(name, value);
      return params;
    });
  };
  // console.log(searchParams.get("sorting"));

  console.log(selectedFilter.sorting);

  return (
    <div className="products-container">
      <p data-aos="fade-right">Home/{category === null ? "Shop" : category}</p>
      <h1 data-aos="fade-right">{category === null ? "Shop" : category}</h1>
      <select
        data-aos="fade-right"
        onChange={handleChange}
        name="sorting"
        className="sorting"
      >
        <option value="" defaultValue="">
          Default Sorting
        </option>
        <option value="price">Sort by price:low to high</option>
        <option value="-price">Sort by price:high to low</option>
        <option value="name">Sort by name:A to Z</option>
        <option value="-name">Sort by name:Z to A</option>
      </select>
      {/* <React.Suspense fallback={<h1>Loading...</h1>}>
        <ProductList productsData={currentPosts} />
      </React.Suspense> */}
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <React.Suspense>
            <ProductList productsData={currentPosts} />
          </React.Suspense>
          <Pagination
            totalPosts={products.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  );
}

export default Products;
