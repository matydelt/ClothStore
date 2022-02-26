import { useState, useEffect, BaseSyntheticEvent } from "react";
import {
  Button,
  Typography,
  Modal,
  TextField,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Box } from "@mui/system";
import { Skeleton, Stack } from "@mui/material";
import axios from "axios";
import { useAppSelector } from "../../../hooks/reduxHooks";
// import { User } from "../../../redux/reducer/stateTypes";
// import AnswerModal from "../../publicationDetail/qAndA/answerModal/AnswerModal";

interface IAnswerForm {
  questionId: string;
  authorId: string;
  message: string;
}

interface PubId {
  id: string;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalQA(props: PubId): JSX.Element {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const publicationId = props.id;
  const user = useAppSelector((state) => state.userSignin.userInfo);

  const [isBuyer, setIsBuyer] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [questions, setQuestions] = useState<[]>();
  const [answerForm, setAnswerForm] = useState<IAnswerForm>({
    questionId: "",
    authorId: "",
    message: "",
  });

  useEffect(() => {
    if (user) {
      setLoading(true);
      getQuestions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function getQuestions() {
    await setIsBuyer(
      !!!user?.publications?.find((p) => p._id === publicationId)
    );
    if (publicationId) {
      axios.get("/qAndAs/" + publicationId).then(({ data }) => {
        setQuestions(data);
        setLoading(false);
      });
    }
  }
  function handleForm(
    e: BaseSyntheticEvent,
    questionId: string,
    authorId: string
  ) {
    setAnswerForm({ message: e.target.value, authorId, questionId });
  }
  // console.log(answerForm);
  function submitForm(e: BaseSyntheticEvent) {
    e.preventDefault();
    if (answerForm.message !== "") {
      // console.log(answerForm);
      axios.post("/answer", answerForm).then(({ data }) => {
        getQuestions();
        setAnswerForm({ message: "", authorId: "", questionId: "" });
      });
    }
  }
  if (user) {
    return (
      <>
        <div>
          <Button
            className="buttonSpan buttonMargin"
            color="primary"
            variant="outlined"
            onClick={handleOpen}
          >
            Q & A
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography variant="h5">Preguntas y respuestas</Typography>

              {loading ? (
                <Stack spacing={2} width={700} marginY={3}>
                  <Skeleton
                    variant="rectangular"
                    height={20}
                    width={300}
                    style={{ marginLeft: 0 }}
                  />
                  <Skeleton variant="rectangular" height={50} width={300} />
                  <Skeleton variant="rectangular" height={20} width={300} />
                  <Skeleton variant="rectangular" height={50} width={300} />
                  <Skeleton variant="rectangular" height={20} width={300} />
                  <Skeleton variant="rectangular" height={50} width={300} />
                </Stack>
              ) : (
                <Box>
                  {/* </Box> */}

                  {questions && questions.length > 0 ? (
                    <Box
                      component="div"
                      overflow={"auto"}
                      sx={{ maxHeight: "600px" }}
                    >
                      {questions?.map((q: any) => {
                        // console.log(q);
                        return (
                          <Box key={q._id} component="div" sx={{ my: 3 }}>
                            <Typography component="p">{q.message}</Typography>

                            {!isBuyer && !q.answer?.message?.length ? (
                              <Box component="form" onSubmit={submitForm}>
                                <DialogContent>
                                  <DialogContentText></DialogContentText>
                                  <TextField
                                    onChange={(k) =>
                                      handleForm(k, q._id, user?._id)
                                    }
                                    autoFocus
                                    margin="dense"
                                    id="message"
                                    name="message"
                                    // value={answerForm.message}
                                    label="Escribe una respuesta"
                                    type="text"
                                    fullWidth
                                    multiline
                                    variant="standard"
                                  />
                                </DialogContent>
                                <DialogActions>
                                  <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className="buttonSpan"
                                  >
                                    Responder
                                  </Button>
                                </DialogActions>
                              </Box>
                            ) : (
                              <Typography
                                component="p"
                                style={{ color: "gray " }}
                              >
                                {q.answer?.message
                                  ? q.answer?.message
                                  : "Sin respuesta"}{" "}
                                {q.answer?.createdAt &&
                                  new Date(
                                    q.answer?.createdAt
                                  ).toLocaleDateString()}
                              </Typography>
                            )}
                          </Box>
                        );
                      })}
                    </Box>
                  ) : (
                    <Typography style={{ color: "gray", margin: 2 }}>
                      Aún no hay preguntas en esta publicación
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          </Modal>
        </div>
      </>
    );
  } else return <></>;
}
