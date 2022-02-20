import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Button, Link, TextField } from "@mui/material";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import type { ChangeEventHandler, FormEventHandler } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { registerUser } from "../redux/actions/userActions";
import ClothingRegiter from "./assets/img/clotingRegister.jpg";
import Logo from "./assets/logo/ClothStore_sin_fondo.png";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const useStyles = makeStyles({
  root: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  avatarLock: {
    backgroundColor: "#fff",
    boxShadow: "0px 1px 1px #00c2cb",
  },
  inputsLogin: {
    width: "100%",
    marginRight: "auto",
    marginLeft: "auto",
  },
  linkRegister: {
    display: "inline-block",
    width: "100%",
    textAlign: "center",
  },
  cicleLoginForm: {
    display: "block",
    position: "absolute",
    width: "300px",
    height: "300px",
    backgroundColor: "#00c2cb",
  },
});

const RegisterForm = () => {
  const [input, setInput] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const classes = useStyles();

  const dispatch = useDispatch();

  const { signup } = useAuth();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    if (input.confirmPassword !== input.password) {
      alert("The passwords must be the same");
      return;
    }
    e.preventDefault();
    signup(input);
    dispatch(registerUser(input));
    setInput({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
        boxShadow: "1px 2px 5px #ccc",
        marginTop: "50px",
        marginBottom: "50px",
        maxWidth: "1000px !important",
        overflow: "hidden",
        borderRadius: "13px",
      }}
      component="main"
    >
      <CssBaseline />
      <Box
        sx={{
          margin: "auto",
          width: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Box
          component="img"
          src={Logo}
          alt="Logo"
          sx={{
            position: "absolute",
            top: "-121px",
            left: "-72px",
            width: "47%",
          }}
        />
        <Box
          component="span"
          sx={{
            display: "block",
            position: "absolute",
            bottom: "-253px",
            left: "-187px",
            width: "300px",
            height: "300px",
            backgroundColor: "#00c2cb",
            zIndex: "-1",
            borderRadius: "50%",
            opacity: ".3",
          }}
        />
        <Avatar classes={{ root: classes.avatarLock }}>
          <LockOutlinedIcon color="primary" />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ my: "10px" }}>
          Registrate
        </Typography>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "75%",
          }}
          onSubmit={handleSubmit}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                classes={{ root: classes.inputsLogin }}
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Nombre"
                autoFocus
                value={input.firstName}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                classes={{ root: classes.inputsLogin }}
                required
                fullWidth
                id="lastName"
                label="Apellido"
                name="lastName"
                autoComplete="family-name"
                value={input.lastName}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                classes={{ root: classes.inputsLogin }}
                required
                fullWidth
                id="email"
                label="Dirección de email"
                name="email"
                autoComplete="email"
                value={input.email}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                classes={{ root: classes.inputsLogin }}
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="new-password"
                value={input.password}
                onChange={handleChange}
                error={input.password.length >= 1 && input.password.length < 6}
                helperText={
                  input.password.length >= 1 &&
                  input.password.length < 6 &&
                  "La contraseña debe tener al menos 6 caracateres"
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                classes={{ root: classes.inputsLogin }}
                required
                fullWidth
                name="confirmPassword"
                label="Confirmar Contraseña"
                type="password"
                autoComplete="new-password"
                value={input.confirmPassword}
                onChange={handleChange}
                error={input.confirmPassword !== input.password}
                helperText={
                  input.confirmPassword !== input.password &&
                  "Contraseña incorrecta"
                }
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            classes={{
              root: classes.root,
            }}
            disabled={
              input.confirmPassword !== input.password ||
              input.password.length < 6
            }
            color="primary"
          >
            Sign up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                component={RouterLink}
                to="/login"
                variant="body2"
                underline="hover"
              >
                Ya tienes una cuenta?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box
        sx={{
          width: "50%",
          position: "relative",
          height: "100%",
          overflow: "hidden",
          right: "-24px",
          borderTopLeftRadius: "14%",
        }}
      >
        <Box
          component="img"
          src={ClothingRegiter}
          alt="Cloting"
          sx={{
            width: "500px",
            position: "absolute",
            left: "0",
            top: "0",
            objectFit: "contain",
          }}
        />
        <Box
          component="span"
          sx={{
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "#333",
            margin: "0px",
            opacity: ".2",
          }}
        />
      </Box>
    </Container>
  );
};

export default RegisterForm;
