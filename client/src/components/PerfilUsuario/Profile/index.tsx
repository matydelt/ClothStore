import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import Addresses from "./Addresses";
import ModalCargaDomicilio from "./ModalCargaDomicilio";
import ProfileCover from "./ProfileCover";

const useStyles = makeStyles({
  containerProfile: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
})
interface Props {
  id: string | undefined;
  userName: string | undefined;
  phone: string | undefined;
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  dni: string | undefined;
  calle: string | undefined;
  numero: string | undefined;
  ciudad: string | undefined;
  country: string | undefined;
  cp: string | undefined;
  getOneUser: Function;
}

function ManagementUserProfile(props: Props) {
  const classes = useStyles()
  return (
    <>
      <Box style={{ marginTop: 100, marginLeft: 100 }}>
        <h1>Mis datos</h1>
      </Box>
      <Container style={{ marginTop: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={12} classes={{ root: classes.containerProfile }} >
            <ProfileCover
              id={props.id}
              firstName={props.firstName}
              lastName={props.lastName}
              userName={props.userName}
              phone={props.phone}
              email={props.email}
              dni={props.dni}
              calle={props.calle}
              numero={props.numero}
              ciudad={props.ciudad}
              country={props.country}
              cp={props.cp}
              getOneUser={props.getOneUser} />
          </Grid >
          <Grid item xs={10}>
            <h1>Domicilios</h1>
            <ModalCargaDomicilio id={props.id} />
            <Addresses id={props.id} />
          </Grid>
        </Grid>
      </Container >
    </>
  );
}

export default ManagementUserProfile;
