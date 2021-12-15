import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@material-ui/core';
import { BaseSyntheticEvent, useState } from 'react';
import axios from 'axios';


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
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [input, setInput] = useState<UpdateUserdata>({
        firstName: "",
        lastName: "",
        userName: "",
        dni: "",
        phone: ""
    })

    const handleChange = (event: React.BaseSyntheticEvent) => {
        setInput({ ...input, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event: React.BaseSyntheticEvent) => {
        event.preventDefault();
        await axios.put("/auth/update", { id: props.id, phone: input.phone, firstName: input.firstName, userName: input.userName, lastName: input.lastName, dni: input.dni })
        await props.getOneUser()
        handleClose()
    }

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
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        En este sector vas a poder actualizar tus datos de cuenta y datos personales
                    </Typography>
                    <Box>
                        <TextField id="outlined-basic" onChange={handleChange} name="firstName" value={input.firstName} label="Nombre" variant="outlined" />
                        <TextField id="outlined-basic" onChange={handleChange} name="lastName" value={input.lastName} label="Apellido" variant="outlined" />
                        <TextField id="outlined-basic" onChange={handleChange} name="userName" value={input.userName} label="UserName" variant="outlined" />
                        <TextField id="outlined-basic" onChange={handleChange} name="dni" value={input.dni} label="DNI" variant="outlined" />
                        <TextField id="outlined-basic" onChange={handleChange} name="phone" value={input.phone} label="Teléfono" variant="outlined" />
                    </Box>
                    <Button onClick={handleSubmit}>Enviar</Button>
                    <Button onClick={handleClose}>Cancelar</Button>
                </Box>
            </Modal>
        </div>
    );
}