/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unreachable */
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  List,
  ListItemText,
  Typography,
} from "@mui/material";
import { ListItemButton } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import axios from "axios";
import * as React from "react";
// import { Link } from "react-router-dom";
import ModalDetailsShopping from "../ListShopping/ModalDetailsShopping";

const useStyles = makeStyles({
  tableRow: {
    "&:last-child td, &:last-child th": { border: 0 },
  },
  title: {
    textDecoration: "underline",
  },
});

interface Sales {
  amount: number;
  date: string;
  status: string;
  status_detail: string;
  codigo: string;
  key: string;
  _id: string;
  publications: any[];
}

interface User {
  id: string | undefined;
}
export default function ListSales(props: User) {
  const [articulos, setArticulos] = React.useState<[Sales]>([
    {
      amount: 0,
      date: "",
      status: "",
      status_detail: "",
      codigo: "",
      key: "",
      _id: "",
      publications: [{}],
    },
  ]);
  React.useEffect(() => {
    async function getOneUser() {
      if (props.id) {
        await axios.get(`/auth/${props.id}`).then(({ data }) => {
          setArticulos(data.sales);
        });
      }
    }
    getOneUser();
  }, [props.id]);

  const [open1, setOpen1] = React.useState(true);
  const handleClick1 = () => {
    setOpen1(!open1);
    if (open1) {
      const order = articulos.sort((a, b) => {
        if (a._id > b._id) return 1;
        else if (a._id < b._id) return -1;
        else return 0;
        setArticulos(order);
      });
    } else {
      const order = articulos.sort((a, b) => {
        if (a._id < b._id) return 1;
        else if (a._id > b._id) return -1;
        else return 0;
        setArticulos(order);
      });
    }
  };

  const [open2, setOpen2] = React.useState(true);
  const handleClick2 = () => {
    setOpen2(!open2);
    if (open2) {
      const order = articulos.sort((a, b) => {
        if (a.date.split("T")[0] > b.date.split("T")[0]) return 1;
        else if (a.date.split("T")[0] < b.date.split("T")[0]) return -1;
        else return 0;
        setArticulos(order);
      });
    } else {
      const order = articulos.sort((a, b) => {
        if (a.date.split("T")[0] < b.date.split("T")[0]) return 1;
        else if (a.date.split("T")[0] > b.date.split("T")[0]) return -1;
        else return 0;
        setArticulos(order);
      });
    }
  };

  const [open21, setOpen21] = React.useState(true);
  const handleClick21 = () => {
    setOpen21(!open21);
    if (open21) {
      const order = articulos.sort((a, b) => {
        if (
          a.date.split("T")[1].split(".")[0] >
          b.date.split("T")[1].split(".")[0]
        )
          return 1;
        else if (
          a.date.split("T")[1].split(".")[0] <
          b.date.split("T")[1].split(".")[0]
        )
          return -1;
        else return 0;
        setArticulos(order);
      });
    } else {
      const order = articulos.sort((a, b) => {
        if (
          a.date.split("T")[1].split(".")[0] <
          b.date.split("T")[1].split(".")[0]
        )
          return 1;
        else if (
          a.date.split("T")[1].split(".")[0] >
          b.date.split("T")[1].split(".")[0]
        )
          return -1;
        else return 0;
        setArticulos(order);
      });
    }
  };
  const [open3, setOpen3] = React.useState(true);
  const handleClick3 = () => {
    setOpen3(!open3);
    if (open3) {
      const order = articulos.sort((a, b) => {
        if (a.status > b.status) return 1;
        else if (a.status < b.status) return -1;
        else return 0;
        setArticulos(order);
      });
    } else {
      const order = articulos.sort((a, b) => {
        if (a.status < b.status) return 1;
        else if (a.status > b.status) return -1;
        else return 0;
        setArticulos(order);
      });
    }
  };

  const [open4, setOpen4] = React.useState(true);
  const handleClick4 = () => {
    setOpen4(!open4);
    if (open4) {
      const order = articulos.sort((a, b) => {
        if (a.codigo > b.codigo) return 1;
        else if (a.codigo < b.codigo) return -1;
        else return 0;
        setArticulos(order);
      });
    } else {
      const order = articulos.sort((a, b) => {
        if (a.codigo < b.codigo) return 1;
        else if (a.codigo > b.codigo) return -1;
        else return 0;
        setArticulos(order);
      });
    }
  };

  const [open5, setOpen5] = React.useState(true);
  const handleClick5 = () => {
    setOpen5(!open5);
    if (open5) {
      const order = articulos.sort((a, b) => {
        if (a.amount > b.amount) return 1;
        else if (a.amount < b.amount) return -1;
        else return 0;
        setArticulos(order);
      });
    } else {
      const order = articulos.sort((a, b) => {
        if (a.amount < b.amount) return 1;
        else if (a.amount > b.amount) return -1;
        else return 0;
        setArticulos(order);
      });
    }
  };

  const classes = useStyles();

  return (
    <Box style={{ width: "1700px", marginTop: "100px", marginLeft: "100px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography
          classes={{ root: classes.title }}
          color="primary"
          variant="h4"
          paragraph={true}
        >
          Ventas
        </Typography>
      </div>
      {articulos?.length > 0 ? (
        <TableContainer component={Paper}>
          <Table
            style={{ minWidth: 650 }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <List component="nav" aria-labelledby="nested-list-subheader">
                    <ListItemButton onClick={handleClick1}>
                      <ListItemText primary="Venta numero" />
                      {open1 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                  </List>
                </TableCell>
                <TableCell align="right">
                  <List component="nav" aria-labelledby="nested-list-subheader">
                    <ListItemButton onClick={handleClick2}>
                      <ListItemText primary="Fecha" />
                      {open2 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                  </List>
                </TableCell>
                <TableCell align="right">
                  <List component="nav" aria-labelledby="nested-list-subheader">
                    <ListItemButton onClick={handleClick21}>
                      <ListItemText primary="Hora" />
                      {open21 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                  </List>
                </TableCell>
                <TableCell align="right">
                  <List component="nav" aria-labelledby="nested-list-subheader">
                    <ListItemButton onClick={handleClick3}>
                      <ListItemText primary="Status" />
                      {open3 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                  </List>
                </TableCell>
                <TableCell align="right">
                  <List component="nav" aria-labelledby="nested-list-subheader">
                    <ListItemButton onClick={handleClick4}>
                      <ListItemText primary="Codigo de Comprobante" />
                      {open4 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                  </List>
                </TableCell>
                <TableCell align="right">
                  <List component="nav" aria-labelledby="nested-list-subheader">
                    <ListItemButton onClick={handleClick5}>
                      <ListItemText primary="Monto" />
                      {open5 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                  </List>
                </TableCell>
                <TableCell align="right">
                  <List component="nav" aria-labelledby="nested-list-subheader">
                    <ListItemButton>
                      <ListItemText primary="#" />
                    </ListItemButton>
                  </List>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {articulos?.map((e) => (
                <TableRow key={e._id} className={classes.tableRow}>
                  <TableCell component="th" scope="row" align="center">
                    <List
                      component="nav"
                      aria-labelledby="nested-list-subheader"
                    >
                      {e._id}
                    </List>
                  </TableCell>
                  <TableCell align="center">
                    <List
                      component="nav"
                      aria-labelledby="nested-list-subheader"
                    >
                      {e.date === "" ? e.date : e.date.split("T")[0]}
                    </List>
                  </TableCell>
                  <TableCell align="center">
                    <List
                      component="nav"
                      aria-labelledby="nested-list-subheader"
                    >
                      {e.date === ""
                        ? e.date
                        : e.date.split("T")[1].split(".")[0]}
                    </List>
                  </TableCell>
                  <TableCell align="center">
                    <List
                      component="nav"
                      aria-labelledby="nested-list-subheader"
                    >
                      {e.status}
                    </List>
                  </TableCell>
                  <TableCell align="center">
                    <List
                      component="nav"
                      aria-labelledby="nested-list-subheader"
                    >
                      {e.codigo}
                    </List>
                  </TableCell>
                  <TableCell align="center">
                    <List
                      component="nav"
                      aria-labelledby="nested-list-subheader"
                    >
                      {e.amount}
                    </List>
                  </TableCell>
                  <TableCell align="center">
                    <ModalDetailsShopping
                      articulos={e.publications}
                      esventa={false}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h4>No se han realizado ventas</h4>
        </div>
      )}
    </Box>
  );
}
