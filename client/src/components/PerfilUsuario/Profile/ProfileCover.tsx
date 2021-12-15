import {
  Box, Button, TextField, Typography
} from '@mui/material';
import { Link } from "react-router-dom"
import * as React from "react"
import ModalUpdateUser from "./ModalUpdateUser";





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
}

const ProfileCover = (props: Props) => {
  return (
    <>
      <Box display="flex" mb={3}>
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            ¡Bienvenid@ {props.firstName}!
          </Typography>
          <Typography variant="subtitle2">
            Este es tu perfil, aqui podras gestionar todas tus ventas y compras, ademas vas a poder ver las metricas de tus ventas
          </Typography>
        </Box>
      </Box>
      <Box sx={{ marginTop: "100px" }} py={2} pl={2} mb={3}>

        <Typography gutterBottom variant="h4">
          {props.firstName} {props.lastName}
        </Typography>
        <legend>Datos de la Cuenta</legend>
        <div className="div-field">
          <TextField
            disabled
            label="User name"
            value={props.userName}

          />
          <TextField
            name='phone'
            disabled
            label="Teléfono:"
            value={props.phone}
          />
          <TextField
            disabled
            label="E-mail:"
            value={props.email}

          />
        </div>


        <legend>Datos personales</legend>
        <div className="div-field">
          <TextField
            name='firstName'
            disabled
            label="Nombre:"
            value={props.firstName}

          />

          <TextField
            name='lastName'
            disabled
            label="Apellido:"
            value={props.lastName}

          />
        </div>
        <div className="div-field">
          <TextField
            name='dni'
            disabled
            label="DNI:"
            value={props.dni}

          />
        </div>


        <Box
          display={{ xs: 'block', md: 'flex' }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>

            <ModalUpdateUser id={props.id} />

            <Button size="medium" variant="contained">
              <Link to="/nueva-publicacion" style={{ textDecoration: "none", color: "black" }}>Nueva Publicacion</Link>
            </Button>

          </Box>

        </Box>
      </Box>
    </>
  );
};


export default ProfileCover;
