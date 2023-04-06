import * as React from 'react'
// ** MUI Imports
import { TextField, Grid, Typography } from '@mui/material'

const StyledGrid = { display: "flex", flexDirection: "column" }
 
const ListProperties = ({values, handleChangeProperties}) => {
  return (
    <React.Fragment>
    <Grid item xs={12} sm={6} style={StyledGrid}>
      <Typography variant='h6'>Vías Respiratorias</Typography>
      <TextField 
        value={values.viasRespiratorias}
        onChange={handleChangeProperties('viasRespiratorias')}
        label='Valor'
        type='number'
        fullWidth
      />
      </Grid>
      
    <Grid item xs={12} sm={6} style={StyledGrid}>
      <Typography variant='h6'>Activación Mental</Typography>
      <TextField 
        value={values.activacionMental}
        onChange={handleChangeProperties('activacionMental')}
        label='Valor'
      type='number' 
      fullWidth
      />
     </Grid>
     <Grid item xs={12} sm={6} style={StyledGrid}>
    
      <Typography variant='h6'>Regeneración Muscular</Typography>
      <TextField 
          value={values.generacionMuscular}
          onChange={handleChangeProperties('generacionMuscular')}
          label='Valor'
          type='number' 
        />

     </Grid>
     <Grid item xs={12} sm={6} style={StyledGrid}>
    
        <Typography variant='h6'>Salud Hormonal</Typography>
        <TextField 
            value={values.saludHormonal}
            onChange={handleChangeProperties('saludHormonal')}
            type='number' 
            label='Valor'
          />
     </Grid>
     <Grid item xs={12} sm={6} style={StyledGrid}>
    
        <Typography variant='h6'>Piel, Cabello y Uñas</Typography>
        <TextField 
            value={values.pielCabelloUñas}
            onChange={handleChangeProperties('pielCabelloUñas')}
            label='Valor'
            type='number' 
          />

     </Grid>
     <Grid item xs={12} sm={6} style={StyledGrid}>
    
        <Typography variant='h6'>Digestion</Typography>
        <TextField 
            value={values.digestion}
            onChange={handleChangeProperties('digestion')}
            label='Valor'
            type='number' 
          />
     </Grid>
     <Grid item xs={12} sm={6} style={StyledGrid}>
    
         <Typography variant='h6'>Relajación</Typography>
        <TextField 
            value={values.relajación}
            onChange={handleChangeProperties('relajación')}
            label='Valor'
            type='number' 
          />
     </Grid>
     <Grid item xs={12} sm={6} style={StyledGrid}>
    
        <Typography variant='h6'>Sistema Óseo</Typography>
        <TextField 
          value={values.sistemaOseo}
          onChange={handleChangeProperties('sistemaOseo')}
            label='Valor'
            type='number' 
          />
     </Grid>
     <Grid item xs={12} sm={6} style={StyledGrid}>
    
        <Typography variant='h6'>Sistema Inmune</Typography>
        <TextField
            value={values.sistemaInmune} 
            onChange={handleChangeProperties('sistemaInmune')}
            label='Valor'
            type='number' 
          />
     </Grid>
      <Grid item xs={12} sm={6} style={StyledGrid}>
        <Typography variant='h6'>Circulacion Arterial</Typography>
        <TextField 
            value={values.circulaciónArterial}
            onChange={handleChangeProperties('circulaciónArterial')}
            label='Valor'
            type='number' 
          />
     </Grid>
     </React.Fragment>
  )
}

export default ListProperties
