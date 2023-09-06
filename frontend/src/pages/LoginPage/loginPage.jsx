import { useState } from "react";
import style from"./loginPage.module.css"
import AppHeader from "../../components/header/app-header"
import { useHistory } from 'react-router-dom';

import endpoint from "../../services/API/axios";
import AddUsers from "../../components/addusers/addusers";
const LOGIN_URL = "/login";

const LoginPage = () => {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await endpoint.post(LOGIN_URL, {
        username: userName,
        password: userPwd,
      });
      console.log(endpoint, LOGIN_URL);
      console.log("25",res.data);
      if (res.data.status === "Success") {
        console.log(res.data.text);
        history.push({
          pathname: "/",
        });
      } else {
        setErrMsg(res.data.text);
        console.log("33",res.data.text);

      }
    } catch (err) {
      console.error(err);
      setErrMsg("No Server Response");
    }
    console.log(userName,userPwd);
  };

  return (
    <>
    <AppHeader/>
    <section>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username : </label>
        <input
          type="text"
          id="login-username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="login-password"
          value={userPwd}
          onChange={(e) => setUserPwd(e.target.value)}
          required
        />

        {errMsg && <p className={style.errorMsg}>{errMsg}</p>}

        <button className={style.loginBtt} type="submit">LOGIN</button>
      </form>
    </section>
    <AddUsers/>
    </>
  );
};

export default LoginPage;
