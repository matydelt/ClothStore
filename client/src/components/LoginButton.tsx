import React from "react";
import { useAuth } from "../hooks/useAuth";

interface Props {
  email: string;
  password: string;
  google?: boolean;
}

const LoginButton = (props: Props): JSX.Element => {
  const { signin, googleSignin } = useAuth();
  if (props.google) {
    return <button onClick={googleSignin}>Log in with Google</button>;
  } else {
    return <button onClick={() => signin(props)}>Log In</button>;
  }
};

export default LoginButton;
