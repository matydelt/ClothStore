import React, { ChangeEvent, SetStateAction, useEffect, useState } from 'react';
import { Avatar, Button, Container, FormControl, MenuItem, Typography, Divider, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SelectChangeEvent, Grid, CircularProgress, Rating,  } from '@mui/material';
// import { Rating } from '@material-ui/lab';
import { Box } from '@mui/system';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { FavoriteBorderOutlined } from '@mui/icons-material';
import Reviews from './reviews/Reviews';
import NavBar from '../HomePage/Header/NavBar/NavBar';
import QAndA from './qAndA/QAndA';
// import { Publication } from '../../redux/reducer/stateTypes';
import { SideBySideMagnifier } from "react-image-magnifiers";
import { useAuth } from '../../hooks/useAuth';
import { putCarritoAmount } from '../../redux/actions/carritoAction';
import { useDispatch } from 'react-redux';
import RelatedPublications from './relatedPublications/RelatedPublications';
import useLocalStorage from '../../hooks/useLocalStorage';
import { CartItemType, CartType } from '../../pages/CartScreen';


const useStyles = makeStyles({
  containerPublicationDetail: {
    marginTop: '0px',
    display: 'flex',
    justifyContent: 'center',
    
  },
  avatarPublicationDetatil: {
    width: '350px',
    height: '500px',
    borderRadius: '1px',
    bgcolor: 'white',
    '&:hover': {
      boxShadow: '5px'
    }
  },
  avatarPublicationDetatilMuestra: {
    marginTop: '2px', 
    width: '50px', 
    height: '50px', 
    '&:hover': { boxShadow: 5 }
  },
  typografyDetail: {
    marginTop: '1px', 
    color: 'gray'
  },
  typografyReview: {
    fontSize: '10px', 
    color: 'gray', 
    ml: 1
  },
  publicationDetailTypografy: {
    marginTop: '2px'
  },
  publicationPriceTypografy: {
    padding: '3px 0px', 
    color: 'gray'
  },
  publicationPriceWithoutDiscount: {
    paddingTop: '3px', color: 'gray', textDecoration: 'line-through'
  },
  publicationPriceWithDiscount: {
    padding: '3px 0 3px 0', marginRight: '10px', color: 'gray', display: 'inline'
  },
  offPercentage: {
    color: 'green', display: 'inline'
  },
  addCart: {
    marginTop: '4px'
  },
  dividerDetail: {
    width: '100%', 
    margin: '4px 0px'
  }
})
export interface Publication {
  _id: string;
  name: string;
  images?: { public_id: string, url: string }[];
  stock: number;
  mark: string;
  detail?: string;
  price: number;
  categorie: string;
  author: string;
  gender: "Hombre" | "Mujer" | "Niños";
  reviews: any[];
  qAndAs: any[];
  __v: number;
  discount: any;
}


