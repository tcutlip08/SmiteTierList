import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import AboutUs from "./pages/AboutUs/AboutUs";
import Landing from "./pages/Landing/Landing";
import LogIn from "./pages/LogIn/LogIn";
import E404 from "./pages/Error/Error";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/about-us" component={AboutUs} />
          <Route path="/log-in" component={LogIn} />
          <Route exact path="/" component={Landing} />
          <Route path="*" component={E404} />
        </Switch>
      </div>
    </Router>
  );
}
export default App;
