import React from "react";
import { datainfo } from "./data";
import CatagoryCard from "./CatagoryCard";
import classes from "./catagor.module.css";
function Catagory() {
  return (
    <section className={classes.Catagory__container}>
      {datainfo?.map((info) => (
        <CatagoryCard data={info} />
      ))}
    </section>
  );
}

export default Catagory;
