import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "pages";
import { ThemeProvider } from "theme";
import NavBar from "components/NavBar";
import Favorite from "pages/Favorite";


const AppRouter = () => {
  return (
    <ThemeProvider>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route excat path="/favorite" component={Favorite} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default AppRouter;
