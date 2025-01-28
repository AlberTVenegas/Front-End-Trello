import "./login.css";

import { Route, Routes } from "react-router-dom";
import FormRegis from "./components/formRegis";
import FormLogin from "./components/formLogin";
import Lista_en_progreso from "./components/lista_en_progreso";
import { Toaster } from "react-hot-toast";

function Login() {
  return (
    <>
      <Toaster />

      <Routes>
        <Route path="/" element={<FormLogin />}></Route>
        <Route path="/register" element={<FormRegis />}></Route>
        <Route path="/trello" element={<Lista_en_progreso />}></Route>
      </Routes>
    </>
  );
}

export default Login;
