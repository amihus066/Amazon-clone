import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
//import { BrowserRouter } from "react-router-dom";
import DataProvider from "./Components/DataProvider/DataProvider.jsx";
import { reducer, initialState } from "./Utilities/reducer.js";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider reducer={reducer} initialState={initialState}>
      <App />
    </DataProvider>
  </StrictMode>
);
