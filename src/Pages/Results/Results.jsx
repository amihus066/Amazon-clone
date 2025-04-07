import React, { useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut/";
import classes from "./results.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoint";
import Product from "../../Components/Product/Product";
import ProductCard from "../../Components/Product/ProductCard/";
import Loader from "../../Components/Loader/Loader";

function Results() {
  const [results, setResults] = useState([]);
  const { categoryName } = useParams();
  const [isLoading, setIsloading] = useState(false);
  console.log(categoryName);
  useEffect(() => {
    setIsloading(true);

    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        console.log(res);
        setResults(res.data);
        setIsloading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsloading(false);
      });
  }, [categoryName]);

  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : (
        <section>
          <h1 style={{ padding: "30px" }}>Results</h1>
          <p style={{ padding: "30px" }}>Category/{categoryName}</p>
          <div className={classes.product_container}>
            {results?.map((products, i) => (
              <ProductCard key={i} data={products} renderAdd={true} />
            ))}
          </div>
        </section>
      )}
    </LayOut>
  );
}

export default Results;
