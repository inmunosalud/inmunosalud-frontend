import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Card, CardContent, CardHeader, CardActions, Grid, useTheme } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { CircularProgress } from '@mui/material';
import CountUp from 'react-countup';
import { ParallaxProvider, Parallax, ParallaxBanner } from 'react-scroll-parallax';

import diagrama from '/public/images/cards/diagrama.png';
import nivel1 from '/public/images/cards/nivel1.png';
import nivel2 from '/public/images/cards/nivel2.png';
import nivel3 from '/public/images/cards/nivel3.png';
import nivel4 from '/public/images/cards/nivel4.png';
import illustrationJohn from 'public/images/cards/illustration-john.png';
import illustrationJohn2 from 'public/images/cards/illustration-john-2.png';
import pose_f9 from 'public/images/cards/pose_f9.png';
import pose_m18 from 'public/images/cards/pose_m18.png';
import pose_m35 from 'public/images/cards/pose_m35.png';






import { PROFILES_USER } from 'src/configs/profiles'
import { getConstants } from 'src/store/constants';
import { useDispatch, useSelector } from 'react-redux';

import FAQs from 'src/views/landing-page/FAQs';



export default function AffiliationPage() {

    const { constants, isLoading } = useSelector(state => state.constants)
    const { user } = useSelector(state => state.dashboard.general)
    const router = useRouter()
    const dispatch = useDispatch()
    const [isMobile, setIsMobile] = useState(false);


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Establece isMobile a true si el ancho de la ventana es menor a 768px
        };

        handleResize(); // Llamada inicial para establecer el estado inicial

        // Suscripción al evento de redimensionamiento de la ventana
        window.addEventListener('resize', handleResize);

        // Limpieza de la suscripción al desmontar el componente
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    useEffect(() => {
        dispatch(getConstants())
    }, [dispatch])

    const handleConvertProfile = () => {
        router.push({ pathname: '/register/address', query: { newAssociate: true } })
    }

    const questions = [
        {
            id: 1,
            question: '¿Cuanto es el porcentaje de comisión?',
            answer:
                'Inmunosalud ofrece un generoso porcentaje de comisión de hasta el 45% sobre el total de las compras realizadas por tu red.\n El sistema de comisiones funciona de la siguiente manera: recibes el 5% de las compras por las personas que refieras y se afilien, el 10% de las compras realizadas por los referidos y afiliados de tus referidos, el 15% de los referidos y afiliados de tu segunda línea, y otro 15% de los referidos y afiliados de tu tercera línea.\n Para que el afiliado reciba comisiones deberá estar activo.\n Recibes comisión del consumo de los afiliados activos de tu red.',
        },
        {
            id: 2,
            question: '¿Dónde recibo mis comisiones?',
            answer:
                'Las comisiones generadas se depositan en la cuenta bancaria que proporcionaste durante el registro como afiliado.',
        },
        {
            id: 3,
            question: '¿Como crezco mi red si soy afiliado?',
            answer:
                'Para ingresar a alguien a tu red, simplemente debes proporcionar tu código de referencia asignado a tu cuenta de afiliado, y ellos deberán ingresarlo al registrarse en Inmunosalud.\n Si la persona ya tiene una cuenta, pero no ha registrado un código de referencia, puede agregarlo en su cuenta para unirse a tu red.\n Una vez que un usuario registra un código, ya no puede cambiarlo.\n Para hacer crecer tu red, solo necesitas recomendar nuestros productos y compartir tu código de referencia con otras personas interesadas en adquirirlos.',
        },
        {
            id: 4,
            question: '¿Cuanto puede crecer mi red?',
            answer:
                'Tu red puede crecer sin límites dentro de los 4 niveles de comisión establecidos.',
        },
        {
            id: 5,
            question: '¿Puedo vender estos productos?',
            answer:
                'Inmunosalud no reconoce las ventas independientes de los productos, solo reconoce la venta de sus productos a través de nuestra página web oficial',
            link: 'https://www.inmunosalud.mx'
        }
    ];

    return (
        <ParallaxProvider>
            {constants && constants.commissionPercentajePerLevel ? (
                <Container>
                    {!isMobile ? (
                        <>
                            <Parallax speed={-5} translateY={[20, 20]} >
                                <Box sx={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: '400px' }}>
                                    <Typography variant="h2" sx={{ textAlign: 'center' }}>
                                        ¡En InmunoSalud queremos que crezcas con nosotros!
                                    </Typography>
                                </Box>
                            </Parallax>


                            <Parallax speed={-5} translateY={[20, 20]}>
                                <Grid container spacing={10} sx={{ mb: '400px' }}>
                                    <Grid item xs={12} sm={6}>
                                        <Box display="flex" alignItems="center" height="100%">
                                            <Typography variant="body1">
                                                En Inmunosalud creemos que la mejor manera de llegar a más personas es a través de nuestros
                                                consumidores por lo cual a nuestros afiliados los remuneramos con comisión de hasta un 45%*.
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Parallax speed={5} translateY={[-10, 20]}>
                                            <Image src={illustrationJohn2} layout='responsive' sx={{ textAlign: 'center' }} alt="Diagrama" />
                                        </Parallax>
                                    </Grid>
                                </Grid>
                            </Parallax>

                            <Parallax speed={-5} translateY={[20, 20]}>
                                <Grid container spacing={10} sx={{ mb: '400px' }}>
                                    <Grid item xs={12} sm={6}>
                                        <Parallax speed={5} translateY={[-10, 20]}>
                                            <Image src={illustrationJohn} layout='responsive' sx={{ textAlign: 'center' }} alt="Diagrama" />
                                        </Parallax>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Box display="flex" alignItems="center" height="100%">
                                            <Typography variant="body1" >
                                                Nuestra filosofía se basa en el mutuo beneficio y la colaboración.
                                                Al proporcionar a nuestros afiliados una comisión significativa, buscamos fomentar una relación
                                                sólida y duradera, donde podamos crecer juntos.
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Parallax>



                            <Parallax speed={-5} translateY={[20, 20]}>
                                <Grid container spacing={10} sx={{ mb: '400px' }}>
                                    <Grid item xs={12} sm={6}>
                                        <Box display="flex" flexDirection="column" justifyContent="center" height="100%">
                                            <Typography variant='h5' sx={{ mb: '20px' }}>ESQUEMA Y ARMADO DE RED DE CONSUMO</Typography>
                                            <Typography variant="body1" sx={{ mb: '20px' }}>
                                                El consumidor afiliado podrá referir para integrar personas directamente a su red, las cuáles
                                                serán de primer nivel. A su vez, los de primer nivel al ser consumidores afiliados, podrán referir
                                                e integrar personas en su red.
                                                La red puede crecer hasta el cuarto nivel.
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Grid container spacing={10} sx={{ mb: '40px' }}>
                                            <Grid item xs={12}>
                                                <Box style={{ textAlign: 'center' }}>
                                                    <Parallax speed={-5} translateY={[20, 20]}>
                                                        <Grid container spacing={4}>

                                                            <Grid item xs={12} sm={6}>
                                                                <Card>
                                                                    <CardHeader title="De todas las personas que tú refieres recibes el:" sx={{ textAlign: 'left' }} />
                                                                    <CardContent>
                                                                        <Typography variant="h2" sx={{ fontSize: '3rem' }}>
                                                                            <strong>
                                                                                <CountUp end={constants.commissionPercentajePerLevel[1] * 100} duration={3} suffix="%" />
                                                                            </strong>
                                                                        </Typography>
                                                                        <Typography variant="body1" sx={{ textAlign: 'right' }}>
                                                                            <strong>
                                                                                total de Compra
                                                                            </strong>
                                                                        </Typography>
                                                                    </CardContent>
                                                                </Card>
                                                            </Grid>
                                                            <Grid item xs={12} sm={6}>
                                                                <Card>
                                                                    <CardHeader title={
                                                                        <Typography variant="h6">
                                                                            Si ellos refirieran a otra,
                                                                            se te da el:
                                                                            <br />
                                                                        </Typography>
                                                                    } sx={{ whiteSpace: 'pre-line', textAlign: 'left' }} />
                                                                    <CardContent>
                                                                        <Typography variant="h2" sx={{ fontSize: '3rem' }}>
                                                                            <strong>
                                                                                <CountUp end={constants.commissionPercentajePerLevel[2] * 100} duration={3} suffix="%" />
                                                                            </strong>
                                                                        </Typography>
                                                                        <Typography variant="body1" sx={{ textAlign: 'right' }}>
                                                                            <strong>
                                                                                total de Compra
                                                                            </strong>
                                                                        </Typography>
                                                                    </CardContent>
                                                                </Card>
                                                            </Grid>
                                                            <Grid item xs={12} sm={6}>
                                                                <Card>
                                                                    <CardHeader title="De los referidos de tu segunda línea, se te otorga el:" sx={{ textAlign: 'left' }} />
                                                                    <CardContent>
                                                                        <Typography variant="h2" sx={{ fontSize: '3rem' }}>
                                                                            <strong>
                                                                                <CountUp end={constants.commissionPercentajePerLevel[3] * 100} duration={3} suffix="%" />
                                                                            </strong>
                                                                        </Typography>
                                                                        <Typography variant="body1" sx={{ textAlign: 'right' }}>
                                                                            <strong>
                                                                                total de Compra
                                                                            </strong>
                                                                        </Typography>
                                                                    </CardContent>
                                                                </Card>
                                                            </Grid>
                                                            <Grid item xs={12} sm={6}>
                                                                <Card>
                                                                    <CardHeader title="y los referidos de tu tercera línea te otorgan un:" sx={{ textAlign: 'left' }} />
                                                                    <CardContent>
                                                                        <Typography variant="h2" sx={{ fontSize: '3rem' }}>
                                                                            <strong>
                                                                                <CountUp end={constants.commissionPercentajePerLevel[4] * 100} duration={3} suffix="%" />
                                                                            </strong>
                                                                        </Typography>
                                                                        <Typography variant="body1" sx={{ textAlign: 'right' }}>
                                                                            <strong>
                                                                                total de Compra
                                                                            </strong>
                                                                        </Typography>
                                                                    </CardContent>
                                                                </Card>
                                                            </Grid>
                                                        </Grid>
                                                    </Parallax>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Parallax>

                            <Grid container spacing={10} sx={{ mb: '40px' }}>
                                <Parallax speed={-5} translateY={[20, 20]}>
                                    <Grid container spacing={10} sx={{ mb: '400px' }}>
                                        <Grid item xs={12} sm={6}>
                                            <Parallax speed={5} translateY={[-10, 20]}>
                                                <Box sx={{ textAlign: 'center', width: '100%', margin: '0 auto' }}>
                                                    <Image src={diagrama} layout='responsive' alt="Diagrama" />
                                                </Box>
                                            </Parallax>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Box display="flex" flexDirection="column" justifyContent="center" height="100%" >
                                                <Typography variant="h6" sx={{ mb: '20px' }}>
                                                    La manera en la que funciona nuestro sistema de comisiones es la siguiente:
                                                </Typography>
                                                <Typography paragraph>
                                                    Juan es un consumidor afiliado que mes con mes hace su pedido
                                                    para mantenerse activo y recibir los beneficios de InmunoSalud.
                                                    A continuación vemos la red que ha armado Juan
                                                </Typography>
                                                <Typography variant="body2">
                                                    <strong>Color de contorno:</strong>
                                                </Typography>
                                                <Typography variant="body2">
                                                    <strong style={{ color: 'green' }}>(Verde)</strong> Afiliado Activo: Afiliado que consumió el mínimo mensual.
                                                </Typography>
                                                <Typography variant="body2">
                                                    <strong style={{ color: 'red' }}>(Rojo)</strong> Afiliado Inactivo: Afiliado que NO consumió el mínimo mensual.
                                                </Typography>
                                                <Typography variant="body2">
                                                    <strong style={{ color: 'yellow' }}>(Amarillo)</strong> Consumidor Activo: Usuario registrado para consumir sin capacidad de invitar
                                                    personas y genera comisión al que lo refirió.
                                                </Typography>
                                                <Typography variant="body2">
                                                    <strong style={{ color: 'gray' }}>(Gris)</strong> Consumidor inactivo: Usuario registrado para consumir sin capacidad de invitar
                                                    personas y NO genera comisión al que lo refirió.
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Parallax>


                                <Parallax speed={-5} translateY={[20, 20]}>
                                    <Grid container spacing={10} sx={{ mb: '400px' }}>
                                        <Grid item xs={12} sm={6}>
                                            <Box display="flex" flexDirection="column" justifyContent="center" height="100%" sx={{ paddingLeft: '40px' }}>
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
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Parallax speed={5} translateY={[-10, 20]}>
                                                <Box sx={{ textAlign: 'center' }}>
                                                    <Image src={nivel1} layout='responsive' alt="Diagrama" />
                                                </Box>
                                            </Parallax>
                                        </Grid>
                                    </Grid>
                                </Parallax>


                                <Grid item spacing={10} sx={{ mb: '600px' }}>
                                    <Parallax speed={-5} translateY={[20, 20]}>
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
                                    </Parallax>
                                    <Parallax speed={-5} translateY={[20, 20]}>
                                        <Grid container spacing={10} sx={{ textAlign: 'justify' }}>
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
                                    </Parallax>
                                    <Parallax speed={5} translateY={[-10, 20]}>
                                        <Box sx={{ textAlign: 'center', width: '50%', margin: '0 auto', mt: '-90px', mb: '-60px' }}>
                                            <Image src={nivel2} layout='responsive' alt="Diagrama" />
                                        </Box>
                                    </Parallax>
                                    <Parallax speed={-5} translateY={[20, 20]}>
                                        <Grid container spacing={10} sx={{ textAlign: 'justify' }}>
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
                                                <Typography variant="body2" sx={{ ml: '10px' }} >
                                                    Como José se encuentra
                                                    inactivo, no recibirá la
                                                    comisión de Sebastián.
                                                    Sin embargo, Juan si
                                                    recibirá la comisión que
                                                    Sebastián le genere.
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Parallax>
                                </Grid>



                                <Grid item spacing={10} sx={{ mb: '600px' }}>
                                    <Parallax speed={-5} translateY={[20, 20]}>
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
                                        <Parallax speed={5} translateY={[-10, 20]}>
                                            <Box sx={{ textAlign: 'center', width: '50%', margin: '0 auto', mt: '-140px', mb: '-40px' }}>
                                                <Image src={nivel3} layout='responsive' alt="Diagrama" />
                                            </Box>
                                        </Parallax>
                                        <Grid container spacing={10}>
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
                                    </Parallax>
                                </Grid>



                                <Grid item spacing={10} sx={{ mb: '600px' }}>
                                    <Parallax speed={-5} translateY={[20, 20]}>
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
                                        <Parallax speed={5} translateY={[-10, 20]}>
                                            <Box sx={{ textAlign: 'center', width: '50%', margin: '0 auto', mt: '-80px', mb: '100px' }}>
                                                <Image src={nivel4} layout='responsive' alt="Diagrama" />
                                            </Box>
                                        </Parallax>
                                        <Grid container spacing={10} sx={{ mb: '20px' }}>
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
                                    </Parallax>
                                </Grid>


                                <Box maxWidth="fit-content" sx={{ margin: '0 auto', mb: '400px' }}>
                                    <Parallax speed={-5} translateY={[20, 20]}>
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
                                    </Parallax>
                                </Box>
                            </Grid>




                            <Parallax speed={5} translateY={[-40, 20]}>
                                <Grid container spacing={10} sx={{ mb: '400px' }}>
                                    <Grid container xs={12} sm={6}>
                                        <Box display="flex" justifyContent="center" flexDirection="column" sx={{ paddingLeft: '40px' }}>
                                            <Typography variant='h6' sx={{ mb: 4 }}>Requisitos</Typography>
                                            <Typography variant="body1">
                                                • Estar afiliado.
                                            </Typography>
                                            <Typography variant="body1">
                                                • Consumir mínimo mensual para permanecer activo.
                                            </Typography>
                                            <Typography variant="body1">
                                                • Tener referidos activos.
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{ textAlign: 'center', width: '30%', margin: '0 auto' }}>
                                            <Parallax speed={5} translateY={[-10, 20]}>
                                                <Image src={pose_m18} layout='responsive' alt="Diagrama" />
                                            </Parallax>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Parallax>



                            <Parallax speed={-5} translateY={[20, 20]}>
                                <Grid container spacing={10} sx={{ mb: '400px' }}>
                                    <Grid item xs={12} sm={6}>
                                        <Parallax speed={5} translateY={[-10, 20]}>
                                            <Box sx={{ textAlign: 'center', width: '40%', margin: '0 auto' }}>
                                                <Image src={pose_f9} layout='responsive' alt="Diagrama" />
                                            </Box>
                                        </Parallax>
                                    </Grid>
                                    <Grid container xs={12} sm={6}>
                                        <Box display="flex" justifyContent="center" flexDirection="column">
                                            <Typography variant='h6' sx={{ mb: 4 }} >Qué hacer para permanecer activo</Typography>
                                            <Typography variant="body1" >
                                                Consumir mensualmente el monto mínimo de compra antes de la fecha de corte.
                                            </Typography>
                                            <Typography variant="body1" >
                                                El día {constants.cutoffDay} de cada mes se revisará el consumo de cada afiliado para
                                                determinar si está activo o inactivo.
                                                En caso de estar activo, se pagará el monto correspondiente de cada nivel con su
                                                respectivo porcentaje de comisión {constants.waitingDaysForTransfers} días después de la fecha de corte.
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Parallax>


                            <Parallax speed={-5} translateY={[20, 20]}>
                                <Grid container spacing={10} sx={{ mb: '400px' }}>
                                    <Grid container xs={12} sm={6}>
                                        <Box display="flex" justifyContent="center" flexDirection="column" sx={{ paddingLeft: '40px' }}>
                                            <Typography variant='h5' sx={{ mb: '20px' }}>Tips para crecer tu red</Typography>
                                            <Typography variant="body1" paragraph>
                                                Referir nunca fue tan fácil,
                                                a medida que estes usando nuestros productos sentirás mejoras en tu día a día que podrás compartir con tus
                                                familiares, amig@s y colaboradores los cuales podrás invitar a que prueben nuestros productos como
                                                consumidores, de esta manera no se necesitan afiliar de manera inmediata, empiezan a sentir los beneficios
                                                de nuestros productos y cuando ellos lo decidan se pueden convertir en afiliados para que también
                                                compartan sus experiencias con mas personas y reciba los beneficios de ser afiliados de Inmunosalud.
                                            </Typography>
                                            <Typography variant="body1" paragraph>
                                                Las mejoras que empezaras a percibir por el uso de nuestros productos las puedes compartir en tu trabajo,
                                                cuando haces actividad física con otras personas, reuniones familiares, etc., Nuestro sistema busca que
                                                sea de una manera sencilla recomendar a que más personas prueben nuestros productos.
                                            </Typography>
                                            <Typography variant="body1">
                                                Solo tienes que compartir tu código a las personas que les recomiendes nuestros productos y que lo ingresen
                                                al momento de hacer su primera compra. Estos ya formaran a ser parte de tu red para recibir los beneficios
                                                de ser afiliado.
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Parallax speed={5} translateY={[-10, 20]}>
                                            <Box sx={{ textAlign: 'center', width: '40%', margin: '0 auto' }}>
                                                <Image src={pose_m35} layout='responsive' alt="Diagrama" />
                                            </Box>
                                        </Parallax>
                                    </Grid>
                                </Grid>
                            </Parallax>




                            <Parallax speed={-5} translateY={[20, 20]}>
                                <Grid item xs={12} sx={{ mb: '400px' }}>
                                    <Typography variant="body1" sx={{ textAlign: 'center' }}>
                                        Recomienda, gana y mejora tu salud.
                                    </Typography>
                                    <Typography variant="body1" sx={{ textAlign: 'center' }}>
                                        <strong>Inmunosalud te recompensa por cuidarte</strong>
                                    </Typography>
                                    {user?.profile === PROFILES_USER.consumerUser && (
                                        <Parallax speed={5} translateY={[-10, 20]}>
                                            <Box display="flex" justifyContent="center" sx={{ mt: '20px' }}>
                                                <Button variant="contained" color="primary" size="large" onClick={handleConvertProfile}>
                                                    Afíliate a nosotros
                                                </Button>
                                            </Box>
                                        </Parallax>
                                    )}
                                </Grid>
                            </Parallax>

                            <Parallax speed={-5} translateY={[20, 20]}>
                                <FAQs data={questions} />
                            </Parallax>
                        </>
                    ) :
                        <>

                            <Box sx={{ height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h4" sx={{ textAlign: 'center' }}>
                                    ¡En InmunoSalud queremos que crezcas con nosotros!
                                </Typography>
                            </Box>




                            <Grid container spacing={10} sx={{ mb: '40px' }}>
                                <Grid item xs={12} sm={6}>
                                    <Box display="flex" alignItems="center" height="100%">
                                        <Typography variant="body1">
                                            En Inmunosalud creemos que la mejor manera de llegar a más personas es a través de nuestros
                                            consumidores por lo cual a nuestros afiliados los remuneramos con comisión de hasta un 45%*.
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Image src={illustrationJohn2} layout='responsive' sx={{ textAlign: 'center' }} alt="Diagrama" />
                                </Grid>
                            </Grid>



                            <Grid container spacing={10} sx={{ mb: '100px' }}>
                                <Grid item xs={12} sm={6}>
                                    <Box display="flex" alignItems="center" height="100%">
                                        <Typography variant="body1" >
                                            Nuestra filosofía se basa en el mutuo beneficio y la colaboración.
                                            Al proporcionar a nuestros afiliados una comisión significativa, buscamos fomentar una relación
                                            sólida y duradera, donde podamos crecer juntos.
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Image src={illustrationJohn} layout='responsive' sx={{ textAlign: 'center' }} alt="Diagrama" />
                                </Grid>
                            </Grid>





                            <Grid container spacing={10} sx={{ mb: '40px' }}>
                                <Grid item xs={12} sm={6}>
                                    <Box display="flex" flexDirection="column" justifyContent="center" height="100%">
                                        <Typography variant='h5' sx={{ mb: '20px' }}>ESQUEMA Y ARMADO DE RED DE CONSUMO</Typography>
                                        <Typography variant="body1" sx={{ mb: '20px' }}>
                                            El consumidor afiliado podrá referir para integrar personas directamente a su red, las cuáles
                                            serán de primer nivel. A su vez, los de primer nivel al ser consumidores afiliados, podrán referir
                                            e integrar personas en su red.
                                            La red puede crecer hasta el cuarto nivel.
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Grid container spacing={10} sx={{ mb: '40px' }}>
                                        <Grid item xs={12}>
                                            <Box style={{ textAlign: 'center' }}>
                                                <Grid container spacing={4}>
                                                    <Grid item xs={12} sm={6}>
                                                        <Card>
                                                            <CardHeader title="De todas las personas que tú refieres recibes el:" sx={{ textAlign: 'left' }} />
                                                            <CardContent>
                                                                <Typography variant="h2" sx={{ fontSize: '3rem' }}>
                                                                    <strong>
                                                                        <CountUp end={constants.commissionPercentajePerLevel[1] * 100} duration={3} suffix="%" />
                                                                    </strong>
                                                                </Typography>
                                                                <Typography variant="body1" sx={{ textAlign: 'right' }}>
                                                                    <strong>
                                                                        total de Compra
                                                                    </strong>
                                                                </Typography>
                                                            </CardContent>
                                                        </Card>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Card>
                                                            <CardHeader title={
                                                                <Typography variant="h6">
                                                                    Si ellos refirieran a otra,
                                                                    se te da el:
                                                                    <br />
                                                                </Typography>
                                                            } sx={{ whiteSpace: 'pre-line', textAlign: 'left' }} />
                                                            <CardContent>
                                                                <Typography variant="h2" sx={{ fontSize: '3rem' }}>
                                                                    <strong>
                                                                        <CountUp end={constants.commissionPercentajePerLevel[2] * 100} duration={3} suffix="%" />
                                                                    </strong>
                                                                </Typography>
                                                                <Typography variant="body1" sx={{ textAlign: 'right' }}>
                                                                    <strong>
                                                                        total de Compra
                                                                    </strong>
                                                                </Typography>
                                                            </CardContent>
                                                        </Card>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Card>
                                                            <CardHeader title="De los referidos de tu segunda línea, se te otorga el:" sx={{ textAlign: 'left' }} />
                                                            <CardContent>
                                                                <Typography variant="h2" sx={{ fontSize: '3rem' }}>
                                                                    <strong>
                                                                        <CountUp end={constants.commissionPercentajePerLevel[3] * 100} duration={3} suffix="%" />
                                                                    </strong>
                                                                </Typography>
                                                                <Typography variant="body1" sx={{ textAlign: 'right' }}>
                                                                    <strong>
                                                                        total de Compra
                                                                    </strong>
                                                                </Typography>
                                                            </CardContent>
                                                        </Card>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Card>
                                                            <CardHeader title="y los referidos de tu tercera línea te otorgan un:" sx={{ textAlign: 'left' }} />
                                                            <CardContent>
                                                                <Typography variant="h2" sx={{ fontSize: '3rem' }}>
                                                                    <strong>
                                                                        <CountUp end={constants.commissionPercentajePerLevel[4] * 100} duration={3} suffix="%" />
                                                                    </strong>
                                                                </Typography>
                                                                <Typography variant="body1" sx={{ textAlign: 'right' }}>
                                                                    <strong>
                                                                        total de Compra
                                                                    </strong>
                                                                </Typography>
                                                            </CardContent>
                                                        </Card>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>


                            <Grid container spacing={10} sx={{ mb: '40px' }}>

                                <Grid container spacing={10} sx={{ mb: '40px' }}>
                                    <Grid item xs={12} sm={6}>
                                        <Box display="flex" flexDirection="column" justifyContent="center" height="100%" sx={{ paddingLeft: '40px' }}>
                                            <Typography variant="h6" sx={{ mb: '20px' }}>
                                                La manera en la que funciona nuestro sistema de comisiones es la siguiente:
                                            </Typography>
                                            <Typography paragraph>
                                                Juan es un consumidor afiliado que mes con mes hace su pedido
                                                para mantenerse activo y recibir los beneficios de InmunoSalud.
                                                A continuación vemos la red que ha armado Juan
                                            </Typography>
                                            <Typography variant="body2">
                                                <strong>Color de contorno:</strong>
                                            </Typography>
                                            <Typography variant="body2">
                                                <strong style={{ color: 'green' }}>(Verde)</strong> Afiliado Activo: Afiliado que consumió el mínimo mensual.
                                            </Typography>
                                            <Typography variant="body2">
                                                <strong style={{ color: 'red' }}>(Rojo)</strong> Afiliado Inactivo: Afiliado que NO consumió el mínimo mensual.
                                            </Typography>
                                            <Typography variant="body2">
                                                <strong style={{ color: 'yellow' }}>(Amarillo)</strong> Consumidor Activo: Usuario registrado para consumir sin capacidad de invitar
                                                personas y genera comisión al que lo refirió.
                                            </Typography>
                                            <Typography variant="body2">
                                                <strong style={{ color: 'gray' }}>(Gris)</strong> Consumidor inactivo: Usuario registrado para consumir sin capacidad de invitar
                                                personas y NO genera comisión al que lo refirió.
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>

                                        <Box sx={{ textAlign: 'center', width: '100%', mt: '-50px' }}>
                                            <Image src={diagrama} layout='responsive' alt="Diagrama" />
                                        </Box>

                                    </Grid>
                                </Grid>




                                <Grid container spacing={10} sx={{ mb: '40px', paddingLeft: '40px' }}>
                                    <Grid item xs={12} sm={6}>
                                        <Box display="flex" flexDirection="column" justifyContent="center" height="100%" >
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
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{ textAlign: 'center', mt: '-90px' }}>
                                            <Image src={nivel1} layout='responsive' alt="Diagrama" />
                                        </Box>
                                    </Grid>
                                </Grid>



                                <Grid item spacing={10} sx={{ mb: '100px' }}>
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


                                    <Grid container spacing={10} sx={{ textAlign: 'justify' }}>
                                        <Grid item xs={12} sm={4}>
                                            <Typography variant="body2" >
                                                Sofía ha estado consumiendo
                                                el paquete afiliado mes con
                                                mes con lo cual se mantiene
                                                activa generando el 5% de
                                                comisión del total de compra
                                                para María y el 10% para Juan.
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Typography variant="body2" >
                                                Mónica por su parte solo se
                                                mantiene como usuario consumidor,
                                                significa que ella puede generar
                                                comisiones pero no puede tener red
                                                de afiliados hasta suscribirse como
                                                consumidor afiliado
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Typography variant="body2" >
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


                                    <Box sx={{ textAlign: 'center', width: '100%', margin: '0 auto', mt: '-10px', mb: '-10px' }}>
                                        <Image src={nivel2} layout='responsive' alt="Diagrama" />
                                    </Box>


                                    <Grid container spacing={10} sx={{ textAlign: 'justify' }}>
                                        <Grid item xs={12} sm={4}>
                                            <Typography variant="body2" >
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
                                            <Typography variant="body2" >
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
                                            <Typography variant="body2">
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



                                <Grid item spacing={10} sx={{ mb: '100px' }}>
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

                                    <Box sx={{ textAlign: 'center', width: '100%', margin: '0 auto', mt: '-60px', mb: '-60px' }}>
                                        <Image src={nivel3} layout='responsive' alt="Diagrama" />
                                    </Box>

                                    <Grid container spacing={10}>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="body2">
                                                Rodrigo consume el paquete
                                                afiliado mes con mes.
                                                Lo cual genera el 5% de
                                                comisión del total de compra
                                                para Valeria, el 10% para
                                                Esteban y el 15% para Juan.
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
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



                                <Grid item spacing={10} sx={{ mb: '100px' }}>
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
                                    <Box sx={{ textAlign: 'center', width: '100%', margin: '0 auto', mt: '-40px', mb: '-60px' }}>
                                        <Image src={nivel4} layout='responsive' alt="Diagrama" />
                                    </Box>
                                    <Grid container spacing={10} sx={{ mb: '20px' }}>
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
                                    <Typography variant="body2" >
                                        En caso de que las personas de NIVEL 4 ingresen más personas al esquema ya no contarán para Juan.
                                    </Typography>

                                </Grid>


                                <Box maxWidth="fit-content" sx={{ textAlign: 'center', margin: '0 auto', paddingLeft: '30px', mb: '100px' }}>

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




                            <Grid container spacing={10} sx={{ mb: '100px' }}>
                                <Grid container xs={12} sm={6}>
                                    <Box display="flex" justifyContent="center" flexDirection="column" sx={{ paddingLeft: '40px' }}>
                                        <Typography variant='h6' sx={{ mb: 4 }}>Requisitos</Typography>
                                        <Typography variant="body1">
                                            • Estar afiliado.
                                        </Typography>
                                        <Typography variant="body1">
                                            • Consumir mínimo mensual para permanecer activo.
                                        </Typography>
                                        <Typography variant="body1">
                                            • Tener referidos activos.
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ textAlign: 'center', width: '30%', margin: '0 auto' }}>

                                        <Image src={pose_m18} layout='responsive' alt="Diagrama" />

                                    </Box>
                                </Grid>
                            </Grid>





                            <Grid container spacing={10} sx={{ mb: '100px' }}>
                                <Grid container xs={12} sm={6}>
                                    <Box display="flex" justifyContent="center" flexDirection="column" sx={{ paddingLeft: '40px' }}>
                                        <Typography variant='h6' sx={{ mb: 4 }} >Qué hacer para permanecer activo</Typography>
                                        <Typography variant="body1" >
                                            Consumir mensualmente el monto mínimo de compra antes de la fecha de corte.
                                        </Typography>
                                        <Typography variant="body1" >
                                            El día {constants.cutoffDay} de cada mes se revisará el consumo de cada afiliado para
                                            determinar si está activo o inactivo.
                                            En caso de estar activo, se pagará el monto correspondiente de cada nivel con su
                                            respectivo porcentaje de comisión {constants.waitingDaysForTransfers} días después de la fecha de corte.
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ textAlign: 'center', width: '40%', margin: '0 auto' }}>
                                        <Image src={pose_f9} layout='responsive' alt="Diagrama" />
                                    </Box>
                                </Grid>
                            </Grid>




                            <Grid container spacing={10} sx={{ mb: '100px' }}>
                                <Grid container xs={12} sm={6}>
                                    <Box display="flex" justifyContent="center" flexDirection="column" sx={{ paddingLeft: '40px' }}>
                                        <Typography variant='h5' sx={{ mb: '20px' }}>Tips para crecer tu red</Typography>
                                        <Typography variant="body1" paragraph>
                                            Referir nunca fue tan fácil,
                                            a medida que estes usando nuestros productos sentirás mejoras en tu día a día que podrás compartir con tus
                                            familiares, amig@s y colaboradores los cuales podrás invitar a que prueben nuestros productos como
                                            consumidores, de esta manera no se necesitan afiliar de manera inmediata, empiezan a sentir los beneficios
                                            de nuestros productos y cuando ellos lo decidan se pueden convertir en afiliados para que también
                                            compartan sus experiencias con mas personas y reciba los beneficios de ser afiliados de Inmunosalud.
                                        </Typography>
                                        <Typography variant="body1" paragraph>
                                            Las mejoras que empezaras a percibir por el uso de nuestros productos las puedes compartir en tu trabajo,
                                            cuando haces actividad física con otras personas, reuniones familiares, etc., Nuestro sistema busca que
                                            sea de una manera sencilla recomendar a que más personas prueben nuestros productos.
                                        </Typography>
                                        <Typography variant="body1">
                                            Solo tienes que compartir tu código a las personas que les recomiendes nuestros productos y que lo ingresen
                                            al momento de hacer su primera compra. Estos ya formaran a ser parte de tu red para recibir los beneficios
                                            de ser afiliado.
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>

                                    <Box sx={{ textAlign: 'center', width: '40%', margin: '0 auto' }}>
                                        <Image src={pose_m35} layout='responsive' alt="Diagrama" />
                                    </Box>

                                </Grid>
                            </Grid>






                            <Grid item xs={12} sx={{ mb: '100px' }}>
                                <Typography variant="body1" sx={{ textAlign: 'center' }}>
                                    Recomienda, gana y mejora tu salud.
                                </Typography>
                                <Typography variant="body1" sx={{ textAlign: 'center' }}>
                                    <strong>Inmunosalud te recompensa por cuidarte</strong>
                                </Typography>
                                {user?.profile === PROFILES_USER.consumerUser && (

                                    <Box display="flex" justifyContent="center" sx={{ mt: '20px' }}>
                                        <Button variant="contained" color="primary" size="large" onClick={handleConvertProfile}>
                                            Afíliate a nosotros
                                        </Button>
                                    </Box>

                                )}
                            </Grid>



                            <FAQs data={questions} />
                        </>
                    }
                </Container >
            ) : (
                <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                    <CircularProgress />
                </Box>
            )
            }
        </ParallaxProvider >
    );
}
