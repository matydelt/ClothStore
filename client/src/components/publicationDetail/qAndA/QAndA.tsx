import React, { BaseSyntheticEvent, useState } from 'react';
import { Grid, Typography, Skeleton, Stack } from '@mui/material';
import { Button, TextField, makeStyles } from '@material-ui/core';
import { Box } from '@mui/system';
import axios from 'axios';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import { User } from '../../../redux/reducer/stateTypes';
import AnswerModal from './answerModal/AnswerModal';

const useStyles = makeStyles({
    buttonQandA: {
        height: '51px',
        display: 'block',
        width: '133px',
        transform: 'translate(0px, 3px)',
        '& span': {
            margin: '0px'
        }
    },
    inputQandA: {
        height: '51px'
    }
})
interface Form {
    message: string;
    publicationId: string;
    authorId: string;
}


export default function QAndA(): JSX.Element {

    const classes = useStyles();

    const { publicationId } = useParams();
    const user = useSelector((state: RootState): User | undefined => state?.userSignin?.userInfo);


    const [form, setForm] = useState<Form>({ message: '', publicationId: publicationId || '', authorId: user?._id || '' });
    const [isBuyer, setIsBuyer] = useState<boolean>(false);
    const [isSeller, setIsSeller] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const { message } = form;

    const [questions, setQuestions] = React.useState<[]>();

    React.useEffect(() => {
        getQuestions();
    }, [publicationId, user]);


    async function checkIsBuyer() {
        if (user && user.email) {
            const { data } = await axios.get('/publication', { params: { publicationId } })
            console.log(data?.author, user?._id)
            if (data?.author !== user?._id) {
                setIsBuyer(true)
            } else if (data?.author === user?._id) {
                setIsSeller(true)
            }
        }
    }


    function getQuestions() {

        checkIsBuyer();

        axios.get('/qAndAs/' + publicationId).then(({ data }) => {
            setQuestions(data);
            setLoading(false)
        });
    };

    function handleForm(e: BaseSyntheticEvent) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function submitForm(e: BaseSyntheticEvent) {
        e.preventDefault();

        axios.post('/question', form).then(({ data }) => {
            setForm({ message: '', publicationId: publicationId || '', authorId: user?._id || '' });
            getQuestions();
        })
    }

    return (<>

        <Box component="div" sx={{display: 'flex', flexDirection: 'column', width: '100%' }}>

            <Typography variant="h5">Preguntas y respuestas</Typography>

            {loading ?

                <Stack spacing={2} width={700} marginY={3}>
                    <Skeleton variant="rectangular" height={20} style={{ marginLeft: 0 }} />
                    <Skeleton variant="rectangular" height={50} />
                    <Skeleton variant="rectangular" height={20} />
                    <Skeleton variant="rectangular" height={50} />
                    <Skeleton variant="rectangular" height={20} />
                    <Skeleton variant="rectangular" height={50} />
                </Stack>

                :


                <Box>


                    {(user && isBuyer) &&

                        <Grid onSubmit={submitForm} component="form" container spacing={2} sx={{ my: 3 }}>
                            <Grid item xs={5}>
                                <TextField
                                    onChange={handleForm}
                                    variant='outlined'
                                    fullWidth
                                    name="message"
                                    value={message}
                                    id="outlined-helperText"
                                    label="Escribe tu pregunta..."
                                    helperText="Consejo: ¡Busca entre las respuestas antes de preguntar!"
                                    autoComplete="off"
                                    classes={{ root: classes.inputQandA }}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <Button
                                className='buttonSpan'
                                    variant='contained'
                                    color='primary'
                                    classes={{ root: classes.inputQandA }}
                                    disabled={!message}
                                    type="submit"
                                >
                                    Preguntar
                                </Button>
                            </Grid>
                        </Grid>
                    }

                    {questions && questions.length > 0 ?

                        <Box component="div">
                            {questions?.map((q: any) => {
                                return <Box key={q._id} component="div" sx={{ my: 3 }}>
                                    <Typography component="p">
                                        {q.message}
                                    </Typography>

                                    {user && isSeller && !q.answer?.message?.length ?

                                        <AnswerModal questionId={q._id} authorId={user?._id} getQuestions={getQuestions}>
                                            <div>Responder</div>
                                        </AnswerModal>

                                        :
                                        <Typography component="p" sx={{ color: 'gray ' }}>
                                            {q.answer?.message ? q.answer?.message : 'Sin respuesta'} {q.answer?.createdAt && new Date(q.answer?.createdAt).toLocaleDateString()}
                                        </Typography>
                                    }
                                </Box>
                            })
                            }
                        </Box>

                        :

                        <Typography sx={{ color: 'gray', m: 2 }}>Aún no hay preguntas en esta publicación</Typography>

                    }

                </Box>
            }

        </Box>

    </>)

}