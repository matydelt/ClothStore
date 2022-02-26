import { Button } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import axios from "axios";
import Resizer from "react-image-file-resizer";

const useStyles = makeStyles({
  buttonImageUpload: {
    "& span": {
      margin: "0",
    },
  },
});

export default function FileUpload({
  form,
  setForm,
  setLoadingImage,
}: any): JSX.Element {
  const classes = useStyles();

  function handleImagenes(e: { target: { files: any } }) {
    let files: File[] = e.target.files;
    let allUploadedFiles: {}[] = form.images;

    if (files) {
      setLoadingImage(true);
      for (let index = 0; index < files.length; index++) {
        // console.log(files[index]);
        Resizer.imageFileResizer(
          files[index],
          3000,
          3000,
          "PNG",
          100,
          0,
          (uri) => {
            axios
              .post("/imageupload", { image: uri })
              .then((res) => {
                allUploadedFiles.push(res.data);
                setForm({ ...form, images: allUploadedFiles });
                setLoadingImage(false);
              })
              .catch((err) => console.log(err));
          }
        );
      }
    }
  }

  return (
    <Button
      variant="contained"
      component="label"
      color="primary"
      classes={{ root: classes.buttonImageUpload }}
    >
      Subir imágenes
      <input
        onChange={(e) => handleImagenes(e)}
        accept="images/*"
        multiple
        type="file"
        hidden
      />
    </Button>
  );
}
