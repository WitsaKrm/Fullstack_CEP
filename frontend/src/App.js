import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routes from "./services/Routes/routes.service";
import { Helmet } from "react-helmet";
import IndexPage from "./pages/indexPage/indexPage";
import LoginPage from "./pages/LoginPage/loginPage";
import SensersPage from "./pages/SenserPage/senserPage";
import AddUsers from "./components/addusers/addusers";
import UsersPage from "./pages/UsersPage/users";

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
