import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Rating } from "@mui/material";
import { IconButton } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import axios from "axios";
// import { useParams } from "react-router";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../../redux/store/store";
// import { User } from "../../../../redux/reducer/stateTypes";

interface ReviewFormInterface {
  score: number;
  title: string;
  message: string;
  authorId: string | undefined;
  publicationId: string | undefined;
  _id: string | undefined;
}

interface Props {
  publicationId: string | undefined;
  userId: string | undefined;
}

const useStyles = makeStyles({
  rootReviews: {
    position: "absolute",
    right: "10px",
    top: "10px",
    "& span": {
      marginLeft: "0px",
    },
  },
  tabs: {
    width: "30%",
  },
  dialogContent: {
    marginBottom: "2px",
  },
});

export default function ReviewForm({ publicationId, userId }: Props) {
  // const user = useSelector((state: RootState): User | undefined => state?.userSignin?.userInfo);

  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  // console.log(userId);

  const [reviewForm, setReviewForm] = React.useState<ReviewFormInterface>({
    score: 1,
    title: "",
    message: "",
    authorId: userId,
    publicationId,
    _id: "",
  });

  const { title, score, message } = reviewForm;

  React.useEffect(() => {
    // if(open){
    axios.get(`/review/${publicationId}/${userId}`).then(({ data }) => {
      if (data) {
        setReviewForm({
          ...reviewForm,
          message: data.message,
          score: data.score,
          title: data.title,
          _id: data._id,
        });
      }
    });
    // }
    // }, [open]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    // console.log(reviewForm);

    axios.post("/review", reviewForm).then(() => {
      handleClose();
    });
  };

  return (
    <>
      <Button onClick={handleClickOpen}>
        {reviewForm._id ? "Modificar reseña" : "Dejar reseña"}
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Opiniones sobre el producto</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          classes={{ root: classes.rootReviews }}
          size="large"
        >
          <CloseIcon />
        </IconButton>

        <DialogContent>
          <Box component="form" onSubmit={(e: any) => submitReviewForm(e)}>
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
              <Button type="button" onClick={handleClose}>
                Cancelar
              </Button>
              <Button type="submit">Publicar reseña</Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
