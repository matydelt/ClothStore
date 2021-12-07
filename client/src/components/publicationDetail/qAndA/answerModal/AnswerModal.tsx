import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import axios from 'axios';

interface IAnswerForm {
    questionId: string;
    authorId: string;
    message: string;
}

export default function AnswerModal({ children, questionId, authorId, getQuestions }: any) {
    const [open, setOpen] = React.useState(false);
    const [answerForm, setAnswerForm] = React.useState<IAnswerForm>({
        questionId: questionId || '',
        authorId: authorId || '',
        message: ''
    });

    const { message } = answerForm;

    const handleClickOpen = () => {
        setOpen(true);
        setAnswerForm({
            questionId: questionId || '',
            authorId: authorId || '',
            message: ''
        })
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleForm(e: React.BaseSyntheticEvent) {
        setAnswerForm({ ...answerForm, [e.target.name]: e.target.value });
    }

    function submitForm(e: React.BaseSyntheticEvent) {
        e.preventDefault();
        console.log(answerForm);
        axios.post('/answer', answerForm).then(({data}) => {
            getQuestions();
        })
    }

    return (
        <div>
            <Button onClick={handleClickOpen}>
                {children}
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <Box component="form" onSubmit={submitForm} sx={{ width: 500 }}>
                    <DialogTitle>Responder</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                    
                        </DialogContentText>
                        <TextField
                            onChange={handleForm}
                            autoFocus
                            margin="dense"
                            id="message"
                            name="message"
                            value={message}
                            label="Escribe una respuesta"
                            type="text"
                            fullWidth
                            multiline
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button type="submit" onClick={handleClose}>Responder</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
}
