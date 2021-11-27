import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/scrollbar/scrollbar.min.css';
import 'swiper/components/autoplay';
import './Header.css'
import SwiperCore, {
    Autoplay, EffectFade, Navigation, Pagination
} from 'swiper';
import NavBar from './NavBar/NavBar';
import Woman from '../../assets/img/woman.png'
import Box from '@mui/material/Box';
import { TypographyWomanHeaderH4 } from './HeaderStyles';
import Typography from '@mui/material/Typography'
import Man from '../../assets/img/man.png'
import Kids from '../../assets/img/kids.png'


// install Swiper modules
SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);




const Header = () => {
    return (
        <>
            <header style={{ height: '100vh', background: '#f3f3f3', overflow: 'hidden' }}>
                <NavBar />
                <Swiper
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation={true}
                    effect={'fade'}
                    loop={true}
                    pagination={{ clickable: true }}
                    autoplay={{
                        "delay": 3000
                      }}
                >

                    {/*********** SLIDE 1 ************/}
                    <SwiperSlide>
                        <TypographyWomanHeaderH4
                            sx={{
                                fontSize: { xl: '27px' },
                                transform: { lg: 'translateY(10%)', xl: 'translateY(10%)' }
                            }}
                            variant='h4'
                        >
                            SIEMPRE PARA TI
                        </TypographyWomanHeaderH4>
                        <Typography
                            sx={{
                                fontSize: { lg: '70px', xl: '98px' },
                                width: { lg: '400px', xl: '400px' },
                                transform: { lg: 'translate(-100%, 0%)', xl: 'translate(-150%, 0%)' },
                                textAlign: 'center',
                                fontWeight: '500',
                            }}
                            variant='h2'>
                            Simplifica Todo.
                        </Typography>
                        <Box
                            component='img'
                            src={Woman}
                            alt='Woman'
                            sx={{
                                position: 'absolute',
                                display: 'block',
                                width: '50%',
                                objectFit: 'cover',
                                right: { lg: '15%', xl: '7%' },
                                bottom: '0%',
                                height: '87%'
                            }}
                        />
                        <Box
                            component='span'
                            sx={{
                                position: 'absolute',
                                right: { lg: '25%', xl: '15%' },
                                backgroundColor: '#00c2cb',
                                display: 'block',
                                width: { xs: 350, md: 250, lg: '40%', xl: '45%' },
                                height: { xs: 350, md: 250, lg: '85%', xl: '80%' },
                                zIndex: '-1',
                                borderRadius: '50%'
                            }}
                        />
                    </SwiperSlide>

                    {/*********** SLIDE 2 ************/}
                    <SwiperSlide>
                        <Typography
                            variant="h2"
                            sx={{
                                textTransform: 'capitalize',
                                position: 'absolute',
                                right: '18%',
                                width: { lg: '450px', xl: '450px' },
                                fontSize: { lg: '70px', xl: '98px' },
                                fontWeight: '500',
                                textAlign: 'right',
                                letterSpacing: '2px',
                                lineHeight: { lg: '98px', xl: '120px' }
                            }}
                        >
                            lo mejor para ti.
                        </Typography>

                        <Typography
                            variant="h4"
                            sx={{
                                textTransform: 'uppercase',
                                fontSize: { lg: '23px', xl: '29px' },
                                position: 'absolute',
                                textAlign: 'right',
                                right: '15%',
                                top: { lg: '49%', xl: '49%' },
                                fontWeight: 'lighter'

                            }}
                        /* color="initial" */
                        >
                            siempre para ti.
                        </Typography>

                        <Box
                            component='img'
                            src={Man}
                            alt='Man'
                            sx={{
                                display: 'block',
                                width: { lg: '38%' },
                                position: 'absolute',
                                objectFit: 'cover',
                                left: { lg: '10%' }
                            }}
                        />

                        <Box
                            component='span'
                            sx={{
                                display: 'block',
                                position: 'absolute',
                                left: '-20%',
                                width: { lg: '140vw' },
                                height: { lg: '55%' },
                                backgroundColor: '#00c2cb',
                                transform: 'rotateZ(-37deg)',
                                zIndex: '-1'
                            }}
                        />
                    </SwiperSlide>


                    {/*********** SLIDE 3 ************/}
                    <SwiperSlide>

                        <Typography
                            sx={{
                                textTransform: 'capitalize',
                                position: 'absolute',
                                left: { lg: '10%', xl: '15%' },
                                width: { lg: '450px', xl: '450px' },
                                fontSize: { lg: '70px', xl: '98px' },
                                fontWeight: '500',
                                textAlign: 'center',
                                letterSpacing: '4px',
                                lineHeight: { lg: '78px', xl: '94px' }
                            }}
                            variant='h2'>
                            También para tus pequeños.
                        </Typography>

                        <Typography
                            sx={{
                                textTransform: 'uppercase',
                                position: 'absolute',
                                left: { lg: '10%', xl: '13%' },
                                bottom: { lg: '15%', xl: '17%' },
                                width: { lg: '350px', xl: '450px' },
                                fontSize: { lg: '17px', xl: '25px' },
                                fontWeight: 'lighter',
                                textAlign: 'center',
                                letterSpacing: '4px',
                                // lineHeight: '89px'
                            }}
                            variant='h4'>
                            siempre para tus consentidos.
                        </Typography>


                        <Box
                            component='img'
                            src={Kids}
                            alt='Kids'
                            sx={{
                                position: 'absolute',
                                bottom: '0%',
                                right: '10%',
                                objectFit: 'cover',
                                width: { lg: '48%' }
                            }}
                        />

                        <Box
                            component='span'
                            sx={{
                                display: 'block',
                                position: 'absolute',
                                left: '27%',
                                bottom: '-10%',
                                width: { lg: '53%', xl: '59%' },
                                height: { lg: '110%' },
                                backgroundColor: '#00c2cb',
                                borderRadius: '50%',
                                zIndex: '-1',
                                opacity: '1'
                            }}
                        />
                        <Box
                            component='span'
                            sx={{
                                display: 'block',
                                position: 'absolute',
                                left: { lg: '14%', xl: '16%' },
                                bottom: { lg: '14%', xl: '16%' },
                                width: { lg: '8%' },
                                height: { lg: '10%' },
                                backgroundColor: '#00c2cb',
                                borderRadius: '50%',
                                zIndex: '-1',
                                opacity: '.3'
                            }}
                        />
                    </SwiperSlide>
                </Swiper>
            </header>

        </>
    )
}

export default Header
