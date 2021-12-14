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
import { RootState } from '../../../redux/store/store';
import { User } from '../../../redux/reducer/stateTypes';

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
interface ID {
    id: string
}

export default function ModalShopping(props: ID) {

    const user = useSelector((state: RootState): User | undefined => state?.userSignin?.userInfo);

    const publicationId = props.id

    const [open, setOpen] = React.useState(false);
    const classes = useStyles()


    const [reviews, setReviews] = React.useState<ReviewForm[]>([]);
    const [scoreAverage, setScoreAverage] = React.useState<number>(0);
    const [totalScores, setTotalScores] = React.useState<number>(0);
    const [tab, setTab] = React.useState(0);
    const [element, setElement] = React.useState<any>(null);
    const [from, setFrom] = React.useState<number>(1);
    const [filterCriteria, setFilterCriteria] = React.useState<string>('all');
    const [loading, setLoading] = React.useState<boolean>(false);

    const [reviewForm, setReviewForm] = React.useState<ReviewForm>({
        score: 1,
        title: '',
        message: '',
        authorId: user?._id || '',
        publicationId: publicationId || '',
    });

    const { title, score, message } = reviewForm;

    const observer = React.useRef(
        new IntersectionObserver(
            async entries => {
                const first = entries[0];
                if (first.isIntersecting) {
                    setFrom(state => state + 1)
                }
            },
            { threshold: 1 }
        ));


    React.useEffect(() => {
        const currentElement = element;
        const currentObserver = observer.current;

        if (currentElement) {
            currentObserver.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        };
    }, [element]);



    React.useEffect(() => {
        if (open) {
            setLoading(true)
            // setFilterCriteria('all')
            // setTab(0)
            // setFrom(1)
            // getReviews('all');
            handleTab(undefined, 0)

        }
    }, [open]);

    React.useEffect(() => {
        if (from > 0) {
            getReviewsInfiniteScroll(filterCriteria, from);
        }
    }, [from]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setFrom(1)
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

    const getReviews = (filterCriteria: string) => {
        axios.get('/reviews/' + publicationId, { params: { filterCriteria } }).then(({ data }) => {
            setScoreAverage(data.scoreAverage);
            setReviews(data.reviews);
            setTotalScores(data.totalScores);
            setLoading(false);
        });
    };

    const getReviewsInfiniteScroll = (filterCriteria: string, from: number) => {
        axios.get('/reviews/' + publicationId, { params: { filterCriteria, from } }).then(({ data }) => {
            setScoreAverage(data.scoreAverage);
            setReviews(state => [...state, ...data.reviews]);
            setTotalScores(data.totalScores);
        });
    };

    const handleTab = async (event: any, newTab: number) => {
        setTab(newTab);

        await setFrom(1);

        let filter = 'all';
        if (newTab === 0) {
            filter = 'all'
            setFilterCriteria('all');
        }
        if (newTab === 1) {
            filter = 'positive'
            setFilterCriteria('positive');
        }
        if (newTab === 2) {
            filter = 'negative'
            setFilterCriteria('negative');
        }
        getReviews(filter);

    };






    return (
        <>
            <Button onClick={handleClickOpen}>
                Review
            </Button>

            <Dialog open={open} onClose={handleClose} fullWidth
                maxWidth="md">
                <DialogTitle>Opiniones sobre el producto</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    classes={{ root: classes.rootReviews }}
                >
                    <CloseIcon />
                </IconButton>


                {loading ?

                    <CircularProgress color="primary" style={{ padding: '200px 0', margin: 'auto' }}></CircularProgress>

                    :

                    <DialogContent>
                        {/* <Box component="form"
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

                    </Box> */}


                        <Box component="div" sx={{ my: 6, textAlign: 'center' }}>
                            <Typography variant="h3" sx={{}}>{scoreAverage}</Typography>
                            <Rating sx={{ color: '#00c2cb' }} name="read-only" value={scoreAverage} readOnly size="large" />
                            <Typography component="p" sx={{ fontSize: '10px', color: 'gray' }}>Promedio entre {totalScores} opiniones</Typography>
                        </Box>

                        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            <Tabs textColor="primary" indicatorColor="primary" value={tab} onChange={handleTab} centered>
                                <Tab classes={{ root: classes.tabs }} label="Todas" />
                                <Tab classes={{ root: classes.tabs }} label="Positivas" />
                                <Tab classes={{ root: classes.tabs }} label="Negativas" />
                            </Tabs>
                        </Box>


                        {reviews?.length < 1 ?

                            <Box component="div" sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>

                                <Typography variant="h6" sx={{ color: 'gray' }}>
                                    No hay reseñas sobre este producto
                                </Typography>

                            </Box>

                            : <>

                                {
                                    reviews && reviews?.map((review, i) => {
                                        return <Box component="div" key={review.title + i} sx={{ my: 5 }}>
                                            <Rating sx={{ color: '#00c2cb' }} name="read-only" value={review?.score} readOnly size="small" />
                                            <Typography variant="h6">{review.title}</Typography>
                                            <DialogContentText classes={{ root: classes.dialogContent }}>
                                                {review.message}
                                            </DialogContentText>

                                        </Box>
                                    })
                                }
                                {
                                    <div
                                        ref={setElement}
                                    ></div>
                                }
                            </>}

                    </DialogContent>
                }
            </Dialog>
        </ >
    );
}