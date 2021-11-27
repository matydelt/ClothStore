import React from 'react'
// import { Button } from '@mui/material'
/* import Carousel from 'react-elastic-carousel';
import { breakPoints } from '../../controllers/breakPoints'; */
// import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/scrollbar/scrollbar.min.css';
import './Header.css'

// import Swiper core and required modules
import SwiperCore, {
    EffectFade, Navigation, Pagination
} from 'swiper';
import NavBar from './NavBar/NavBar';
import Woman from '../../assets/img/woman.png'
import Box from '@mui/material/Box';
import { TypographyWomanHeaderH2, TypographyWomanHeaderH4 } from './HeaderStyles';
import Typography from '@mui/material/Typography'
import Man from '../../assets/img/man.png'
import Kids from '../../assets/img/kids.png'


// install Swiper modules
SwiperCore.use([EffectFade, Navigation, Pagination]);




const Header = () => {
    return (
        <>
            {/* <Carousel
            className="contain_header align-items-center"
            // children= element[]
            pagination={false}
            isRTL={false}
            // itemsToScroll={2}
            // itemsToShow={2}
            breakPoints={breakPoints}
            // showArrows={false}
            enableAutoPlay={true}
            >
                <p>hola</p>
                <p>chao</p>
            </Carousel> */}

            <header style={{ height: '100vh', background: '#f3f3f3', overflow: 'hidden' }}>
                <NavBar />
                <Swiper
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation={true}
                    effect={'fade'}
                    loop={true}
                    pagination={{ clickable: true }}
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
                        <TypographyWomanHeaderH2
                            sx={{
                                fontSize: { xl: '98px' },
                                width: { lg: '400px', xl: '400px' },
                                transform: { lg: 'translate(-120%, 0%)', xl: 'translate(-150%, 0%)' }
                            }}
                            variant='h2'>
                            Simplifica Todo.
                        </TypographyWomanHeaderH2>
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
                                fontSize: '70px',
                                fontWeight: '500',
                                textAlign: 'right',
                                letterSpacing: '2px',
                                lineHeight: '89px'
                            }}
                        /* color="initial" */
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
                                left: '10%',
                                width: { lg: '450px', xl: '450px' },
                                fontSize: '70px',
                                fontWeight: '500',
                                textAlign: 'center',
                                letterSpacing: '4px',
                                // lineHeight: '89px'
                            }}
                            variant='h2'>
                            También para tus pequeños.
                        </Typography>

                        <Typography
                            sx={{
                                textTransform: 'uppercase',
                                position: 'absolute',
                                left: '10%',
                                bottom: '15%',
                                width: { lg: '350px', xl: '450px' },
                                fontSize: '17px',
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
                                width: { lg: '53%' },
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
                                left: '14%',
                                bottom: '14%',
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
