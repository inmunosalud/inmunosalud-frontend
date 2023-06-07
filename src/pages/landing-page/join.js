import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Card, CardContent, Grid, useTheme } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Image from 'next/image';

import grafica from '/public/images/cards/grafica.PNG';

import { getConstants } from 'src/store/constants';
import { useDispatch, useSelector } from 'react-redux';

import FAQs from 'src/views/landing-page/FAQs';



export default function AffiliationPage() {

    const { constants, isLoading } = useSelector(state => state.constants)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getConstants())
    }, [])

    const questions = [
        {
            id: 'Q1',
            question: '¿Qué se necesita para afiliarte?',
            answer:
                'Sesame snaps tart bonbon tiramisu jelly beans lemon drops bear claw candy gummi bears. Caramels pudding sweet donut tootsie roll gummies macaroon. Lemon drops caramels sesame snaps dessert jujubes. Cupcake chocolate bonbon cake tiramisu. Gummies candy canes ice cream biscuit. Jelly gummies wafer danish chupa chups sugar plum cookie.'
        },
        {
            id: 'Q2',
            question: '¿He escuchado que los esquemas piramidales son fraudes, es cierto?',
            answer:
                'Chocolate sweet roll lemon drops chocolate cake candy canes halvah. Donut fruitcake sweet roll brownie carrot cake cake. Donut jujubes pudding candy macaroon. Gummies gingerbread croissant bonbon. Cookie toffee cupcake cotton candy candy canes dessert cotton candy liquorice. Jelly beans gummi bears toffee chocolate bar chocolate cake.'
        },
        {
            id: 'Q3',
            question: '¿Cuánto es el porcentaje de comisión?',
            answer:
                'Liquorice pie donut tootsie roll marzipan liquorice topping pie. Muffin sweet roll soufflé croissant cookie cotton candy toffee. Tootsie roll chocolate cake wafer jelly beans soufflé danish tart. Halvah dragée chocolate bar gingerbread apple pie ice cream ice cream fruitcake. Chocolate bar pudding apple pie cheesecake dragée topping ice cream cookie.'
        },
        {
            id: 'Q4',
            question: '¿Cómo crezco mi red si spy consumidor afiliado?',
            answer:
                'Halvah liquorice pastry marshmallow sugar plum. Dessert chocolate pastry gummi bears pastry. Gingerbread bonbon pudding oat cake jujubes pie wafer tart brownie. Soufflé jujubes icing powder liquorice. Sweet donut toffee liquorice dessert dragée. Topping cake danish chupa chups chupa chups gummies. Cotton candy gummies chocolate cake oat cake.'
        },
    ]

    const CustomBox = ({ text, percentage }) => {
        const theme = useTheme();
        return (
            <Box
                sx={{
                    borderRadius: '10px',
                    padding: '10px',
                    border: '2px solid',
                    borderColor: theme.palette.mode === 'dark' ? '#3d3a57' : '#eeeeef',
                    backgroundColor: theme.palette.mode === 'dark' ? '#312d4b' : '#ffffff',
                    margin: '0 auto',
                    maxWidth: '300px'
                }}
            >
                <Typography variant="body1" sx={{ fontSize: '1.5rem', color: theme.palette.mode === 'dark' ? '#c0bcd5' : '#5a5662' }}>
                    <strong>{percentage}</strong> {text}
                </Typography>
            </Box>
        );
    };

    return (
        <Container maxWidth="md">
            <Grid container spacing={4}>
                <Grid item xs={12} sx={{ marginBottom: '40px' }}>
                    <Typography variant='h3' sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
                        ¡En InmunoSalud queremos que crezcas con nosotros!
                    </Typography>
                    <Typography variant="body1" sx={{ textAlign: 'justify' }}>
                        En Inmunosalud creemos que la mejor manera de llegar a más personas es a través de nuestros
                        consumidores por lo cual a nuestros afiliados los remuneramos con comisión de hasta un 45%*.
                    </Typography>
                    <br />
                    <Typography variant="body1" sx={{ textAlign: 'justify' }}>
                        Nuestra filosofía se basa en el mutuo beneficio y la colaboración.
                        Al proporcionar a nuestros afiliados una comisión significativa, buscamos fomentar una relación
                        sólida y duradera, donde podamos crecer juntos.
                    </Typography>
                </Grid>
                <Card sx={{ marginBottom: '70px' }}>
                    <CardContent>
                        <Grid item xs={12} sx={{ marginBottom: '20px' }}>
                            <Typography variant='h4' sx={{ mt: 4, mb: 4, textAlign: 'center' }}>ESQUEMA Y ARMADO DE RED DE CONSUMO</Typography>
                            <Typography variant="body1">
                                El consumidor afiliado podrá referir para integrar personas directamente a su red, las cuáles
                                serán de primer nivel. A su vez, los de primer nivel al ser consumidores afiliados, podrán referir
                                e integrar personas en su red.
                                La red puede crecer hasta el cuarto nivel.
                            </Typography>
                        </Grid>
                    </CardContent>
                </Card>

                <Grid container spacing={2} sx={{ marginBottom: '40px' }}>
                    <Grid item xs={12}>
                        <Box style={{ textAlign: 'center' }}>
                            <Typography variant="h5" sx={{ marginBottom: '30px' }}>
                                La manera en la que funciona nuestro sistema de comisiones es la siguiente:
                            </Typography>
                            <Typography variant="h6" sx={{ marginBottom: '10px', marginTop: '30px' }}>
                                De todas las personas que tú refieres recibes el:
                            </Typography>
                            <CustomBox percentage={`${(constants.commissionPercentajePerLevel[1] * 100).toFixed(0)}%`} text="total de Compra" />
                            <Typography variant="h6" sx={{ marginBottom: '10px', marginTop: '30px' }}>
                                Si ellos refirieran a alguien más, se te da el:
                            </Typography>
                            <CustomBox percentage={`${(constants.commissionPercentajePerLevel[2] * 100).toFixed(0)}%`} text="total de Compra" />
                            <Typography variant="h6" sx={{ marginBottom: '10px', marginTop: '30px' }}>
                                De los referidos de tu segunda línea, se te otorga el:
                            </Typography>
                            <CustomBox percentage={`${(constants.commissionPercentajePerLevel[3] * 100).toFixed(0)}%`} text="total de Compra" />
                            <Typography variant="h6" sx={{ marginBottom: '10px', marginTop: '30px' }}>
                                y los referidos de tu tercera línea te otorgan un:
                            </Typography>
                            <CustomBox percentage={`${(constants.commissionPercentajePerLevel[4] * 100).toFixed(0)}%`} text="total de Compra" sx={{ marginBottom: '60px' }} />
                        </Box>
                        <Box maxWidth="fit-content" sx={{ margin: '0 auto', marginTop: '60px' }}>
                            <Card variant="outlined">
                                <TableContainer>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{ textAlign: 'center' }}>Nivel</TableCell>
                                                <TableCell style={{ textAlign: 'center' }}>Comisión</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {constants?.commissionPercentajePerLevel && Object.entries(constants.commissionPercentajePerLevel).map(([nivel, comision]) => (
                                                <TableRow key={nivel}>
                                                    <TableCell style={{ textAlign: 'center' }}>{nivel}</TableCell>
                                                    <TableCell style={{ textAlign: 'center' }}>{(comision * 100).toFixed(0)}%</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Card>
                        </Box>

                    </Grid>

                </Grid>
                <Card sx={{ marginBottom: '80px' }}>
                    <CardContent>
                        <Grid container spacing={2} sx={{ marginBottom: '40px' }}>
                            <Grid container spacing={2} sx={{ marginBottom: '40px', textAlign: 'center' }}>
                                <Grid item xs={12}>
                                    <Image src={grafica} alt="Graficas" height={217} width={425} />
                                </Grid>
                            </Grid>

                            <Grid item xs={6} sx={{ marginBottom: '40px' }}>
                                <Typography variant='h6' sx={{ mt: 4, mb: 4, textAlign: 'center' }}>REQUISITOS</Typography>
                                <Typography variant="body1" sx={{ textAlign: 'justify' }}>
                                    • Ser consumidor afiliado.
                                </Typography>
                                <Typography variant="body1">
                                    • Consumir mínimo mensual para permanecer activo.
                                </Typography>
                                <Typography variant="body1">
                                    • Tener referidos activos.
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ marginBottom: '40px' }}>
                                <Typography variant='h6' sx={{ mt: 4, mb: 4, textAlign: 'center' }}>Qué hacer para permanecer activo</Typography>
                                <Typography variant="body1" sx={{ textAlign: 'justify' }}>
                                    Consumir mensualmente el monto mínimo de ${constants.minimalAmountOfPurchase} antes de la fecha de corte.
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sx={{ marginBottom: '60px' }}>
                            <Typography variant="body1" sx={{ textAlign: 'justify' }}>
                                El día {constants.cutoffDay} de cada mes se revisará el consumo de cada afiliado para
                                determinar si está activo o inactivo.
                                En caso de estar activo, se pagará el monto correspondiente de cada nivel con su
                                respectivo porcentaje de comisión {constants.waitingDaysForTransfers} días después de la fecha de corte.
                            </Typography>
                        </Grid>
                        <Grid container spacing={2} sx={{ marginBottom: '40px', justifyContent: 'center', alignItems: 'center' }}>
                            <Grid item xs={12}>
                                <Typography variant='h5' sx={{ textAlign: 'center', marginBottom: '20px' }}>Tips para crecer tu red</Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Box sx={{ display: 'inline-block', textAlign: 'left' }}>
                                    <Typography variant="body1">
                                        1. … Referir nunca fue tan fácil…
                                    </Typography>
                                    <Typography variant="body1">
                                        2. Incentiva a tus referidos que se mantengan activos
                                    </Typography>
                                    <Typography variant="body1">
                                        3. …
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: '40px' }}>
                <Typography variant="body1" sx={{ textAlign: 'center' }}>
                    Recomienda, gana y mejora tu salud.
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'center' }}>
                    <strong>Inmunosalud te recompensa por cuidarte</strong>
                </Typography>
            </Grid>
            <FAQs data={questions} />
        </Container >

    );
}
