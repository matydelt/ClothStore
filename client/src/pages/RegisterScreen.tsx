import * as React from "react";
import RegisterForm from "../components/RegisterForm";
import Footer from "../components/Footer";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const RegisterScreen = () => {
  const auth = useAuth();

  if (auth.user) {
    return <Navigate to="/" />;
  }

  return (
    <React.Fragment>
      <RegisterForm />
      <Footer />
    </React.Fragment>
  );
};

export default RegisterScreen;
