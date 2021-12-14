import * as React from "react";
import { Box, Button, Typography, Modal, TextField } from "@material-ui/core";
import axios from "axios";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
interface UpdateUserdata {
  firstName: String;
  lastName: string;
  dni: string;
  phone: string;
}
interface UserId {
  id: string | undefined;
}
export default function ModalUpdateUser(props: UserId) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [input, setInput] = React.useState<UpdateUserdata>({
    firstName: "",
    lastName: "",
    dni: "",
    phone: "",
  });

  const handleChange = (event: React.BaseSyntheticEvent) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    axios.put("http://localhost:3001/auth/update", {
      id: props.id,
      phone: input.phone,
      firstName: input.firstName,
      lastName: input.lastName,
      dni: input.dni,
    });
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen}>Modificar Datos</Button>
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
          <Box>
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
              name="phone"
              value={input.phone}
              label="Teléfono"
              variant="outlined"
            />
          </Box>
          <Button onClick={handleSubmit}>Enviar</Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </Box>
      </Modal>
    </div>
  );
}
