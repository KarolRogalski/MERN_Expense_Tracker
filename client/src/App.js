import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./components/pages/Home";
import NewETName from "./components/pages/NewETName";
import { GlobalProvider } from "./context/GlobalState";
// import "./style.css";
// import "./signInUp.css";
import "./css/main.css";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalProvider>
          <Header />
          <div className="container_app">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/addnewet" component={NewETName} />
            </Switch>
          </div>
        </GlobalProvider>
      </BrowserRouter>
    </>
  );
}
