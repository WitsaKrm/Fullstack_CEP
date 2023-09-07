import React from "react";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../../pages/LoginPage/loginPage";

import IndexPage from "../../pages/users/indexPage/indexPage";
import SensersPage from "../../pages/users/SenserPage/senserPage";
import StationPage from "../../pages/users/StationPage/stationPage";

import UsersPage from "../../pages/admin/UsersPage/users";

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
