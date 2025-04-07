import React, { useEffect, useContext, useState } from "react";
import classes from "./order.module.css";
import LayOut from "../../components/LayOut/LayOut";
import ProductCard from "../../components/Product/ProductCard";
import { db } from "../../Utilities/firebase.js";
import { DataContext } from "../../Components/DataProvider/DataProvider.jsx";

function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  // useEffect(() => {
  //   if (user) {
  //     db.collection("users")
  //       .doc(user.uid)
  //       .collection("orders")
  //       .orderBy("created", "desc")
  //       .onSnapshot((snapshot) => {
  //         console.log(snapshot);
  //         setOrders(
  //           snapshot.docs.map((doc) => ({
  //             id: doc.id,
  //             data: doc.data(),
  //           }))
  //         );
  //       });
  //   } else {
  //     setOrders([]);
  //   }
  // }, [user]);

  useEffect(() => {
    if (user) {
      console.log("Fetching orders for user:", user.uid);
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot(
          (snapshot) => {
            console.log("Snapshot size:", snapshot.size);
            if (!snapshot.empty) {
              console.log(
                "Orders:",
                snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
              );
            }
            setOrders(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
            );
          },
          (error) => {
            console.error("Error fetching orders:", error);
          }
        );
    } else {
      console.log("No user logged in.");
      setOrders([]);
    }
  }, [user]);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.Orders__container}>
          <h2>Your Orders</h2>

          {orders.length == 0 && (
            <p style={{ padding: "20px" }}>You don't have orders yet.</p>
          )}

          <div>
            {orders?.map((eachOrders, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order ID: {eachOrders?.id}</p>

                  {eachOrders?.data?.basket &&
                  eachOrders.data.basket.length > 0 ? (
                    eachOrders.data.basket.map((order) => (
                      <ProductCard flex={true} data={order} key={order.id} />
                    ))
                  ) : (
                    <p>No items in this order.</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;

// rules_version = '2';

// service cloud.firestore {
//   match /databases/{database}/documents {

//     // This rule allows anyone with your Firestore database reference to view, edit,
//     // and delete all data in your Firestore database. It is useful for getting
//     // started, but it is configured to expire after 30 days because it
//     // leaves your app open to attackers. At that time, all client
//     // requests to your Firestore database will be denied.
//     //
//     // Make sure to write security rules for your app before that time, or else
//     // all client requests to your Firestore database will be denied until you Update
//     // your rules
//     match /{document=**} {
//       allow read, write: if request.time < timestamp.date(2025, 4, 12);
//     }
//   }
// }
