import "./formLogin.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { getUser } from "../api/trello";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import BadgeIcon from "@mui/icons-material/Badge";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function FormLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [credOpen, setCredOpen] = useState(true);
  const [copiedField, setCopiedField] = useState(null);

  const togglePassword = () => setShowPassword(!showPassword);

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    async function handleSubmit(data) {
      toast.promise(
        (async () => {
          const users = await getUser();
          const exist = users.data.find(
            (u) => u.nombre === data.nombre && u.password === data.password
          );
          if (exist) {
            setTimeout(() => {
              navigate("/trello", { state: { user: exist } });
            });
            return "Sesión encontrada";
          } else {
            throw new Error("Error credenciales erróneas ");
          }
        })(),
        {
          loading: "Iniciando Sesión...",
          success: <b>👋¡Hola de nuevo {data.nombre}! </b>,
          error: (err) => <b>{err.message}</b>,
        },
        {
          style: {
            backgroundColor: "#087DC1",
            color: "white",
            duration: 4500,
          },
        }
      );
    }
    if (data) handleSubmit(data);
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  };

  return (
    <div className="form-container">
      <Toaster />
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <header className="head">
          <img className="imgs" src="/trello_Icon.png" alt="" />
          <h1 className="title-login">Trello</h1>
        </header>

        <input
          type="text"
          placeholder="Usuario"
          className="input-field"
          {...register("nombre", { required: true })}
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          className="input-field"
          {...register("password", { required: true })}
        />

        <button type="submit" className="submit-button">
          Ingresar
        </button>

        <div className="redirect-container">
          <Link to="/register">
            <button className="redirect-button">Crear cuenta</button>
          </Link>
        </div>
      </form>

      {/* Demo credentials card */}
      <motion.div
        className="demo-card"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="demo-header" onClick={() => setCredOpen(!credOpen)}>
          <div className="demo-header-left">
            <span className="demo-badge-icon">
              <BadgeIcon fontSize="small" />
            </span>
            <span className="demo-header-text">Acceso para Reclutadores</span>
          </div>
          <motion.span
            animate={{ rotate: credOpen ? 0 : 180 }}
            transition={{ duration: 0.3 }}
            className="demo-chevron"
          >
            {credOpen ? (
              <KeyboardArrowUpIcon fontSize="small" />
            ) : (
              <KeyboardArrowDownIcon fontSize="small" />
            )}
          </motion.span>
        </div>

        <AnimatePresence initial={false}>
          {credOpen && (
            <motion.div
              className="demo-body"
              key="demo-body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <p className="demo-subtitle">
                Usa estas credenciales para explorar la app
              </p>

              <div className="demo-row">
                <span className="demo-icon">
                  <PersonIcon fontSize="small" />
                </span>
                <div className="demo-field">
                  <span className="demo-label">Usuario</span>
                  <span className="demo-value">user</span>
                </div>
                <motion.button
                  className={`demo-copy-btn ${copiedField === "user" ? "copied" : ""}`}
                  onClick={() => copyToClipboard("user", "user")}
                  whileTap={{ scale: 0.85 }}
                  title="Copiar usuario"
                >
                  {copiedField === "user" ? "✓" : <ContentCopyIcon style={{ fontSize: 14 }} />}
                </motion.button>
              </div>

              <div className="demo-row">
                <span className="demo-icon">
                  <LockIcon fontSize="small" />
                </span>
                <div className="demo-field">
                  <span className="demo-label">Password</span>
                  <span className="demo-value">123</span>
                </div>
                <motion.button
                  className={`demo-copy-btn ${copiedField === "pass" ? "copied" : ""}`}
                  onClick={() => copyToClipboard("123", "pass")}
                  whileTap={{ scale: 0.85 }}
                  title="Copiar contraseña"
                >
                  {copiedField === "pass" ? "✓" : <ContentCopyIcon style={{ fontSize: 14 }} />}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="img-s">
        <img className="trello-left" src="/trelloleft.svg" alt="" />
        <img className="trello-left" src="/trello-right.svg" alt="" />
      </div>
    </div>
  );
}

export default FormLogin;
