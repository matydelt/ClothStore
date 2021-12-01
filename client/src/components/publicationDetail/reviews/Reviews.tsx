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
import axios from 'axios';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import { User } from '../../../redux/reducer/stateTypes';

interface ReviewForm {
    score: number,
    title: string,
    message: string,
    authorId: string,
    publicationId: string,
}

export default function Reviews({ children }: any) {

    const user = useSelector((state: RootState): User | undefined => state?.userSignin?.userInfo);

    const { publicationId } = useParams();

    const [open, setOpen] = React.useState(false);

    const [reviews, setReviews] = React.useState<ReviewForm[]>([]);
    
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
            axios.get('/reviews/' + publicationId).then(({ data }) => {
                setReviews(data);
            });
        }
    }, [open]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleReviewForm = (e: any) => {
        setReviewForm({ ...reviewForm, [e.target.name]: e.target.value });
    };

    const submitReviewForm = (e: any) => {
        e.preventDefault();

        axios.post('/review', reviewForm).then(() => {
            handleClose();
        });
    };

    const scoreAverage = (): number => {
        const sum = reviews.reduce((partial_sum, r) => partial_sum + r.score, 0);
        return Math.round(sum / reviews.length);
    };

    return (
        <>
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

                    {reviews?.length < 1 ?

                        <Box component="div" sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>

                            <Typography variant="h6" sx={{color: 'gray'}}>
                                No hay reseñas sobre este producto
                            </Typography>

                        </Box>

                        : <>

                            <Box component="div" sx={{ mb: 4, textAlign: 'center' }}>
                                <Typography variant="h3" sx={{}}>{scoreAverage()}</Typography>
                                <Rating name="read-only" value={scoreAverage()} readOnly size="large" />
                                <Typography component="p" sx={{ fontSize: '10px', color: 'gray' }}>Promedio entre {reviews.length} opiniones</Typography>
                            </Box>

                            {
                                reviews?.map((review, i) => {
                                    return <Box component="div" key={i} sx={{ my: 2 }}>
                                        <Rating name="read-only" value={review.score} readOnly size="small" />
                                        <Typography variant="h6">{review.title}</Typography>
                                        <DialogContentText sx={{ mb: 2 }}>
                                            {review.message}
                                        </DialogContentText>

                                    </Box>
                                })
                            }
                        </>}

                </DialogContent>
            </Dialog>
        </ >
    );
}