
import { Box } from "@material-ui/core";
import { Container, Grid } from '@mui/material';
import Addresses from './Addresses';
import ProfileCover from './ProfileCover';


interface Props {
  photo: string|undefined;
  phone: string|undefined;
  email: string|undefined;
  firstName: string|undefined;
  lastName: string|undefined;
  dni: string|undefined;
  calle: string|undefined;
  numero: string|undefined;
  ciudad: string|undefined;
  country:string|undefined;
  cp: string|undefined;
}
function ManagementUserProfile(props:Props) {
  return (
    <>
    
      <Box sx={{marginTop: "100px",marginLeft: "100px"}}>
        
        <h1>Mis datos</h1>
      </Box>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={8}>
            <ProfileCover firstName={props.firstName} 
            lastName={props.lastName}
            photo={props.photo}
            phone={props.phone}
            email={props.email}
            dni={props.dni}
            calle={props.calle}
            numero={props.numero}
            ciudad={props.ciudad}
            country={props.country}
            cp={props.cp}/>
          </Grid>
          <Grid item xs={12} md={5}>
            <Addresses calle={props.calle}
            numero={props.numero}
            ciudad={props.ciudad}
            country={props.country}
            cp={props.cp}/>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ManagementUserProfile;
