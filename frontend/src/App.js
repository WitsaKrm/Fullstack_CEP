import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routes from "./services/Routes/routes.service";
import { Helmet } from "react-helmet";
import IndexPage from "./pages/users/indexPage/indexPage";
import LoginPage from "./pages/LoginPage/loginPage";
import SensersPage from "./pages/users/SenserPage/senserPage";
import UsersPage from "./pages/admin/UsersPage/users";

import AddUsers from "./components/addusers/addusers";

function App() {
  return (
    <div className="container">
      <Helmet>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Helmet>
      <Router>
        <Routes />
      </Router>
      {/* <UsersPage/>
      <AddUsers /> */}
    </div>
  );
}

export default App;
