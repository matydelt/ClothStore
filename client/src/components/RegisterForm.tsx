import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

interface FormInterface {
  firstName: string;
  lastName: string;
  email: string;
  dni: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm = (): JSX.Element => {
  const [input, setInput] = useState<FormInterface>({
    firstName: "",
    lastName: "",
    email: "",
    dni: "",
    password: "",
    confirmPassword: "",
  });

  const { signup } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (input.confirmPassword !== input.password) {
      alert("The passwords must be the same");
      return;
    }
    e.preventDefault();
    signup(input);
    setInput({
      firstName: "",
      lastName: "",
      email: "",
      dni: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        value={input.firstName}
        onInput={handleChange}
        required
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        value={input.lastName}
        onInput={handleChange}
        required
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={input.email}
        onInput={handleChange}
        required
      />
      <label htmlFor="dni">DNI</label>
      <input
        type="text"
        name="dni"
        id="dni"
        value={input.dni}
        onInput={handleChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={input.password}
        onInput={handleChange}
        required
      />
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        value={input.confirmPassword}
        onInput={handleChange}
        required
      />
      {input.confirmPassword === input.password ? undefined : (
        <p>Password is different</p>
      )}
    </form>
  );
};

export default RegisterForm;
