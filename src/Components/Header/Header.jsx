import React from "react";
import classes from "./Header.module.css";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { SlLocationPin } from "react-icons/sl";
import LowerHeder from "./LowerHeder";
function Header() {
  return (
    <>
      <section>
        {/* lift side link  */}
        <div className={classes.header__container}>
          {/* logo */}
          <div className={classes.logo__container}>
            <a href="#">
              <img
                src="https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/amazon-512.png"
                alt="amazon logo"
              />
            </a>
            {/* delivery */}
            <div className={classes.delivery}>
              <span>
                <SlLocationPin />
              </span>

              <div>
                <p>Delivery to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          {/* search */}
          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" />
            <BsSearch size={25} />
          </div>
          {/* right side link  */}

          <div className={classes.order__container}>
            <a href="" className={classes.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
                alt=""
              />
              <section name="" id="">
                <option value="">EN</option>
              </section>
            </a>
            {/* three componenets */}
            <a href="">
              <p>sign in</p>
              <span>Accont & Lists</span>
            </a>
            {/* orders */}
            <a href="">
              <p>returns</p>
              <span>& Orderes</span>
            </a>
            {/* cart */}
            <a href="" className="classes.cart">
              <BiCart size={35} />
              <span>0</span>
            </a>
          </div>
        </div>
      </section>
      <LowerHeder />
    </>
  );
}

export default Header;
