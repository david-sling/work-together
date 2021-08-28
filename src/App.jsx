import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import File from "./pages/File";

import Home from "./pages/Home";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:id" component={File} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}
