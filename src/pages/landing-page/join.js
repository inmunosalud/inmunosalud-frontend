import React from 'react';
import { Container, Typography, Box } from '@mui/material';

export default function AffiliationPage() {

    return (
        <Container>
            <Typography variant="h1">¡En InmunoSalud queremos que crezcas con nosotros!</Typography>

            <Box mt={4}>
                <Typography variant="body1">
                    En Inmunosalud creemos que la mejor manera de llegar a más personas es a través de nuestros consumidores,
                    por lo cual a nuestros afiliados los remuneramos con comisión de hasta %.
                </Typography>
                <Typography variant="body1">
                    Nuestra filosofía se basa en el mutuo beneficio y la colaboración.
                    Al proporcionar a nuestros afiliados una comisión significativa, buscamos fomentar una relación sólida y duradera,
                    donde podamos crecer juntos.
                </Typography>
            </Box>

            <Box mt={4}>
                <Typography variant="h2">ESQUEMA Y ARMADO DE RED DE CONSUMO</Typography>
                <Typography variant="body1">
                    El consumidor afiliado podrá referir para integrar personas directamente a su red, las cuáles serán de primer nivel.
                    A su vez, los de primer nivel al ser consumidores afiliados, podrán referir e integrar personas en su red.
                    La red puede crecer hasta el cuarto nivel.
                </Typography>
            </Box>

            <Box mt={4}>
                <Typography variant="h2">REQUISITOS</Typography>
                <Typography variant="body1">
                    • Ser consumidor afiliado.
                </Typography>
                <Typography variant="body1">
                    • Consumir mínimo mensual para permanecer activo.
                </Typography>
                <Typography variant="body1">
                    • Tener referidos activos.
                </Typography>
            </Box>

            <Box mt={4}>
                <Typography variant="h2">Que hacer para permanecer activo</Typography>
                <Typography variant="body1">
                    Consumir mensualmente el monto mínimo de $NNNNN antes de la fecha de corte.
                </Typography>
            </Box>

            <Box mt={4}>
                <Typography variant="h2">PREGUNTAS FRECUENTES</Typography>
                <Typography variant="body1">
                    ¿Qué se necesita para afiliarte?
                </Typography>
                <Typography variant="body1">
                    ¿He escuchado que los esquemas piramidales son fraudes, es cierto?
                </Typography>
                <Typography variant="body1">
                    ¿Cuánto es el porcentaje de comisión?
                </Typography>
                <Typography variant="body1">
                    ¿Cómo crezco mi red si soy consumidor afiliado?
                </Typography>
            </Box>

            <Box mt={4}>
                <Typography variant="body1">
                    Recomienda, gana y mejora tu salud. Inmunosalud te recompensa por cuidarte.
                </Typography>
            </Box>
        </Container>
    );
}
