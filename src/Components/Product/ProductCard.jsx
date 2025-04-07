import React, { useContext } from "react";
import { Rating } from "@mui/material";
import CurrencyFormator from "../CurrenceFormator/CurrencyFormator";
import classes from "./product.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider/";
import { Type } from "../../Utilities/action.type";

function ProductCard({ data, flex, renderDesc, renderAdd }) {
  const { image, title, rating, id, price, description } = data;
  const { rate, count } = rating || {}; // Safely destructure rating
  const [state, dispatch] = useContext(DataContext);

  console.log("Current state:", state); // Debugging state
  const item = { image, title, rating, id, price, description, rate, count };

  const addToCart = () => {
    console.log("Adding to cart:", item); // Debugging item
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };

  return (
    <div
      className={`${classes.card__container} ${
        flex ? classes.product__flexed : ""
      }`}
    >
      <Link to={`products/${id}`}>
        <img src={image} alt={title} className={classes.img_container} />
      </Link>

      <div>
        <h4>{title}</h4>
        {renderDesc && <div style={{ maxWidth: "750px" }}>{description}</div>}

        <div className={classes?.rating}>
          <Rating value={rate} precision={0.1} />
          <small>{count} reviews</small>
        </div>

        <div>
          <CurrencyFormator amount={price} />
        </div>

        {renderAdd && (
          <button className={classes.button} onClick={addToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
