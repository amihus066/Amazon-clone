import React, { useContext } from "react";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { SlLocationPin } from "react-icons/sl";
import classes from "./Header.module.css";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { auth } from "../../Utilities/firebase"; //we import this to use the method in it that enable us to sign out

function Header() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  console.log(basket.length);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header__container}>
          {/*left side dive */} {/*logo */}
          <div className={classes.logo__container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amzon logo"
              />
            </Link>
          </div>
          {/*delivery section*/}
          <div className={classes.delivery}>
            <span>
              <SlLocationPin />
            </span>
            <div>
              <p>Delivered to</p>
              <span>USA</span>
            </div>
          </div>
          {/*the middle dive */}
          {/*search section */}
          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" />
            <BsSearch size={38} />
          </div>
          {/*right side dive */}
          <div className={classes.order__container}>
            <Link to="" className={classes.language}>
              <img
                src="https://pngimg.com/uploads/flags/flags_PNG14655.png"
                alt=""
              />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>

            {/*the three components */}
            <Link to={!user && "/auth"}>
              {/*now we have a user so we have to show the loged in user name here to do that we have to creat div and put evry thing in it */}

              <div>
                {user ? (
                  <>
                    <p>Hello {user?.email?.split("@")[0]}</p>
                    {/*//split the email
                    in to have before @and after @ and take index 0 i.e name */}
                    <span onClick={() => auth.signOut()}>Sign Out</span>
                    {/*the  auth.signout() method tell fire base the user is signing out but telling fire base is not enough we have to go to app.jsx and implement some functionality */}
                  </>
                ) : (
                  <>
                    <p>Sign In</p>
                    <span>Account & Lists</span>
                  </>
                )}
              </div>
            </Link>
            {/*orders */}
            <Link to="/orders">
              <p>returns</p>
              <span>& Orders</span>
            </Link>

            {/*cart */}
            <Link to="/cart" className={classes.cart}>
              <BiCart size={35} />

              {/*<span>0</span>*/}
              {/*<span>basket.length</span>*/}
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
}

export default Header;
