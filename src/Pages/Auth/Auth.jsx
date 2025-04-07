import React, { useContext, useState } from "react";
import classes from "./signUp.module.css";

import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../Utilities/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utilities/action.type";
import { ClipLoader } from "react-spinners";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [{ user }, dispatch] = useContext(DataContext);

  const [loading, setLoading] = useState({
    signin: false,
    signUp: false,
  });

  const navigate = useNavigate();
  const navStateData = useLocation();
  console.log(navStateData);
  console.log(user);
  const authHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.name);
    if (e.target.name == "signin") {
      setLoading({ ...loading, signin: true });

      signInWithEmailAndPassword(auth, email, password)
        .then((userinfo) => {
          console.log(userinfo);

          dispatch({
            type: Type.SET_USER,
            user: userinfo.user,
          });
          setLoading({ ...loading, signin: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signUp: false });
        });
    } else {
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userinfo) => {
          console.log(userinfo);

          dispatch({
            type: Type.SET_USER,
            user: userinfo.user,
          });
          setLoading({ ...loading, signUp: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signUp: false });
        });
    }
  };

  return (
    <section className={classes.login}>
      <div>
        {/*logo*/}
        <Link to={"/"}>
          <img
            src="https://pngimg.com/uploads/amazon/amazon_PNG12.png"
            alt="Amazon logo"
          />
        </Link>
      </div>
      {/*form div */}
      <div className={classes.login__container}>
        <h1>Sign in</h1> <br />
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}
        <form action="">
          <div>
            <label htmlFor="email">E-mail</label>
            <br />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <br />
          <div>
            <label htmlFor="password">Password</label>
            <br />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <br />
          {/*sin in btn */}
          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={classes.btn__sin}
          >
            {loading.signin ? <ClipLoader color="gray" /> : " Sign in"}
          </button>
          <br />
          <br />
        </form>
        {/*agreement */}
        <p>
          By signing-in you agree to the AMAZON,
          <br />
          FAKE CLONE Conditions of Use & sale. <br />
          please see our Privacy Notice,our Cookies Notice and our
          interest-Based Ads Notice.
          <br />
        </p>
        <br />
        {/*creat account btn */}
        <button
          type="submit"
          name="signUp"
          onClick={authHandler}
          className={classes.btn__create}
        >
          {loading.signUp ? (
            <ClipLoader color="gray" />
          ) : (
            "Creat your amazon Account"
          )}
        </button>
        {error && (
          <small style={{ color: "red", paddingTop: "5px" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;
