import {
  CardHeader,
  Container,
  Divider,
  Grid,
  Card,
  CardContent,
  TextField,
  Typography,
  Box,
  Select,
  Button
} from '@mui/material'

const Constants = () => {
  return (
    <>
      <Card>
        <CardHeader title={'Editar constantes del sistema'} titleTypographyProps={{ variant: 'h6' }} />
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField label='Dia de corte' fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label='IVA' fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label='Costo de envio' fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label='Compra mínima' fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6'>Porcentaje de comisión</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField label='B' fullWidth />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField label='C' fullWidth />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField label='D' fullWidth />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField label='E' fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6'>Paquete de socios</Typography>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <TextField label='Producto' type='select'>
                  <option>Producto 1</option>
                </TextField>
                <Button>Eliminar</Button>
              </Box>
              <Button>Agregar producto</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default Constants
