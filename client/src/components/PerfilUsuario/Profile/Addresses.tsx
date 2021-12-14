import {
  Box,
  Button,
  Typography,
  Card,
  CardHeader,
  Divider,
  Grid
} from '@mui/material';

import { ArrowForwardTwoTone } from '@mui/icons-material';
import TableContainer from '@material-ui/core/TableContainer';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { useState } from 'react';
import axios from 'axios';
import React from 'react';

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
  const [state, setstate] = useState<[Dom]>([{
    "street": "",
    "suite": "",
    "city": "",
    "country": "",
    "cp": ""
  }]);

  React.useEffect(() => {
    async function getOneUser() {
      await axios.get(`http://localhost:3001/auth/${props.id}`).then(({ data }) => {
        setstate(data.address)
      })
    }
    getOneUser()
  }, [])

  return (<>
    {state.length > 0 ?
      <TableContainer component={Paper}>
        <Table style={{ maxHeight: "900px", width: "1000px" }} aria-label="simple table">
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
            {state?.map(a => (<TableRow
              key={a.street}
              style={{ border: 0 }}
            >
              <TableCell component="th" scope="row">
                {a.street}
              </TableCell>
              <TableCell align="right">{a.suite}</TableCell>
              <TableCell align="right">{a.city}</TableCell>
              <TableCell align="right">{a.country}</TableCell>
              <TableCell align="right">{a.cp}</TableCell>
            </TableRow>
            ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      : <Typography>No hay domicilios cargados</Typography>
    }
  </>
  );
}

export default Addresses;
