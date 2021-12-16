import {
  Box,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Button,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import * as React from "react";
import { Link } from "react-router-dom";
import Footer from "../../Footer";
import DiscountModal from "./DiscountModal/DiscountModal";
import ModalQA from "./ModalQA";

const useStyles = makeStyles({
  tableRow: { "&:last-child td, &:last-child th": { border: 0 } },
  title: {
    textDecoration: 'underline'
  }
});

interface Publication {
  name: string;
  images: any[];
  stock: number;
  mark: string;
  detail: string;
  price: number;
  category: string;
  author: string;
  gender: string;
  key: string;
  _id: string;
  discount: any;
}
interface User {
  id: string | undefined;
}
export default function ListProducts(props: User) {
  const [articulos, setArticulos] = React.useState<[Publication]>([{
    name: "",
    images: [],
    stock: 0,
    mark: "",
    detail: "",
    price: 0,
    category: "",
    author: "",
    gender: "",
    key: "",
    _id: "",
    discount: ""
  }])
  React.useEffect(() => {
    if (props.id) {
      getPublications()
    }
  }, [props.id])

  function getPublications(): void {
    axios.get(`/publications`, { params: { authorId: props.id } }).then(({ data }) => {
      setArticulos(data)
    });
  };

  function removeDiscount(publicationId: string): void {
    axios.post('/discount/remove', { publicationId }).then(({ data }) => {
      console.log(data)
      getPublications();
    });
  };

  const classes = useStyles();

  return (
    <>
      <Box style={{ width: '1700px', marginTop: "100px", marginLeft: "100px" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>

          <Typography classes={{ root: classes.title }} color='primary' variant='h4' paragraph={true}>Publicaciones</Typography>
        </div>
        {articulos?.length > 0 ?
          <TableContainer component={Paper}>
            <Table style={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Nombre de articulo</TableCell>
                  <TableCell align="right">Marca</TableCell>
                  <TableCell align="right">Categoria</TableCell>
                  <TableCell align="right">Genero</TableCell>
                  <TableCell align="right">Stock</TableCell>
                  <TableCell align="right">Precio</TableCell>
                  <TableCell align="center">Descuento</TableCell>
                  <TableCell align="center">Opciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {articulos?.map((e) => (

                  <TableRow
                    key={e.name}
                    className={classes.tableRow}
                  >
                    <TableCell component="th" scope="row">
                      {e.name}
                    </TableCell>
                    <TableCell align="right">{e.mark}</TableCell>
                    <TableCell align="right">{e.category}</TableCell>
                    <TableCell align="right">{e.gender}</TableCell>
                    <TableCell align="right">{e.stock == 0 ? "Sin stock" : e.stock}</TableCell>
                    <TableCell align="right">{e.price}</TableCell>
                    <TableCell align="right">
                      {e.discount &&
                        <Box component="div">

                          {(e.price - e.price * e.discount.percentage / 100).toFixed(2) + ` (${e?.discount?.percentage}%) hasta ${new Date(e.discount.expireAt).toLocaleDateString()}`}
                          <Button onClick={() => removeDiscount(e._id)}>Cancelar</Button>
                        </Box>
                      }
                    </TableCell>

                    <TableCell
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      align="right"
                    >
                      <DiscountModal userId={props?.id} publicationId={e?._id} getPublications={getPublications}>
                        {/*  <Button variant='outlined' color='primary' className="buttonSpan buttonHover"> */}{e.discount ? 'Reemplazar descuento' : 'Aplicar descuento'}{/* </Button> */}
                      </DiscountModal>
                      <ModalQA id={e._id} />
                      <Link
                        to={`/actualizar-publicacion/${e._id}`}
                      >
                        <Button variant='outlined' color='primary' className="buttonSpan buttonMargin" >
                          Actualizar
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          :
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h4>No se han realizado publicaciones</h4>
          </div>
        }
      </Box>
    </>
  )
}
