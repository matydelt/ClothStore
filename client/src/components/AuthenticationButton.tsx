import React from "react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth } from "../hooks/useAuth";

// ejemplo
const user = {
  email: "lautaro@gmail.com",
  password: "123456",
};

const AuthenticationButton = (): JSX.Element => {
  const auth = useAuth();
  return auth.user ? (
    <LogoutButton />
  ) : (
    <LoginButton email={user.email} password={user.password} />
  );
};

export default AuthenticationButton;
