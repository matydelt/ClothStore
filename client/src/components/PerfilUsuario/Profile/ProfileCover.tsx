import { Avatar } from "@material-ui/core";
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import {
  Box, Button, Card, CardMedia, IconButton, Input, TextField, Typography
} from '@mui/material';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom"
import * as React from "react"


const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


interface Props {
  photo: string | undefined;
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
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState<Props>({
    photo: "",
    phone: "",
    email: "",
    firstName: "",
    lastName: "",
    dni: "",
    calle: "",
    numero: "",
    ciudad: "",
    cp: "",
    country: "",

  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = React.useState<Name>({
    firstName: "",
    lastName: ""
  })
  type Name = { firstName: string, lastName: string }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.name === "firstName") {

      setName({ ...name, [e.target.name]: e.target.value });
    } else if (e.target.name === "lastName") {
      setName({ ...name, ["lastName"]: e.target.value });
    } else {
      setInput({ ...input, [e.target.name]: e.target.value });
    }
  }

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
        <AvatarWrapper>
          <Avatar variant="rounded" alt={props.firstName} src={props.photo} />

        </AvatarWrapper>
        <Typography gutterBottom variant="h4">
          {props.firstName} {props.lastName}
        </Typography>
        <legend>Datos de la Cuenta</legend>
        <div className="div-field">
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

        <legend>Domicilio</legend>
        <div className="div-field">
          <TextField
            name='calle'
            disabled
            label="Calle:"
            value={props.calle}

          />

          <TextField
            name='numero'

            disabled
            label="Número:"
            value={props.numero}

          />
        </div>
        <div className="div-field">
          <TextField
            name='ciudad'
            disabled
            label="Ciudad:"
            value={props.ciudad}

          />
          <TextField
            name='country'
            disabled
            label="Pais:"
            value={props.country}

          />

          <TextField
            name='cp'
            disabled
            label="Código postal:"
            value={props.cp}

          />
        </div>

        <Box
          display={{ xs: 'block', md: 'flex' }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>

            <Button size="medium" variant="contained" onClick={handleOpen}>Open modal</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Datos de usuario:
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Aqui podras modificar los datos
                </Typography>
                <Input type="text" id="nombre" name="firstName" value={props.firstName} onChange={handleInputChange} />
              </Box>

            </Modal>

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
