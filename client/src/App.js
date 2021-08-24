import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import firebase from "firebase/app";

import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import AboutUsModal from "./components/layout/AboutUsModal";
import SelectSubject from "./components/pages/WorksheetCustomization/SelectSubject";
import SelectTopics from "./components/pages/WorksheetCustomization/SelectTopics";
import OrderTopics from "./components/pages/WorksheetCustomization/OrderTopics";
import CartState from "./context/Cart/CartState";

import "./App.css";

firebase.initializeApp({
  apiKey: "AIzaSyBhdJMtuRpkkYKKzcZ90axUd9fv8uJE48w",
  authDomain: "mathpro-42ea2.firebaseapp.com",
  projectId: "mathpro-42ea2",
  storageBucket: "mathpro-42ea2.appspot.com",
  messagingSenderId: "887676122052",
  appId: "1:887676122052:web:79add8cd58651494952a91",
  measurementId: "G-BZPZWZ0KMJ",
});

const App = () => {
  return (
    <Router>
      <CartState>
        <div className="wrapper">
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/custom/">
              <SelectSubject />
            </Route>
            <Route exact path="/custom/:subjectName">
              <SelectTopics />
            </Route>
            <Route exact path="/custom/:subjectName/order">
              <OrderTopics />
            </Route>
          </Switch>
          <footer>
            <AboutUsModal />
          </footer>
        </div>
      </CartState>
    </Router>
  );
};

export default App;
