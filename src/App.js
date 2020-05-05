import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { ItemContext } from "./Components/Context/Context";
import MainScreen from "./Components/MainScreen/Main";
import MainResult from "./Components/Result/MainResult/MainResult";
import Screen from "./Components/Result/ScreenRes/Screen";

function App() {
  const items = [];

  return (
    <ItemContext.Provider value={items}>
      <div style={Style}>
        <Switch>
          <Route exact path="/">
            <MainScreen />
          </Route>
          <Route path="/result">
            <MainResult />
          </Route>
          <Route path="/diagnosis">
            <Screen />
          </Route>
        </Switch>
      </div>
    </ItemContext.Provider>
  );
}

export default App;

const Style = {
  backgroundColor: "#7f808a",
};
