import React, { useState, BaseSyntheticEvent } from "react";
import { Box, Button, Typography, Modal, TextField } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import axios from "axios";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #00c2cb",
  boxShadow: 24,
  p: 4,
  height: "523px",
  borderRadius: "10px",
};

const useStyles = makeStyles({
  buttonProfileUpdate: {
    "& span": {
      margin: "0px",
    },
  },
  buttonProfileUpdateModal: {
    marginRight: "5px",
    "& span": {
      margin: "0px",
    },
  },
});

interface UpdateUserdata {
  firstName: String;
  lastName: string;
  userName: string;
  dni: string;
  phone: string;
}
interface UserId {
  id: string | undefined;
  getOneUser: Function;
}
export default function ModalUpdateUser(props: UserId) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const classes = useStyles();

  const [input, setInput] = useState<UpdateUserdata>({
    firstName: "",
    lastName: "",
    userName: "",
    dni: "",
    phone: "",
  });

  const handleChange = (event: BaseSyntheticEvent) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    axios.put("/auth/update", {
      id: props.id,
      phone: input.phone,
      firstName: input.firstName,
      lastName: input.lastName,
      dni: input.dni,
      userName: input.userName,
    });
    handleClose();
  };

  const handleCancel = () => {
    handleClose();
    setInput({
      firstName: "",
      lastName: "",
      userName: "",
      dni: "",
      phone: "",
    });
  };

  return (
    <div>
      <Button
        fullWidth
        color="primary"
        variant="contained"
        classes={{ root: classes.buttonProfileUpdate }}
        onClick={handleOpen}
      >
        Modificar Datos
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Modificacion de datos de Usuario
          </Typography>
          <Typography id="modal-modal-description" style={{ marginTop: 2 }}>
            En este sector vas a poder actualizar tus datos de cuenta y datos
            personales
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              height: "335px",
            }}
          >
            <TextField
              id="outlined-basic"
              onChange={handleChange}
              name="firstName"
              value={input.firstName}
              label="Nombre"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              onChange={handleChange}
              name="lastName"
              value={input.lastName}
              label="Apellido"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              onChange={handleChange}
              name="dni"
              value={input.dni}
              label="DNI"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              onChange={handleChange}
              name="userName"
              value={input.userName}
              label="Tienda"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              onChange={handleChange}
              name="phone"
              value={input.phone}
              label="Teléfono"
              variant="outlined"
            />
          </Box>

          <Button
            color="primary"
            classes={{ root: classes.buttonProfileUpdateModal }}
            variant="outlined"
            onClick={handleSubmit}
            style={{ marginTop: "5px" }}
          >
            Enviar
          </Button>
          <Button
            color="primary"
            classes={{ root: classes.buttonProfileUpdate }}
            variant="outlined"
            onClick={handleCancel}
            style={{ marginTop: "5px" }}
          >
            Cancelar
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
