import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/home/Home";
// import Phones from "./components/phones/Phones";
// import Computers from "./components/computers/Computers";
// import Others from "./components/Others/Others";
import Products from "./components/products/Products";
// const Products = React.lazy(() => import("./components/products/Products"));
// import Navbar from "./components/navbar/Navbar";
import Product from "./pages/product/Product";
import NotFound from "./NotFound";

function App() {
  const myRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="*" element={<NotFound />} />
        <Route element={<Home />} path="/" />
        {/* <Route element={<Products />} path="products/:category" /> */}

        {/* <Route
          element={
            <React.Suspense fallback={<h1>Loading...</h1>}>
              <Products />
            </React.Suspense>
          }
          path="products/:category"
        /> */}

        <Route element={<Products />} path="products/:category" />
        <Route element={<Product />} path="product/:id" />
        {/* <Route element={<Phones />} path="/phones" />
        <Route element={<Computers />} path="/computers" />
        <Route element={<Others />} path="/others" /> */}
      </Route>
    )
  );
  return (
    <div>
      <RouterProvider router={myRouter} />
    </div>
  );
}

export default App;
