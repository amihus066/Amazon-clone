import { useState, useEffect, useContext } from "react";

import "./App.css";
import Routing from "./Router";
import { auth } from "./Utilities/firebase";
import { DataContext } from "./Components/DataProvider/DataProvider";
import { Type } from "./Utilities/action.type";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, []);

  return (
    <>
      <Routing />
    </>
  );
}

export default App;
