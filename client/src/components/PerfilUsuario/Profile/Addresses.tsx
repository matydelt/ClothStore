import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableContainer,
  makeStyles
} from "@material-ui/core";
import { useState } from "react";
import axios from "axios";
import React from "react";

const useStyles = makeStyles({
  tableAddress: {
    marginBottom: '40px'
  }
})
interface Props {
  id: String | undefined;
}
interface Dom {
  street: string;
  suite: string;
  city: string;
  country: string;
  cp: string;
}

function Addresses(props: Props) {
  const [state, setstate] = useState<[Dom]>([
    {
      street: "",
      suite: "",
      city: "",
      country: "",
      cp: "",
    },
  ]);

  React.useEffect(() => {
    async function getOneUser() {
      await axios
        .get(`/auth/${props.id}`)
        .then(({ data }) => {
          setstate(data.address);
        });
    }
    getOneUser()
  }, [])


  const classes = useStyles();

  return (
    <>
      {state.length > 0 ? (
        <TableContainer classes={{ root: classes.tableAddress }} component={Paper}>
          <Table
            style={{ maxHeight: "900px", width: "1000px" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Calle</TableCell>
                <TableCell align="right">Numero</TableCell>
                <TableCell align="right">Ciudad</TableCell>
                <TableCell align="right">País</TableCell>
                <TableCell align="right">Código postal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state?.map((a) => (
                <TableRow key={a.street} style={{ border: 0 }}>
                  <TableCell component="th" scope="row">
                    {a.street}
                  </TableCell>
                  <TableCell align="right">{a.suite}</TableCell>
                  <TableCell align="right">{a.city}</TableCell>
                  <TableCell align="right">{a.country}</TableCell>
                  <TableCell align="right">{a.cp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography align="center" paragraph={true}>No hay domicilios cargados</Typography>
      )}
    </>
  );
}

export default Addresses;
