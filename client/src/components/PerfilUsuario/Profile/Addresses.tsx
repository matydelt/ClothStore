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

interface Props{
           calle:String|undefined;
            numero:String|undefined;
            ciudad:String|undefined;
            country:String|undefined;
            cp:String|undefined; 
}
function Addresses(props:Props) {

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={3}
    >
      <Grid item xs={12} sm={6}>
        <Card>
          <CardHeader
            title="Direccion de Entrega"
          />
          <Divider />
          <Box p={2}>
           
            {props.calle?<Box sx={{ minHeight: { xs: 0, md: 225 } }} p={2}>
          
              <Typography variant="h5">{props.calle}</Typography>
              <Typography variant="h5" sx={{ py: 1 }} fontWeight="normal">
                {props.numero}
              </Typography>
              <Typography variant="subtitle1">
                {props.ciudad}, {props.country}
              </Typography>
            </Box>:
            <Typography variant="h5">No hay domicilio registrado, porfavor detalle el lugar de entrega</Typography>
            }
            
          </Box>
        </Card>
      </Grid>
     
    </Grid>
  );
}

export default Addresses;
