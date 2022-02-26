import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import {
  Avatar,
  Container,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Typography,
  Divider,
  CircularProgress,
  SelectChangeEvent,
} from "@mui/material";
import {
  TextField,
  Button,
  Badge,
  Select,
  FormControl,
  Input,
  Tooltip,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Box } from "@mui/system";
import axios from "axios";
import FileUpload from "../fileUpload/FileUpload";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate, useParams } from "react-router";
import { ImageNotSupportedOutlined } from "@mui/icons-material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useAppSelector } from "../../hooks/reduxHooks";
import NavBar from "../HomePage/Header/NavBar/NavBar";

interface CreatePublicationForm {
  name: string;
  detail: string;
  mark: string;
  category: string;
  gender: string;
  stock: 0;
  price: 0;
  images: { public_id: string; url: string }[];
  id: string | undefined;
}
// interface CreatePublicationForm {
//   name: string,
//   detail: string,
//   mark: string,
//   category: string,
//   gender: string,
//   stock: 0,
//   price: 0,
//   images: { public_id: string, url: string }[],
//   id: string | undefined
// }

const useStyles = makeStyles({
  buttonPublicOrUpdate: {
    width: "54%",
    "& span": {
      margin: "0px",
    },
  },
  help: {
    cursor: "help",
  },
});

