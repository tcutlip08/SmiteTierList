import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withAuth } from "@okta/okta-react";
import { useAuth } from "./components/Auth/Auth";
import NavBar from "./components/NavBar/NavBar";
import AboutUs from "./pages/AboutUs/AboutUs";
import Landing from "./pages/Landing/Landing";
import LogIn from "./pages/LogIn/LogIn";
import E404 from "./pages/Error/Error";
import "./App.css";

const App = withAuth(({ auth }) => {
  const [authenticated, user] = useAuth(auth);
  return (
    <Router>
      <>
        {/* {authenticated !== null && (
          <button
            onClick={() => (authenticated ? auth.logout() : auth.login())}
            className="App-link"
          >
            Log {authenticated ? "out" : "in"}
          </button>
        )} */}
        {authenticated !== null && <NavBar auth={authenticated} user={user} />}
        <Switch>
          <Route path="/about-us" component={AboutUs} />
          <Route path="/log-in" component={LogIn} />
          <Route exact path="/" component={Landing} />
          <Route path="*" component={E404} />
        </Switch>
      </>
    </Router>
  );
});
export default App;
