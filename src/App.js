import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ItemContext } from "./Components/Context/Context";
import MainScreen from "./Components/MainScreen/Main";
import MainResult from "./Components/Result/MainResult/MainResult";
import Screen from "./Components/Result/ScreenRes/Screen";

function App() {
  const items = [];

  return (
    <ItemContext.Provider value={items}>
      <Router>
        <div style={Style}>
          <Switch>
            <Route exact path={process.env.PUBLIC_URL + "/"}>
              <MainScreen />
            </Route>
            <Route path={process.env.PUBLIC_URL + "/result"}>
              <MainResult />
            </Route>
            <Route path={process.env.PUBLIC_URL + "/diagnosis"}>
              <Screen />
            </Route>
          </Switch>
        </div>
      </Router>
    </ItemContext.Provider>
  );
}

export default App;

const Style = {
  backgroundColor: "#7f808a",
};
