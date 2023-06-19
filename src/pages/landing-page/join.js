import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Card, CardContent, CardHeader, Grid, useTheme } from '@mui/material';
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
    }, [dispatch])

    const questions = [
        {
            id: 1,
            question: '¿Cuanto es el porcentaje de comisión?',
            answer:
                'Inmunosalud ofrece un generoso porcentaje de comisión de hasta el 45% sobre el total de las compras realizadas por tu red. El sistema de comisiones funciona de la siguiente manera: recibes el 5% de las compras por las personas que refieras y se afilien, el 10% de las compras realizadas por los referidos y afiliados de tus referidos, el 15% de los referidos y afiliados de tu segunda línea, y otro 15% de los referidos y afiliados de tu tercera línea. Para que el afiliado reciba comisiones deberá estar activo. Recibes comisión del consumo de los afiliados activos de tu red.',
        },
        {
            id: 2,
            question: '¿Como ingreso a alguien a mi red?',
            answer:
                'Es muy sencillo. Lo único que tienes que hacer es pasarle tu código que se te asigna al convertirse en afiliado y que esta persona al crear su cuenta ponga tu código. Si esta persona ya creó su cuenta y no ha registrado ningún código de referencia, puede ir a su cuenta y asignar tu código para que pase a pertenecer a tu red. Una vez que un usuario registre un código, ya no se puede cambiar este.',
        },
        {
            id: 3,
            question: '¿Como crezco mi red si soy afiliado?',
            answer:
                'Para ingresar a alguien a tu red, simplemente debes proporcionar tu código de referencia asignado a tu cuenta de afiliado, y ellos deberán ingresarlo al registrarse en Inmunosalud. Si la persona ya tiene una cuenta, pero no ha registrado un código de referencia, puede agregarlo en su cuenta para unirse a tu red. Una vez que un usuario registra un código, ya no puede cambiarlo. Para hacer crecer tu red, solo necesitas recomendar nuestros productos y compartir tu código de referencia con otras personas interesadas en adquirirlos.',
        },
        {
            id: 4,
            question: '¿Cuanto puede crecer mi red? ¿Donde recibo mis comisiones generadas?',
            answer:
                'Tu red puede crecer sin límites dentro de los 4 niveles de comisión establecidos. Las comisiones generadas se depositan en la cuenta bancaria que proporcionaste durante el registro como afiliado.',
        },
        {
            id: 5,
            question: '¿Puedo vender estos productos?',
            answer:
                'Inmunosalud reconoce las ventas independientes de los productos, solo reconoce la venta de sus productos a través de nuestra página web oficial',
            link: 'https://www.inmunosalud.mx'
        }
    ];


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
                    <Card>
                        <CardHeader
                            title={
                                <Typography variant='h4' sx={{ textAlign: 'center' }}>
                                    ¡En InmunoSalud queremos que crezcas con nosotros!
                                </Typography>
                            }
                        />
                        <CardContent>
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
                        </CardContent>
                    </Card>
                </Grid>
                <Card sx={{ marginBottom: '70px' }}>
                    <CardContent>
                        <Grid item xs={12} sx={{ marginBottom: '20px' }}>
                        <CardHeader
                            title={
                                <Typography variant='h5' sx={{ textAlign: 'center' }}>ESQUEMA Y ARMADO DE RED DE CONSUMO</Typography>
                            }
                        />
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
                            {constants && constants.commissionPercentajePerLevel && (
                                <CustomBox percentage={`${(constants.commissionPercentajePerLevel[1] * 100).toFixed(0)}%`} text="total de Compra" />
                            )}
                            <Typography variant="h6" sx={{ marginBottom: '10px', marginTop: '30px' }}>
                                Si ellos refirieran a alguien más, se te da el:
                            </Typography>
                            {constants && constants.commissionPercentajePerLevel && (
                                <CustomBox percentage={`${(constants.commissionPercentajePerLevel[2] * 100).toFixed(0)}%`} text="total de Compra" />
                            )}
                            <Typography variant="h6" sx={{ marginBottom: '10px', marginTop: '30px' }}>
                                De los referidos de tu segunda línea, se te otorga el:
                            </Typography>
                            {constants && constants.commissionPercentajePerLevel && (
                                <CustomBox percentage={`${(constants.commissionPercentajePerLevel[3] * 100).toFixed(0)}%`} text="total de Compra" />
                            )}
                            <Typography variant="h6" sx={{ marginBottom: '10px', marginTop: '30px' }}>
                                y los referidos de tu tercera línea te otorgan un:
                            </Typography>
                            {constants && constants.commissionPercentajePerLevel && (
                                <CustomBox percentage={`${(constants.commissionPercentajePerLevel[4] * 100).toFixed(0)}%`} text="total de Compra" sx={{ marginBottom: '60px' }} />
                            )}
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
