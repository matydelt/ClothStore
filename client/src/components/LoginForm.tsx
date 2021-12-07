import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GoogleIcon from "@mui/icons-material/Google";
import LockOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { signinUser } from "../redux/actions/userActions";

type FormState = { email: string; password: string };

const theme = createTheme();

const useStyles = makeStyles({
  root: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  avatarLock: {
    backgroundColor: "#f1f1f1",
  },
});

const LoginForm = () => {
  const [input, setInput] = useState<FormState>({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { signin, googleSignin } = useAuth();

  const location = useLocation();

  const classes = useStyles();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    signin(input);
    dispatch(signinUser(input));
    setInput({ email: "", password: "" });
    navigate(from, { replace: true });
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar classes={{ root: classes.avatarLock }}>
            <LockOutlinedIcon color="primary" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
            noValidate
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={input.email}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Contraseña"
              type="password"
              autoComplete="current-password"
              value={input.password}
              onChange={handleChange}
              variant="outlined"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              classes={{ root: classes.root }}
            >
              Iniciar Sesión
            </Button>
            <Button
              fullWidth
              variant="contained"
              classes={{ root: classes.root }}
              onClick={googleSignin}
              endIcon={<GoogleIcon />}
            >
              Sign up with Google
            </Button>
            <Grid container>
              <Grid item xs>
                <Link variant="body2">Olvidaste tu contraseña?</Link>
              </Grid>
              <Grid item>
                <Link
                  component={RouterLink}
                  to="/register"
                  variant="body2"
                  underline="hover"
                >
                  No tienes una cuenta? Registrate
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginForm;
