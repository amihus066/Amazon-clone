import React, { useContext, useState } from "react";
import classes from "./payment.module.css";
import LayOut from "../../components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormator from "../../Components/CurrenceFormator/CurrencyFormator";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utilities/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utilities/action.type";

function Payment() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  {
  }
  const handleChange = (e) => {
    console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);

      // 1. Create a payment intent on the backend
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`, // Fix: Correct URL syntax
      });

      const clientSecret = response.data?.clientSecret;
      if (!clientSecret) {
        console.error("Client secret not received");
        setProcessing(false);
        return;
      }

      console.log("Client Secret:", clientSecret);

      // 2. Confirm the payment on the client side
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        console.error("Payment failed:", error.message);
        setProcessing(false);
        return;
      }

      console.log("Payment Intent:", paymentIntent);

      // 3. Write order to Firestore after successful payment
      if (paymentIntent.status === "succeeded") {
        if (!user) {
          console.error("User is not authenticated");
          setProcessing(false);
          return;
        }

        await db
          .collection("users")
          .doc(user.uid)
          .collection("Orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        console.log("Order saved to Firestore");

        // 4. Dispatch action to clear the basket
        dispatch({
          type: Type.EMPTY_BASKET,
        });

        setProcessing(false);

        // 5. Navigate to orders page with a success message
        navigate("/Orders", { state: { msg: "You have placed a new order" } });
      }
    } catch (error) {
      console.error("Error during payment:", error);
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      <div className={classes.payment_header}>Checkout ({totalItem} )items</div>

      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>8760 Maple avenue</div>
            <div>Capitol heights Park, MD</div>
          </div>
        </div>
        <hr />

        <div className={classes.flex}>
          <h3>Review item and deliver info. </h3>
          <div>
            {basket?.map((item, i) => (
              <ProductCard key={i} data={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        <div className={classes.flex}>
          <h3>payment methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}

                <CardElement onChange={handleChange} />

                {/*price total */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p> <CurrencyFormator amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={35} />
                        <p>please wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
