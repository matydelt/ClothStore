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
interface DomData {
  street: String;
  suite: string;
  city: string;
  country: string;
  cp: string;
}
interface UserId {
  id: string | undefined;
}
export default function ModalCargaDomicilio(props: UserId) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [input, setInput] = React.useState<DomData>({
    street: "",
    suite: "",
    city: "",
    country: "",
    cp: "",
  });

  const handleChange = (event: React.BaseSyntheticEvent) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    axios.put("/auth/domicilio", { id: props.id, street: input.street, suite: input.suite, city: input.city, country: input.country, cp: input.cp })
    handleClose()
  }

  return (
    <div>
      <Button onClick={handleOpen}>Agregar domicilio</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Agregar un domicilio
          </Typography>
          <Typography id="modal-modal-description" style={{ marginTop: 2 }}>
            Se podran agregar los domicilios de entrega.
          </Typography>
          <Box>
            <TextField
              id="outlined-basic"
              onChange={handleChange}
              name="street"
              value={input.street}
              label="Calle"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              onChange={handleChange}
              name="suite"
              value={input.suite}
              label="Número"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              onChange={handleChange}
              name="city"
              value={input.city}
              label="Ciudad"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              onChange={handleChange}
              name="country"
              value={input.country}
              label="País"
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              onChange={handleChange}
              name="cp"
              value={input.cp}
              label="Código postal"
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
