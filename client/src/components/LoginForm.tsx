import { TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import GoogleIcon from "@mui/icons-material/Google";
import LockOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import { Button } from "@material-ui/core";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from '@material-ui/core/Link';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { signinUser } from "../redux/actions/userActions";
import Clothing from './assets/img/cloting.jpg'
import Logo from './assets/logo/ClothStore_sin_fondo.png'

type FormState = { email: string; password: string };

const theme = createTheme();

const useStyles = makeStyles({
  rootButtonLogin: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  rootButtonLoginGoogle: {
    marginTop: "10px",
    marginBottom: "10px",
    backgroundColor: '#de4e3b'
  },
  inputsLogin: {
    width: '100%',
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  linkRegister: {
    display: 'inline-block',
    width: '100%',
    textAlign: 'center'
  },
  cicleLoginForm: {
    display: 'block',
    position: 'absolute',
    width: '300px',
    height: '300px',
    backgroundColor: '#00c2cb'
  }
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
    // <Box >
    <Container sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '70vh',
      boxShadow: '1px 2px 5px #ccc',
      marginTop: '50px',
      marginBottom: '50px',
      maxWidth: "1000px !important",
      overflow: 'hidden',
      borderRadius: '13px',
    }}
      component="main"
    >
      <Box sx={{
        width: '50%',
        position: 'relative',
        height: '100%',
        overflow: 'hidden',
        left: '-24px',
        borderTopRightRadius: '14%'
      }}>
        <Box
          component='img'
          src={Clothing}
          alt='Cloting'
          sx={{
            width: '500px',
            position: 'absolute',
            left: '0',
            top: '0',
            objectFit: 'contain',
          }}
        />
        <Box
          component='span'
          sx={{
            position: 'absolute',
            left: '0',
            top: '0',
            width: '100%',
            height: '100%',
            backgroundColor: '#333',
            margin: '0px',
            opacity: '.2'
          }}
        />
      </Box>
      <CssBaseline />
      <Box
        sx={{
          margin: 'auto',
          width: '50%',
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: 'relative'
        }}
      >
        <Box
          component='img'
          src={Logo}
          alt='Logo'
          sx={{
            position: 'absolute',
            top: '-173px',
            width: '47%'
          }}
        />
        <Box
          component='span'
          sx={{
            display: 'block',
            position: 'absolute',
            bottom: '-284px',
            left: '-126px',
            width: '300px',
            height: '300px',
            backgroundColor: '#00c2cb',
            zIndex: '-1',
            borderRadius: '50%',
            opacity: '.3'
          }}
        />
        <Avatar sx={{ backgroundColor: '#fff', boxShadow: '0px 1px 1px #00c2cb' }}>
          <LockOutlinedIcon color="primary" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '75%' }}
          noValidate
        >
          <TextField
            classes={{ root: classes.inputsLogin }}
            margin="normal"
            required
            id="email"
            label="Dirección de email"
            name="email"
            autoComplete="email"
            autoFocus
            value={input.email}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            classes={{ root: classes.inputsLogin }}
            margin="normal"
            required
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
            classes={{ root: classes.rootButtonLogin }}
          >
            Iniciar Sesión
          </Button>
          <Button
            fullWidth
            variant="contained"
            classes={{ root: classes.rootButtonLoginGoogle }}
            onClick={googleSignin}
            endIcon={<GoogleIcon sx={{ color: '#fff' }} />}
          >
            Iniciar Sesión con Google
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link variant="body2">Olvidaste tu contraseña?</Link>
            </Grid> */}
            <Grid item sx={{ width: '100%' }}>
              <Link
                component={RouterLink}
                to="/register"
                variant="body2"
                underline="hover"
                classes={{ root: classes.linkRegister }}
              >
                No tienes una cuenta? Registrate
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    // </Box>
  );
};

export default LoginForm;