export default function CreatePublication(): JSX.Element {
  const user = useAppSelector((state) => state.userSignin.userInfo);

  const [form, setForm] = useState<CreatePublicationForm>({
    name: "",
    detail: "",
    mark: "",
    category: "",
    gender: "",
    stock: 0,
    price: 0,
    images: [],
    id: user?._id || "",
  });

  const [loadingImage, setLoadingImage] = useState<boolean>(false);

  const { name, detail, mark, stock, price, category, gender, images } = form;

  // const auth = useAuth();

  const { publicationId } = useParams();

  const navigate = useNavigate();

  const classes = useStyles();
  // useEffect(() => {
  //   setForm({...form, id: user?._id});
  //   console.log(form);

  // }, [form, user?._id]);

  useEffect(() => {
    if (publicationId && publicationId.length > 0) {
      axios
        .get("/publication", {
          params: { publicationId: publicationId },
        })
        .then(({ data }) => {
          setForm({ ...data });
        });
    }
  }, [publicationId]);

  function handleForm(e: BaseSyntheticEvent | SelectChangeEvent<string>): void {
    if (e.target.value < 0) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function submitForm(e: BaseSyntheticEvent): void {
    e.preventDefault();

    axios
      .post("/publications/new", form, { params: { publicationId } })
      .then(({ data }) => {
        navigate(`/publication/${data}`);
      });
  }

  function removeImage(imageId: string) {
    axios
      .post("/removeimage", { imageId })
      .then(({ data }) => {
        setForm({
          ...form,
          images: images.filter((img: any) => img.public_id !== imageId),
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Box sx={{ backgroundColor: "#eeeeee", height: "120vh" }}>
        <NavBar></NavBar>
        {/* <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '30vh' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>


        </Box>
      </Box> */}

        <Box sx={{ mt: 0, display: "flex", justifyContent: "center" }}>
          <Container sx={{ height: "100vh" }}>
            <Typography
              variant="h4"
              component="h4"
              sx={{ margin: "47px 0px" }}
              align="center"
            >
              {publicationId ? "Actualiza tu producto" : "Publica tu producto"}
              <Tooltip title="Debes completar los campos y subir al menos una imagen para realizar la publicación">
                <HelpOutlineIcon
                  color="primary"
                  fontSize="large"
                  classes={{ root: classes.help }}
                ></HelpOutlineIcon>
              </Tooltip>
            </Typography>

            <Grid
              item
              component="form"
              onSubmit={submitForm}
              noValidate
              autoComplete="off"
              container
              boxShadow={1}
              sx={{
                backgroundColor: "white",
                padding: "25px",
                borderRadius: 2,
                justifyContent: "center",
              }}
            >
              <Grid
                item
                xs={5}
                sx={{
                  "& > :not(style)": { my: 3, width: "45ch" },
                  // '& > :not(style)': { m: 5, width: '25ch', display: 'flex', flexWrap: 'wrap' },
                }}
              >
                <TextField
                  onChange={handleForm}
                  value={name}
                  name="name"
                  id="standard-basic"
                  label="Nombre del producto"
                  variant="standard"
                />

                <TextField
                  onChange={handleForm}
                  value={mark}
                  name="mark"
                  id="standard-basic"
                  label="Marca"
                  variant="standard"
                />

                <TextField
                  onChange={handleForm}
                  value={detail}
                  name="detail"
                  id="standard-textarea"
                  label="Descripción"
                  multiline
                  variant="standard"
                />

                <FormControl fullWidth variant="standard">
                  <InputLabel htmlFor="standard-adornment-amount">
                    Precio
                  </InputLabel>
                  <Input
                    onChange={handleForm}
                    value={price}
                    name="price"
                    id="standard-adornment-amount"
                    type="number"
                    inputProps={{ min: 0 }}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                  />
                </FormControl>

                <FormControl fullWidth variant="standard">
                  <InputLabel htmlFor="standard-adornment-amount">
                    Stock
                  </InputLabel>
                  <Input
                    onChange={handleForm}
                    value={stock}
                    name="stock"
                    id="standard-adornment-amount"
                    type="number"
                    inputProps={{ min: 0 }}
                  />
                </FormControl>

                <FormControl variant="standard">
                  <InputLabel id="demo-simple-select-standard-label">
                    Categoría
                  </InputLabel>
                  <Select
                    onChange={handleForm}
                    value={category}
                    name="category"
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Categoría"
                  >
                    <MenuItem value="">
                      <em>Seleccionar</em>
                    </MenuItem>
                    <MenuItem value={"Remera"}>Remera</MenuItem>
                    <MenuItem value={"Patanlon"}>Pantalón</MenuItem>
                    <MenuItem value={"Zapatillas"}>Zapatillas</MenuItem>
                    <MenuItem value={"Zapatos"}>Zapatos</MenuItem>
                  </Select>
                </FormControl>

                <FormControl variant="standard">
                  <InputLabel id="demo-simple-select-standard-label">
                    ¿Para quién es este producto?
                  </InputLabel>
                  <Select
                    onChange={handleForm}
                    value={gender}
                    name="gender"
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Categoría"
                  >
                    <MenuItem value="">
                      <em>Seleccionar</em>
                    </MenuItem>
                    <MenuItem value={"Hombre"}>Hombre</MenuItem>
                    <MenuItem value={"Mujer"}>Mujer</MenuItem>
                    <MenuItem value={"Niños"}>Niños</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Divider
                orientation="vertical"
                light
                flexItem
                sx={{ my: 3, mx: 5 }}
              />

              <Grid item xs={6} sx={{ mt: 4 }}>
                <Grid item xs={12} sx={{ ml: 1 }}>
                  {loadingImage ? (
                    <CircularProgress sx={{ ml: 5 }} />
                  ) : (
                    <FileUpload
                      form={form}
                      setForm={setForm}
                      setLoadingImage={setLoadingImage}
                    />
                  )}
                </Grid>

                {form.images.length > 0 ? (
                  form.images.map((image: any) => {
                    return (
                      <Badge
                        key={image.public_id}
                        overlap="circular"
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        badgeContent={
                          <CancelIcon
                            onClick={() => removeImage(image.public_id)}
                            sx={{
                              cursor: "pointer",
                              ml: 1.5,
                              mt: 0.5,
                              color: "red",
                            }}
                          ></CancelIcon>
                        }
                      >
                        <Box
                          component="a"
                          href={image.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Avatar
                            alt="image"
                            src={image.url}
                            sx={{
                              width: 150,
                              height: 150,
                              m: 1,
                              mt: 2,
                              boxShadow: 5,
                              borderRadius: 0.5,
                            }}
                            variant="square"
                          />
                        </Box>
                      </Badge>
                    );
                  })
                ) : (
                  <Box component="div" sx={{ mt: 10 }}>
                    <Box
                      component="h3"
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      Aún no has subido imágenes
                    </Box>
                    <Box
                      component="div"
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <ImageNotSupportedOutlined
                        fontSize="large"
                        color="disabled"
                        sx={{ fontSize: "200px", display: "flex" }}
                      />
                    </Box>
                  </Box>
                )}
              </Grid>

              <Grid
                item
                xs={12}
                sx={{ justifyContent: "end", display: "flex" }}
              >
                <Button
                  disabled={
                    !name ||
                    !mark ||
                    !detail ||
                    price < 1 ||
                    images.length < 1 ||
                    !gender ||
                    !category
                  }
                  type="submit"
                  color="secondary"
                  variant="contained"
                  classes={{ root: classes.buttonPublicOrUpdate }}
                >
                  {publicationId ? "Actualizar publicación" : "Publicar"}
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
}
