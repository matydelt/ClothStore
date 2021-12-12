import React, { BaseSyntheticEvent, useState } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import { User } from '../../../redux/reducer/stateTypes';
import AnswerModal from './answerModal/AnswerModal';

interface Form {
    message: string;
    publicationId: string;
    authorId: string;
}


export default function QAndA(): JSX.Element {

    const { publicationId } = useParams();
    const user = useSelector((state: RootState): User | undefined => state?.userSignin?.userInfo);

    const [form, setForm] = useState<Form>({ message: '', publicationId: publicationId || '', authorId: user?._id || '' });
    const [isBuyer, setIsBuyer] = useState<boolean>(false);

    const { message } = form;

    const [questions, setQuestions] = React.useState<[]>();


    React.useEffect(() => {
        getQuestions();
    }, [publicationId]);

    React.useEffect(() => {
        if (user) {
            setIsBuyer(user && !(user?.publications?.find(p => p._id === publicationId)));
        }
    }, []);

    function getQuestions() {
        axios.get('/qAndAs/' + publicationId).then(({ data }) => {
            setQuestions(data);
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
        <Box component="div" sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

            <Typography variant="h5">Preguntas y respuestas</Typography>

            {isBuyer &&

                <Grid onSubmit={submitForm} component="form" container spacing={2} sx={{ my: 3 }}>
                    <Grid item xs={5}>
                        <TextField
                            onChange={handleForm}
                            fullWidth
                            name="message"
                            value={message}
                            id="outlined-helperText"
                            label="Escribe tu pregunta..."
                            helperText="Consejo: ¡Busca entre las respuestas antes de preguntar!"
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <Button disabled={!message} type="submit">Preguntar</Button>
                    </Grid>
                </Grid>
            }

            {/* </Box> */}

            <Box component="div">
                {questions?.map((q: any) => {
                    return <Box key={q._id} component="div" sx={{ my: 3 }}>
                        <Typography component="p">
                            {q.message}
                        </Typography>

                        {!isBuyer && !q.answer?.message?.length ?

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
        </Box>



    </>)

}