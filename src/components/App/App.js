import React, { Component } from "react";
import { Provider } from "react-redux";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import './app.css';
import store from "../../store/store";
import Posts from "../Posts";
import PostInfo from "../PostInfo";
import NavBar from "../NavBar";





class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <NavBar/>
          <div className="main-div">
            <Switch>
              <Route exact path={["/", "/edit/:id","/create"]} component={Posts} />
              <Route path="/post/:id" component={PostInfo} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;