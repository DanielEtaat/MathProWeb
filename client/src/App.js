import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import AboutUsModal from "./components/layout/AboutUsModal";
import SelectSubject from "./components/pages/WorksheetCustomization/SelectSubject";
import SelectTopics from "./components/pages/WorksheetCustomization/SelectTopics";
import OrderTopics from "./components/pages/WorksheetCustomization/OrderTopics";
import DisplayPDF from "./components/pages/WorksheetCustomization/DisplayPDF";
import CartState from "./context/Cart/CartState";
import WorksheetState from "./context/Worksheet/WorksheetState";
import DataState from "./context/Data/DataState";


import "./App.css";

const App = () => {
  return (
    <Router>
      <DataState>
      <CartState>
        <WorksheetState>
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
              <Route exact path="/custom/:subjectName/pdf">
                <DisplayPDF />
              </Route>
            </Switch>
            <footer>
              <AboutUsModal />
            </footer>
          </div>
        </WorksheetState>
      </CartState>
      </DataState>
    </Router>
  );
};

export default App;
