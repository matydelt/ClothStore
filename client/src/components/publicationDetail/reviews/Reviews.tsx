import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, Rating, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';

export default function Reviews({ children }: any) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleClickOpen}>
                {children}
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth
                maxWidth="md">
                <DialogTitle>Opiniones sobre el producto</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        // color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    {/* <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Subscribe</Button>
                    </DialogActions> */}

                    <Box component="div" sx={{mb: 4, textAlign: 'center'}}>
                        <Typography variant="h3" sx={{}}>1</Typography>
                        <Rating name="read-only" defaultValue={1} value={1} readOnly size="large" />
                        <Typography component="p" sx={{fontSize: '10px', color: 'gray'}}>Promedio entre 3 opiniones</Typography>
                    </Box>



                    <Rating name="read-only" defaultValue={1} value={1} readOnly />
                    <Typography variant="h6">Tiene un hilito para afuera</Typography>
                    <DialogContentText sx={{ mb: 2 }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi sed laborum ratione dolorum autem tempore maiores quae, molestias culpa fugiat earum eligendi ducimus veniam cupiditate incidunt a dolorem iusto quaerat?
                    </DialogContentText>
                    <Rating name="read-only" defaultValue={2} value={2} readOnly />
                    <Typography variant="h6">Yo lo quería en azul pero no hay opción para el color</Typography>
                    <DialogContentText sx={{ mb: 2 }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi sed laborum ratione dolorum autem tempore maiores quae, molestias culpa fugiat earum eligendi ducimus veniam cupiditate incidunt a dolorem iusto quaerat?
                    </DialogContentText>
                    <Rating name="read-only" defaultValue={0} value={0} readOnly />
                    <Typography variant="h6">No hay remeras para no binarios??</Typography>
                    <DialogContentText sx={{ mb: 2 }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi sed laborum ratione dolorum autem tempore maiores quae, molestias culpa fugiat earum eligendi ducimus veniam cupiditate incidunt a dolorem iusto quaerat?
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}