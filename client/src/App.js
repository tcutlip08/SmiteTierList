import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AboutUs from "./pages/AboutUs/AboutUs";
import Landing from "./pages/Landing/Landing";
import E404 from "./pages/Error/Error";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/about-us" component={AboutUs} />
          <Route exact path="/" component={Landing} />
          <Route path="*" component={E404} />
        </Switch>
      </div>
    </Router>
  );
}
export default App;
