// import { Avatar } from "@material-ui/core";
// import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
// import UploadTwoToneIcon from "@mui/icons-material/UploadTwoTone";
import {
  Box,
  Button,
  // Card,
  // CardMedia,
  // IconButton,
  // Input,
  TextField,
  Typography,
  makeStyles,
  CardMedia
} from "@material-ui/core";
// import Modal from "@mui/material/Modal";
// import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import * as React from "react";
import ModalUpdateUser from "./ModalUpdateUser";
// import FileUpload from "../../fileUpload/FileUpload";
import Logo from '../../assets/logo/ClothStore_sin_fondo.png'
import swal from 'sweetalert';

interface Alerta {
  title: string,
  text: string,
  icon: string,
  button: string
}
const datosA : Alerta = {
  title: "Informacion importante",
  text: 'Es Requerido el nombre de la Tienda',
  icon: "warning",
  button: "Aceptar"
};
const Alert = () => {
    swal(datosA)
}

const useStyles = makeStyles({
  inputProfile: {
    width: '65%'
  },
  buttonProfile: {
    marginTop: '10px',
    '& span': {
      margin: '0px'
    }
  },
  logo: {
    width: '900px'
  },
  circleProfile: {
    opacity: '.3'
  },
  titledate: {
    textDecoration: 'underline'
  }
})


interface Props {
  id: string | undefined;
  userName: string | undefined;
  phone: string | undefined;
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  dni: string | undefined;
  calle: string | undefined;
  numero: string | undefined;
  ciudad: string | undefined;
  country: string | undefined;
  cp: string | undefined;
  getOneUser: Function;
}

const ProfileCover = (props: Props) => {
  const classes = useStyles();


  const Alerta = ()=>{
      return Alert()
  }

  return (
    <>
      <Box width='900px'>
        <Typography align='center' variant="h3" component="h3" gutterBottom>
          ¡Bienvenid@ {props.firstName}!
        </Typography>
        <Typography align='center' variant="subtitle2">
          Este es tu perfil, aqui podras gestionar todas tus ventas y compras,
          ademas vas a poder ver las metricas de tus ventas
        </Typography>
      </Box>

      <Box sx={{
        height: '800px',
        width: '900px',
        boxShadow: '1px 1px 4px #ccc',
        marginTop: "50px",
        borderRadius: '10px',
        display: 'flex',
        overflow: 'hidden'
      }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', position: 'relative', width: '50%' }}>
          <CardMedia
            component='img'
            src={Logo}
            alt='Logo'
            classes={{ root: classes.logo }}
          />
          <Box
            component='span'
            sx={{
              display: 'block',
              margin: '0px',
              position: 'absolute',
              bottom: '-142px',
              left: '-105px',
              height: '400px',
              width: '400px',
              bgcolor: '#00c2cb',
              borderRadius: '50%',
              zIndex: '-1',
            }}
            className={classes.circleProfile}
          />
        </Box>
        <Box sx={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
        >
          {/* <AvatarWrapper>
            <Avatar variant="rounded" alt={props.firstName} src={props.photo} />
            </AvatarWrapper>
            <FileUpload /> */}
          <Typography gutterBottom variant="h4">
            {props.firstName} {props.lastName}
          </Typography>
          <Typography color='primary' classes={{ root: classes.titledate }} variant='h4'>Datos de la Cuenta</Typography>
          <TextField
            disabled
            label="Tienda"
            value={props.userName}
            variant='outlined'
            // name="phone"
            classes={{ root: classes.inputProfile }}
          />
          <TextField
            name='phone'
            disabled
            label="Teléfono:"
            value={props.phone}
            classes={{ root: classes.inputProfile }}
            variant='outlined'
          />
          <TextField
            classes={{ root: classes.inputProfile }}
            variant='outlined'
            disabled label="E-mail:"
            value={props.email}
          />


          <Typography color='primary' classes={{ root: classes.titledate }} align='center' variant='h4'>Datos personales</Typography>
          <TextField
            variant='outlined'
            name="firstName"
            disabled
            label="Nombre:"
            value={props.firstName}
            classes={{ root: classes.inputProfile }}
          />

          <TextField
            variant='outlined'
            name="lastName"
            disabled
            label="Apellido:"
            value={props.lastName}
            classes={{ root: classes.inputProfile }}
          />
          <TextField
            variant='outlined'
            name="dni"
            disabled label="DNI:"
            value={props.dni}
            classes={{ root: classes.inputProfile }}
          />


          <Box sx={{ width: '70%' }}>
            <ModalUpdateUser id={props.id} getOneUser={props.getOneUser} />
            {
                props.userName == "" || undefined?
                <Button onClick={Alerta} fullWidth color='secondary' classes={{ root: classes.buttonProfile }} size="medium" variant="contained">
                  Nueva Publicacion
                </Button>
                :
            <Button fullWidth color='secondary' classes={{ root: classes.buttonProfile }} size="medium" variant="contained">
              
              <Link
                to="/nueva-publicacion"
                style={{ textDecoration: "none", color: "black" }}
              >
                Nueva Publicacion
              </Link>
            </Button>
            }
          </Box >
        </Box >
      </Box >
    </>
  );
};

export default ProfileCover;
