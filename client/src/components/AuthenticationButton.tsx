import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AuthenticationButton = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  if (auth.user) {
    return <button onClick={auth.signout}>Cerrar Sesión</button>;
  } else {
    return <button onClick={() => navigate("/login")}>Iniciar Sesión</button>;
  }
};

export default AuthenticationButton;