export default function PublicationDetail(): JSX.Element {

  const [publication, setPublication] = useState<Publication | undefined>();
  const [scoreAverage, setScoreAverage] = React.useState<number>(0);
  const [cart, setCart] = useLocalStorage<CartType | undefined>("cart", []);

  const [imageShow, setImageShow] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const [amount, setAmount] = useState<number>(1);

  const { publicationId } = useParams();
  const auth = useAuth();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (publicationId && publicationId.length > 0) {
      axios.get('http://localhost:3001/publication', {
        params: { publicationId: publicationId }
      }).then(({ data }) => {
        setPublication(data);
        setImageShow(data.images[0].url)
        setLoading(false);
      });
    }
    axios.get('/reviews/' + publicationId).then(({ data }) => {
      setScoreAverage(data.scoreAverage);
    });
  }, [publicationId]);


  function imageToShow(img: string): void {
    setImageShow(img)
  }


  const handleAddCart = (): void => {
    if (publication) {

      if (auth?.user) {
        dispatch(putCarritoAmount(auth?.user?.email, publication?._id, amount))
      } else {
        setCart(() => {
          let aux: any = localStorage.getItem("cart");
          console.log(typeof aux);
          if (typeof aux === "string") aux = JSON.parse(aux);
          const isItemInCart: CartItemType = aux.find((item: any) => item.id === publication?._id);
          if (isItemInCart) {
            isItemInCart.quantity += amount;
            return aux;
          }
          if (publication.images) {
            return [...aux, { title: publication?.name, id: publication?._id, image: publication?.images[0].url, quantity: amount, price: publication?.discount ? publication?.price - publication?.price*publication?.discount.percentage/100 : publication?.price  }];
          }
        });
      }

    }

    navigate('/cart');
  }

  return (<>
    <Box sx={{ backgroundColor: '#eeeeee', minHeight: '100vh', height: 'max-content', pb: 20 }}>
      <NavBar></NavBar>
      {/* <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '15vh' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>

        </Box>
      </Box> */}

      <Box sx={{ mt: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '1000px' }}>

        <Container classes={{ root: classes.containerPublicationDetail }}>



          <Grid item component="div"

            container
            // boxShadow={1} sx={{ backgroundColor: 'white', borderRadius: 2, justifyContent: 'center' }}>
            boxShadow={1} sx={{ backgroundColor: 'white', borderRadius: 2, p: 3 }}>

            {loading ? <CircularProgress sx={{ p: 25, mx: 'auto' }} /> : <>

              <Grid item
                xs={1}
                sx={{
                  my: 4, cursor: 'pointer'
                  // '& > :not(style)': { m: 5, width: '25ch', display: 'flex', flexWrap: 'wrap' },
                }}

              >
                {publication && publication?.images?.map(img => {
                  return <span key={img.public_id} onMouseEnter={() => imageToShow(img.url)}>
                    <Avatar classes={{ root: classes.avatarPublicationDetatilMuestra }} src={img.url} variant="square">

                    </Avatar>
                  </span>
                })
                }

              </Grid>

              <Grid item
                xs={7}
                sx={{
                  '& > :not(style)': { my: 3, mx: 'auto' },
                  // '& > :not(style)': { m: 5, width: '25ch', display: 'flex', flexWrap: 'wrap' },
                }}

              >
                {imageShow && imageShow?.length > 0 &&
                  <Avatar variant="square" classes={{ root: classes.avatarPublicationDetatil }} alt="" >
                    <SideBySideMagnifier
                      // fillAvailableSpace={true}
                      // magnifierSize="40%"
                      // square={true}
                      alwaysInPlace
                      imageSrc={imageShow}
                    >

                    </SideBySideMagnifier>
                  </Avatar>
                }

                {/* {imageShow && <Avatar src={imageShow} variant="square" sx={{ width: 470, height: 470, borderRadius: 1 }} alt="" />

                } */}


              </Grid>

              <Grid item xs={4}
                sx={{
                  mt: 5, boxShadow: 2, px: 3, pt: 2, pb: 3, minHeight: 'max-content', height: 'max-content'
                  // '& > :not(style)': { mt: 5 },
                }}>

                <Typography variant="h5" component="p">
                  {publication && publication?.mark}
                </Typography>

                <Typography component="p" classes={{ root: classes.typografyDetail }}>
                  {publication && publication?.categorie}
                </Typography>

                <Grid container sx={{ mt: 2 }}>
                  <Grid item xs={10}>
                    <Typography variant="h6" component="h6">
                      {publication?.name}
                    </Typography>
                  </Grid>

                  <Grid item xs={2} sx={{ justifyContent: 'right', display: 'flex', cursor: 'pointer' }}>
                    <FavoriteBorderOutlined></FavoriteBorderOutlined>
                  </Grid>
                </Grid>

                <Box component="div" sx={{ alignItems: 'center', display: 'flex', mt: 0.2 }}>
                  <Reviews>
                    <Rating sx={{ color: '#00c2cb' }} name="read-only" value={scoreAverage} readOnly />
                  </Reviews>
                  <Typography component="span" classes={{ root: classes.typografyReview }}>
                    {publication?.reviews.length} opiniones
                  </Typography>
                </Box>

                <Typography component="p" classes={{ root: classes.publicationDetailTypografy }}>
                  {publication && publication?.detail}
                </Typography>

{ publication?.discount ?
<div style={{ marginTop: '20px', marginBottom: '20px'}}>

                {/* <Typography component="p" sx={{ pt: 3, color: 'gray', textDecoration: 'line-through' }}> */}
                <Typography component="p" classes={{ root: classes.publicationPriceWithoutDiscount }}>
                  $ {publication?.price}
                </Typography>
                <Typography variant="h5" component="h5" classes={{ root: classes.publicationPriceWithDiscount }}>
                  $ { publication?.price - (Number(publication?.price)*Number(publication?.discount.percentage)) / 100}
                </Typography>
                <Typography component="p" classes={{ root: classes.offPercentage }}>
                  {publication?.discount?.percentage}% OFF
                </Typography>
</div>
:

                // <Typography variant="h5" component="h5" sx={{ py: 3, color: 'gray' }}>
                <Typography variant="h5" component="h5" classes={{ root: classes.publicationPriceTypografy }}>
                  $ {publication?.price}
                </Typography>
}

                {publication && publication?.stock > 0 ?
                  <Grid item container component="div"
                    sx={{
                      alignItems: 'center'
                      // '& > :not(style)': { mt: 5 },
                    }}>

                    <Grid item xs={6}
                      sx={{

                        // '& > :not(style)': { mt: 5 },
                      }}>

                      <Typography component="p" >
                        Stock disponible
                      </Typography>

                    </Grid>


                    <Grid item xs={6}
                      sx={{
                        justifyContent: 'right', display: 'flex'
                        // '& > :not(style)': { mt: 5 },
                      }}>

                      <FormControl variant="standard">
                        {/* <InputLabel id="demo-simple-select-standard-label">Cantidad</InputLabel> */}
                        <Select defaultValue={1}
                          onChange={(event) => setAmount(event.target.value as SetStateAction<number>)}
                          // onChange={(event: SelectChangeEvent<number>) => setAmount(event.target.value as SetStateAction<number>)}
                          value={amount}
                          name="amount"
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          label="Categoría"
                          // sx={{color: '#00c2cb'}}
                          color='secondary'
                          variant='standard'
                        >
                          {
                            Array.from(Array(publication?.stock).keys()).map((s) => {
                              return <MenuItem key={s} value={s + 1}>{s + 1}</MenuItem>
                            })
                          }

                        </Select>
                      </FormControl>

                    </Grid>
                    <Button color='primary' onClick={handleAddCart} variant="outlined" fullWidth classes={{ root: classes.addCart }}>
                      Añadir al carrito
                    </Button>
                  </Grid>
                  :

                  <Grid item xs={12}>
                    <Typography variant="h6" component="h6">
                      Sin stock
                    </Typography>
                  </Grid>

                }


              </Grid>

              <Divider classes={{ root: classes.dividerDetail }}></Divider>

              <QAndA></QAndA>

            </>}

          </Grid>



        </Container>

      </Box>
          {!loading &&

            <Box sx={{ width: '100%', my: 6, height: 'max-content' }}>

              <Typography align='center' variant="h5" component="h5" style={{ marginBottom: '20px' }}>Publicaciones relacionadas</Typography>

              <RelatedPublications publicationId={publicationId}></RelatedPublications>
            </Box>

          }
    </Box>
  </>)
}
