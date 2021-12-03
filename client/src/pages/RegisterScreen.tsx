import * as React from "react";
import RegisterForm from "../components/RegisterForm";
import Footer from "../components/Footer";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Box } from "@mui/system";
import NavBar from "../components/HomePage/Header/NavBar/NavBar";

const RegisterScreen = () => {
  const auth = useAuth();

  if (auth.user) {
    return <Navigate to="/" />;
  }

  return (
    <React.Fragment>
      <NavBar></NavBar>
      <RegisterForm />
      <Box sx={{ display: "flex", height: "25%" }} />
      <Footer />
    </React.Fragment>
  );
};

export default RegisterScreen;
