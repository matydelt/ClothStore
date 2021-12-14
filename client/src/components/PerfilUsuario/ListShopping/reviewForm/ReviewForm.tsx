import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tabs, Tab, CircularProgress } from '@material-ui/core';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
import { Rating, Typography } from '@mui/material';
import { IconButton, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Box } from '@mui/system';
import axios from 'axios';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store/store';
import { User } from '../../../../redux/reducer/stateTypes';

interface ReviewForm {
    score: number,
    title: string,
    message: string,
    authorId: string,
    publicationId: string,
}

const useStyles = makeStyles({
    rootReviews: {
        position: 'absolute',
        right: '10px',
        top: '10px',
        '& span': {
            marginLeft: '0px'
        }
    },
    tabs: {
        width: '30%'
    },
    dialogContent: {
        marginBottom: '2px'
    }
})


export default function ReviewForm({ publicationId }: any) {

    const user = useSelector((state: RootState): User | undefined => state?.userSignin?.userInfo);


    const [open, setOpen] = React.useState(false);
    const classes = useStyles()


    const [reviewForm, setReviewForm] = React.useState<ReviewForm>({
        score: 1,
        title: '',
        message: '',
        authorId: user?._id || '',
        publicationId: publicationId || '',
    });

    const { title, score, message } = reviewForm;





    React.useEffect(() => {

        
        if (open) {
            console.log(publicationId, '///',  user?._id )
            console.log(reviewForm)
            axios.get(`/review/${publicationId}/${user?._id}`).then(({data}) => {
                if (data) {
                    setReviewForm(data);
                }
            });
        }
    }, [open]);



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleReviewForm = (e: React.BaseSyntheticEvent) => {
        setReviewForm({ ...reviewForm, [e.target.name]: e.target.value });
    };

    const submitReviewForm = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();

        axios.post('/review', reviewForm).then(() => {
            handleClose();
        });
    };




    return (
        <>
            <Button onClick={handleClickOpen}>
                { reviewForm.title ? 'Modificar reseña' : 'Dejar reseña' }
            </Button>



            <Dialog open={open} onClose={handleClose} fullWidth
                maxWidth="sm">
                <DialogTitle>Opiniones sobre el producto</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    classes={{ root: classes.rootReviews }}
                >
                    <CloseIcon />
                </IconButton>


                <DialogContent>
                    <Box component="form"
                        onSubmit={(e: any) => submitReviewForm(e)}
                    >

                        <Rating
                            name="score"
                            value={Number(score)}
                            onChange={(e) => handleReviewForm(e)}
                        />

                        <TextField
                            margin="dense"
                            id="title"
                            label="Título de la reseña"
                            type="title"
                            name="title"
                            fullWidth
                            variant="standard"
                            value={title}
                            onChange={(e) => handleReviewForm(e)}
                        />
                        <TextField
                            margin="dense"
                            id="message"
                            label="Escribe un comentario sobre el producto..."
                            type="message"
                            name="message"
                            multiline
                            fullWidth
                            variant="standard"
                            value={message}
                            onChange={(e) => handleReviewForm(e)}
                        />
                        <DialogActions>
                            <Button type="button" onClick={handleClose}>Cancelar</Button>
                            <Button type="submit" >Publicar reseña</Button>
                        </DialogActions>

                    </Box>




                </DialogContent>

            </Dialog>
        </ >
    );
}