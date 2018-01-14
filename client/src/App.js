import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./pages/SignUp";
import UserDetail from "./pages/UserDetail";
import NoMatch from "./pages/NoMatch";
import Bills from "./pages/Bills";
import BillDetail from "./pages/BillDetail";
import Nav from "./components/Nav";

const App = () =>
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={SignUp} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/users/:id" component={UserDetail} />
        <Route exact path="/bills" component={Bills} />
        <Route exact path="/bills/:id" component={BillDetail} />
        <Route component={NoMatch} />

      </Switch>
    </div>
  </Router>

export default App;
