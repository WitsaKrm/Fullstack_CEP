import React from "react";
import { Switch, Route } from "react-router-dom";
import IndexPage from "../../pages/indexPage/indexPage";
import LoginPage from "../../pages/LoginPage/loginPage";
import SensersPage from "../../pages/SenserPage/senserPage";
import UsersPage from "../../pages/UsersPage/users";
import StationPage from "../../pages/StationPage/stationPage";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={IndexPage} />
      <Route path="/users" component={UsersPage}/>
      <Route path="/login" component={LoginPage} />
      <Route path="/senser/:nodeId" component={SensersPage} />
      <Route path="/station/:nodeId" component={StationPage} />
    </Switch>
  );
};

export default Routes;
