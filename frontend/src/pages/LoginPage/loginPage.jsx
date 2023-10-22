import { useState } from "react";
import style from "./loginPage.module.css";
import AppHeader from "../../components/header/app-header";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import endpoint from "../../services/API/axios";
import AddUsers from "../../components/addusers/addusers";
import { SETUIDLocal } from "../../services/tkEndcoded.service";
const LOGIN_URL = "/login";
const USER = "/user";

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
      console.log(res.data);
      if (res.data.status === "Success") {
        const user = await endpoint.get(`${USER}/${userName}`);
        console.log(user);
        console.log(res.data.msg);
        Swal.fire({
          title: "กำลังเข้าสู่ระบบ",
          icon: "success",
          showConfirmButton: false,
          timer: 700,
        }).then(() => {
          localStorage.setItem("token", res.data.token);
          SETUIDLocal();
          history.push({
            pathname: `/`,
          });
        });
      } else {
        setErrMsg(res.data.msg);
        console.log(res.data.msg);
        console.log(errMsg);
      }
    } catch (err) {
      console.error(err);
  
      if (err.response && err.response.status === 404) {
        setErrMsg(" : ชื่อผู้ใช้ไม่ถูกต้อง");
      } else if (err.response && err.response.status === 401) {
        setErrMsg(" : รหัสผ่านไม่ถูกต้อง");
      } else {
        setErrMsg(err.message);
      }
    }
    console.log(userName, userPwd);
  };
  

  return (
    <>
      <AppHeader header={`LoginPage : กรุณาเข้าสู่ระบบเพื่อเข้าใช้งาน`}/>
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

          <button className={style.loginBtt} type="submit">
            LOGIN
          </button>
        </form>
      </section>
      <AddUsers />
    </>
  );
};

export default LoginPage;
