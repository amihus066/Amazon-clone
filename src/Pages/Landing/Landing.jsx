import React from "react";
import LayOut from "../../Components/LayOut/LayOut";
import Carsole from "../../Components/Carsole/Carsole";
import Catagory from "../../Components/Catagory/Catagory";
import Product from "../../Components/Product/Product";
function Landing() {
  return (
    <LayOut>
      <Carsole />
      <Catagory />
      <Product />
    </LayOut>
  );
}

export default Landing;
