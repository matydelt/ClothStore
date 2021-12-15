import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
} from "@material-ui/core";
import * as React from "react";
import { TextField } from "@mui/material";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import axios from "axios";

interface Props {
  children: any;
  userId: string | undefined;
  publicationId: string | undefined;
  getPublications: () => void;
}

// const getTomorrowDate = () => {
//   let today = new Date()
//   let tomorrow = new Date(today)
//   tomorrow.setDate(tomorrow.getDate() + 1)
//   return tomorrow
// }

export default function DiscountModal({ children, userId, publicationId, getPublications }: Props) {

  const [open, setOpen] = React.useState(false);

  const [expirationDate, setExpirationDate] = React.useState<Date | null>(null);

  const [form, setForm] = React.useState({
    authorId: userId || "",
    publicationId: publicationId || "",
    amount: 10,
    percentage: "",
    expirationDate,
  });

  const { percentage } = form;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitForm = () => {
    axios.post("/discount", form).then(({ data }) => {
      handleClose();
      setForm({
        authorId: userId || "",
        publicationId: publicationId || "",
        amount: 10,
        percentage: '',
        expirationDate
      })
      getPublications();
      setExpirationDate(null);
    });
  };

  const handleForm = (e: React.BaseSyntheticEvent) => {
    if ( (e.target.value < 1 || e.target.value > 100) && e.target.value !== '') return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDate = (newValue: Date | null) => {
    if (newValue) {

      setForm({ ...form, expirationDate: new Date(new Date(Date.UTC(newValue && newValue?.getFullYear(), newValue?.getMonth(), newValue?.getDate() + 1 )).setHours(23,59,0,0)) });
      setExpirationDate(new Date(Date.UTC(newValue && newValue?.getFullYear(), newValue?.getMonth(), newValue?.getDate() + 1 )) );
    }
  };

  return (
    <div>
      <Button className='buttonSpan' color='secondary' variant='outlined' onClick={handleClickOpen}>{children}</Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Aplicar descuento</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Aplicar un nuevo descuento reemplazará al actual.
          </DialogContentText>

          <Box component="div" sx={{ my: 6, display: "flex", flexDirection: "row", justifyContent: 'space-between' }}>

          <DialogContentText>
            El descuento finalizará a las 23:59 hs. del día seleccionado.
          </DialogContentText>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                inputFormat={"dd/MM/yyyy"}
                label="Fecha de expiración"
                value={expirationDate}
                onChange={(newValue: Date | null) => {
                  handleDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
                minDate={new Date()}
              />
            </LocalizationProvider>
          </Box>

          <TextField
            // autoFocus
            margin="dense"
            label="Porcentaje del descuento (Entre 1 y 100)"
            type="number"
            value={percentage}
            name="percentage"
            fullWidth
            variant="standard"
            autoComplete="off"
            onChange={(e) => handleForm(e)}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
              inputProps: { min: 1, max: 100 },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button disabled={!percentage || !expirationDate} onClick={submitForm}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
