import React from "react";
import { useAuth } from "../hooks/useAuth";

interface Props {
  email: string;
  password: string;
}

const LoginButton = (props: Props): JSX.Element => {
  const { signin } = useAuth();
  return <button onClick={() => signin(props)}>Log In</button>;
};

export default LoginButton;
