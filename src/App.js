import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddStory from "./Components/add-story.component";
import Story from "./Components/story.component";
import StoriesList from "./Components/stories-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/Stories"} className="navbar-brand">
            Achiefic
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/Stories"} className="nav-link">
                Stories
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/Add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/Stories"]} component={StoriesList} />
            <Route exact path="/add" component={AddStory} />
            <Route path="/Stories/:id" component={Story} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
