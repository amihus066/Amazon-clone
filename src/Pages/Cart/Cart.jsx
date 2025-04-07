import React, { useContext } from "react";
import classes from "./cart.module.css";
import LayOut from "../../components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import CurrencyFormator from "../../Components/CurrenceFormator/CurrencyFormator/";
import { Link } from "react-router-dom";
import { Type } from "../../Utilities/action.type";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

//example of how to calculat total using reducer

/*let a=[4,5,6]
let totalresut = a.reduce((prv,cur)=>{

  return prv+cur
})

console.log(totalresut); 15*/

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  // previous amount in the basket + current items*price for single item and add , 0 is telling that the function it starts from 0...

  /*const total = basket.reduce((amount, item) => {
    return amount + item.price;
  }, 0);*/
  // after updating the reducer function to reflect th number of same items found on the basket we have to multiply the total amount by the price like below

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };

  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart__container}>
          <h2>hello</h2>
          <h3>Your shopping basket</h3>
          <hr />
          {basket?.length === 0 ? (
            <p>Opps ! No items in your cart</p>
          ) : (
            basket?.map((item, i) => {
              return (
                <section className={classes.cart_product}>
                  <ProductCard
                    key={i}
                    data={item}
                    flex={true}
                    renderDesc={true}
                    renderAdd={false}
                  />

                  <div className={classes.btn_container}>
                    <button
                      className={classes.btn}
                      onClick={() => increment(item)}
                    >
                      <IoIosArrowUp size={30} />
                    </button>
                    <span>{item.amount}</span>
                    <button
                      className={classes.btn}
                      onClick={() => decrement(item.id)}
                    >
                      <IoIosArrowDown size={30} />
                    </button>
                  </div>
                </section>
              );
            })
          )}
        </div>
        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>subtotal({basket?.length}items)</p>
              <CurrencyFormator amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>this order contains a gift</small>
            </span>
            <Link to="/payment">Continue to CheckOut</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart;
