import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard/";
import axios from "axios";
import classes from "./product.module.css";

import Loader from "../Loader/Loader";
function Product() {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  // useEffect(() => {
  //   setIsloading(true);
  //   axios.get("https://fakestoreapi.com/products")

  //     .then((data) => {
  //       console.log(data);
  //       setProduct(data);
  //       setIsloading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setIsloading(false);
  //     });
  // }, []);

  //** the second method axios*/

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products") //the resposn coming is called data not products
      .then((res) => {
        console.log(res);
        const singleData = res.data;
        setProduct(singleData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.Product_container}>
          {product?.map((singleProduct, i) => {
            return (
              <ProductCard key={i} data={singleProduct} renderAdd={true} />
            );
          })}
        </section>
      )}
    </>
  );
}

export default Product;

/*********** */
