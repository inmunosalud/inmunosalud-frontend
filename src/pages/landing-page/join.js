import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Card, CardContent, CardHeader, Grid, useTheme } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Image from 'next/image';
import { CircularProgress } from '@mui/material';
import CountUp from 'react-countup';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';

import diagrama from '/public/images/cards/diagrama.png';
import nivel1 from '/public/images/cards/nivel1.png';
import nivel2 from '/public/images/cards/nivel2.png';
import nivel3 from '/public/images/cards/nivel3.png';
import nivel4 from '/public/images/cards/nivel4.png';


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
            question: '¿Dónde recibo mis comisiones?',
            answer:
                'Tu red puede crecer sin límites dentro de los 4 niveles de comisión establecidos. Las comisiones generadas se depositan en la cuenta bancaria que proporcionaste durante el registro como afiliado',
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
                <Typography variant="body1" sx={{ fontSize: '1.5rem' }}>
                    <strong>{percentage}</strong> {text}
                </Typography>
            </Box>
        );
    };



    return (
        <ParallaxProvider>
            {constants && constants.commissionPercentajePerLevel ? (
                <Container sx={{ mt: '20px' }}>

                    <Typography variant='h4' sx={{ textAlign: 'center', mb: '20px' }}>
                        ¡En InmunoSalud queremos que crezcas con nosotros!
                    </Typography>

                    <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mb: '20px' }} >
                        En Inmunosalud creemos que la mejor manera de llegar a más personas es a través de nuestros
                        consumidores por lo cual a nuestros afiliados los remuneramos con comisión de hasta un 45%*.
                    </Typography>

                    <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mb: '40px' }} >
                        Nuestra filosofía se basa en el mutuo beneficio y la colaboración.
                        Al proporcionar a nuestros afiliados una comisión significativa, buscamos fomentar una relación
                        sólida y duradera, donde podamos crecer juntos.
                    </Typography>

                    <Typography variant='h5' sx={{ textAlign: 'center', mb: '20px' }}>ESQUEMA Y ARMADO DE RED DE CONSUMO</Typography>
                    <Typography variant="body1" sx={{ mb: '20px' }}>
                        El consumidor afiliado podrá referir para integrar personas directamente a su red, las cuáles
                        serán de primer nivel. A su vez, los de primer nivel al ser consumidores afiliados, podrán referir
                        e integrar personas en su red.
                        La red puede crecer hasta el cuarto nivel.
                    </Typography>
                    <Grid container spacing={2} sx={{ marginBottom: '40px' }}>
                        <Grid item xs={12}>
                            <Box style={{ textAlign: 'center' }}>
                                <Typography variant="h6">
                                    La manera en la que funciona nuestro sistema de comisiones es la siguiente:
                                </Typography>
                                <Box>
                                    <Typography variant="h6" sx={{ marginBottom: '10px', marginTop: '30px' }}>
                                        De todas las personas que tú refieres recibes el:
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontSize: '1.5rem' }}>
                                        <strong>
                                            <CountUp end={constants.commissionPercentajePerLevel[1] * 100} duration={3} suffix="%" />
                                        </strong> total de Compra
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="h6" sx={{ marginBottom: '10px', marginTop: '30px' }}>
                                        Si ellos refirieran a alguien más, se te da el:
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontSize: '1.5rem' }}>
                                        <strong>
                                            <CountUp end={constants.commissionPercentajePerLevel[2] * 100} duration={3} suffix="%" />
                                        </strong> total de Compra
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="h6" sx={{ marginBottom: '10px', marginTop: '30px' }}>
                                        De los referidos de tu segunda línea, se te otorga el:
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontSize: '1.5rem' }}>
                                        <strong>
                                            <CountUp end={constants.commissionPercentajePerLevel[3] * 100} duration={3} suffix="%" />
                                        </strong> total de Compra
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="h6" sx={{ marginBottom: '10px', marginTop: '30px' }}>
                                        y los referidos de tu tercera línea te otorgan un:
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontSize: '1.5rem' }}>
                                        <strong>
                                            <CountUp end={constants.commissionPercentajePerLevel[4] * 100} duration={3} suffix="%" />
                                        </strong> total de Compra
                                    </Typography>
                                </Box>
                            </Box>

                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ marginBottom: '40px' }}>
                        <Grid container spacing={2} sx={{ marginBottom: '40px' }}>
                            <Grid item xs={12} sx={{ mb: '40px' }}>
                                <Typography variant="h5" sx={{ marginBottom: '30px', marginTop: '30px', textAlign: 'center' }}>
                                    La manera en la que funciona nuestro sistema de comisiones es la siguiente:
                                </Typography>
                                <Typography>
                                    Juan es un consumidor afiliado que mes con mes hace su pedido
                                    para mantenerse activo y recibir los beneficios de InmunoSalud.
                                    A continuación vemos la red que ha armado Juan
                                </Typography>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Image src={diagrama} layout='responsive' objectFit='cover' width='100%' height='105%' sx={{ textAlign: 'center' }} alt="Diagrama" />
                                </Box>
                                <Typography>
                                    <strong>
                                        Color de contorno:
                                    </strong>
                                </Typography>
                                <Typography>
                                    <strong style={{ color: 'green' }}>(Verde)</strong> Afiliado Activo: Afiliado que consumió el mínimo mensual.
                                </Typography>
                                <Typography>
                                    <strong style={{ color: 'red' }}>(Rojo)</strong> Afiliado Inactivo: Afiliado que NO consumió el mínimo mensual.
                                </Typography>
                                <Typography>
                                    <strong style={{ color: 'yellow' }}>(Amarillo)</strong> Consumidor Activo: Usuario registrado para consumir sin capacidad de invitar
                                    personas y genera comisión al que lo refirió.
                                </Typography>
                                <Typography>
                                    <strong style={{ color: 'gray' }}>(Gris)</strong> Consumidor inactivo: Usuario registrado para consumir sin capacidad de invitar
                                    personas y NO genera comisión al que lo refirió.
                                </Typography>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Typography>
                                        <strong>
                                            NIVEL 1
                                        </strong>
                                    </Typography>
                                    <Typography sx={{ mb: '20px' }}>
                                        Juan le refirió nuestros
                                        productos con su código a
                                        José, Esteban y María.
                                        Todas las personas que
                                        Juan ingrese directamente a
                                        su red serán denominadas
                                        de nivel 1.
                                    </Typography>
                                    <Typography variant="body2">
                                        Esteban y María han estado
                                        consumiendo el mínimo mensual
                                        lo cual le genera a Juan una
                                        ganancia del 5% sobre el monto
                                        total de compra de cada uno.
                                        José por su lado, no hizo el
                                        consumo mensual por lo cual no
                                        generará comisión para Juan y
                                        José no podrá recibir comisión de
                                        su(s) referido(s) ni de su red
                                        debido a que está inactivo.
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Image src={nivel1} layout='responsive' objectFit='cover' width='100%' height='75%' alt="Diagrama" />
                                </Grid>
                            </Grid>
                            <Grid item spacing={2} sx={{ mb: '20px' }}>
                                <Typography>
                                    <strong>
                                        NIVEL 2
                                    </strong>
                                </Typography>
                                <Typography sx={{ mb: '20px' }}>
                                    Sofía, Mónica, Sebastián, Valeria y Armando, son referidos de las personas
                                    que refirió Juan.
                                    Por lo cual pasan a ser su nivel 2.
                                </Typography>
                                <Grid container spacing={2} sx={{ textAlign: 'justify' }}>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant="body2" sx={{ mr: '10px' }}>
                                            Sofía ha estado consumiendo
                                            el paquete afiliado mes con
                                            mes con lo cual se mantiene
                                            activa generando el 5% de
                                            comisión del total de compra
                                            para María y el 10% para Juan.
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant="body2" sx={{ mr: '10px', ml: '10px' }}>
                                            Mónica por su parte solo se
                                            mantiene como usuario consumidor,
                                            significa que ella puede generar
                                            comisiones pero no puede tener red
                                            de afiliados hasta suscribirse como
                                            consumidor afiliado
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant="body2" sx={{ ml: '10px' }}>
                                            Sebastián también ha
                                            estado consumiendo
                                            el paquete mínimo de
                                            manera mensual. Con
                                            lo cual genera el 5%
                                            de comisión del total
                                            de compra para José
                                            y el 10% para Juan.
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Image src={nivel2} layout='responsive' objectFit='cover' width='100%' height='90%' sx={{ textAlign: 'center' }} alt="Diagrama" />
                                </Box>
                                <Grid container spacing={2} sx={{ textAlign: 'justify' }}>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant="body2" sx={{ mr: '10px' }}>
                                            Valeria es muy
                                            constante en su pedido
                                            mensual. Ella genera
                                            el 5% de comisión del
                                            total de compra para
                                            Esteban y el 10% para
                                            Juan
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant="body2" sx={{ mr: '10px', ml: '10px' }}>
                                            Armando por lo general
                                            se le complica comprar
                                            el pedido mensual y se
                                            mantiene inactivo. Por
                                            lo que ni Esteban ni
                                            Juan recibirán comisión
                                            por parte de Armando.
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant="body2" sx={{  ml: '10px' }} >
                                            Como José se encuentra
                                            inactivo, no recibirá la
                                            comisión de Sebastián.
                                            Sin embargo, Juan si
                                            recibirá la comisión que
                                            Sebastián le genere.
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item spacing={2} sx={{ mb: '20px' }}>
                                <Typography>
                                    <strong>
                                        NIVEL 3
                                    </strong>
                                </Typography>
                                <Typography sx={{ mb: '20px' }}>
                                    Sofía y Sebastián no han conseguido ingresar más personas.
                                    Valeria por otro lado, ingresó a Rodrigo y Armando ingresó a Alma.
                                    Todas las personas que ingresan por referidos de nivel 2 de Juan
                                    pasan a ser su nivel 3.
                                </Typography>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Image src={nivel3} layout='responsive' objectFit='cover' width='100%' height='100%' sx={{ textAlign: 'center' }} alt="Diagrama" />
                                </Box>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant="body2">
                                            Rodrigo consume el paquete
                                            afiliado mes con mes.
                                            Lo cual genera el 5% de
                                            comisión del total de compra
                                            para Valeria, el 10% para
                                            Esteban y el 15% para Juan.
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant="body2">
                                            Alma se mantiene como
                                            usuario consumidor. Sin
                                            embargo lo que consume no
                                            cubre el mínimo mensual por
                                            lo cual queda como
                                            consumidor inactivo.
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item spacing={2}>
                                <Typography>
                                    <strong>
                                        NIVEL 4
                                    </strong>
                                </Typography>
                                <Typography sx={{ mb: '20px' }}>
                                    Por último, Rodrigo recomendó a Sergio.
                                    Todas las personas que ingresan por referidos del nivel 3
                                    de Juan pasan a ser su nivel 4.
                                </Typography>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Image src={nivel4} layout='responsive' objectFit='cover' width='100%' height='130%' alt="Diagrama" />
                                </Box>
                                <Grid container spacing={2} sx={{ mb: '20px' }}>
                                    <Grid item xs={12} sm={4}>
                                        <Typography>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant="body2">
                                            Sergio se mantiene activo consumiendo
                                            el paquete afiliado mes con mes. Lo
                                            cual genera el 5% de comisión del total
                                            de compra para Rodrigo, el 10% para
                                            Valeria, el 15% para Esteban y el 15%
                                            para Juan.
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                    </Grid>
                                </Grid>
                                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                                    En caso de que las personas de NIVEL 4 ingresen más personas al esquema ya no contarán para Juan.
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography>

                                </Typography>
                            </Grid>
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
                                                {constants.commissionPercentajePerLevel &&
                                                    Object.entries(constants.commissionPercentajePerLevel).map(([nivel, comision]) => (
                                                        <TableRow key={nivel}>
                                                            <TableCell style={{ textAlign: 'center' }}>{nivel}</TableCell>
                                                            <TableCell style={{ textAlign: 'center' }}>
                                                                <CountUp end={comision * 100} duration={3} suffix="%" />
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Card>
                            </Box>
                        </Grid>

                        <Grid item xs={6} sx={{ marginBottom: '40px' }}>
                            <Typography variant='h6' sx={{ mt: 4, mb: 4, textAlign: 'center' }}>REQUISITOS</Typography>
                            <Typography variant="body1" >
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
                            <Typography variant="body1" >
                                Consumir mensualmente el monto mínimo de ${constants.minimalAmountOfPurchase} antes de la fecha de corte.
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ marginBottom: '60px' }}>
                        <Typography variant="body1" >
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
                    <Grid item xs={12} sx={{ marginBottom: '40px' }}>
                        <Typography variant="body1" sx={{ textAlign: 'center' }}>
                            Recomienda, gana y mejora tu salud.
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'center' }}>
                            <strong>Inmunosalud te recompensa por cuidarte</strong>
                        </Typography>
                    </Grid>
                    <FAQs data={questions} />
                </Container>
            ) : (
                <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                    <CircularProgress />
                </Box>
            )}
        </ParallaxProvider>
    );
}
