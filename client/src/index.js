import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Security, ImplicitCallback } from "@okta/okta-react";

ReactDOM.render(
  <Router>
    <Security
      //   issuer={`${process.env.REACT_APP_OKTA_ORG_URL}/oauth2/default`}
      issuer={`https://dev-340086.okta.com/oauth2/default`}
      client_id={`0oa2ebczws19vQ6s54x6`}
      redirect_uri={`${window.location.origin}/implicit/callback`}
    >
      <Route path="/" component={App} />
      <Route path="/implicit/callback" component={ImplicitCallback} />
    </Security>
  </Router>,
  //   <App />,
  document.getElementById("root")
);
