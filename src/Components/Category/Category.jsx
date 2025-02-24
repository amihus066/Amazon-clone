import React from "react";
import CategoryCard from "./CategoryCard";
import { categoryInfos } from "./categoryFullInfo";
import classes from "./category.module.css";
function Category() {
  return (
    <section className={classes.Category_container}>
      {categoryInfos.map((infos) => (
        <CategoryCard data={infos} />
      ))}
    </section>
  );
}

export default Category;
