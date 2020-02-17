import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import AboutUs from "./pages/AboutUs/AboutUs";
import Landing from "./pages/Landing/Landing";
import ContactUs from "./pages/ContactUs/ContactUs";
import E404 from "./pages/Error/Error";
import "./App.css";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/contact-us" component={ContactUs} />
        <Route path="/about-us" component={AboutUs} />
        <Route exact path="/" component={Landing} />
        <Route path="*" component={E404} />
      </Switch>
    </Router>
  );
}
export default App;
