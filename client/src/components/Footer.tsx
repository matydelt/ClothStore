import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Logo from "../assets/images/ClothStore_logotipo_sin_fondo.png";
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  background?: string;
}

const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit">ClothStore</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const Footer = ({ background }: Props) => {
  return (
    <Box
      component='footer'
      sx={{ height: '260px !important' }}
      bgcolor={background || '#c5c5c5'}
    >
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 5 }}
      // position="absolute"
      // bottom={0}
      // width="100%"
      >
        <Container maxWidth="lg">
          <Grid container spacing={0} flexWrap="nowrap">
            <Grid item xs={12} sm={4} sx={{ position: "relative" }}>
              <Box
                component="img"
                src={Logo}
                alt="Logo"
                sx={{
                  position: "absolute",
                  width: "75%",
                  left: 0,
                  top: "-90%",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography component="h1" variant="h6" fontWeight="500">
                Categorias
              </Typography>
              <Box>
                <Link color="inherit">Remera</Link>
              </Box>
              <Box>
                <Link color="inherit">Pantalon</Link>
              </Box>
              <Box>
                <Link color="inherit">Zapatillas</Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography component="h1" variant="h6" fontWeight="500">
                Generos
              </Typography>
              <Box>
                <Link color="inherit">Hombre</Link>
              </Box>
              <Box>
                <Link color="inherit">Mujer</Link>
              </Box>
              <Box>
                <Link color="inherit">Niños</Link>
              </Box>
            </Grid>
          </Grid>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
