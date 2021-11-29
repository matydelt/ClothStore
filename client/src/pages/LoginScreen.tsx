import * as React from "react";
import LoginForm from "../components/LoginForm";
import Footer from "../components/Footer";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Box } from "@mui/system";

const LoginScreen = () => {
  const auth = useAuth();
  // if (auth.user) {
  //   return <Navigate to="/" />;
  // }

  return (
    <React.Fragment>
      <LoginForm />
      <Box sx={{ display: 'flex', height: '43%' }}/>
      <Footer />
    </React.Fragment>
  );
};

export default LoginScreen;
