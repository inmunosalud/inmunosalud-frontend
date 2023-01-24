import * as React from 'react'
// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import { TextField, Grid } from '@mui/material'

const StyledList = styled(List)(({ theme }) => ({
  '& .MuiListItem-container': {
    border: `1px solid {theme.palette.divider}`,
    '&:first-of-type': {
      borderTopLeftRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius
    },
    '&:last-child': {
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius
    },
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '& .MuiListItem-root': {
      paddingRight: theme.spacing(24)
    },
    '& .MuiListItemText-root': {
      marginTop: 0,
      '& .MuiTypography-root': {
        fontWeight: 500
      }
    }
  }
}))

const ListProperties = ({values, handleChangeProperties}) => {
  return (
    <>
    <Grid item xs={12} sm={6}>
    <StyledList disablePadding>
      <ListItem>
        <div>
          <ListItemText primary="Vías Respiratorias"/>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          </Box>
        </div>
        <ListItemSecondaryAction>
          <TextField 
            value={values.viasRespiratorias}
            onChange={handleChangeProperties('viasRespiratorias')}
            label='Valor'
            type='number' 
          />
        </ListItemSecondaryAction>
      </ListItem>
     
      </StyledList>
     </Grid>
     <Grid item xs={12} sm={6}>
    <StyledList disablePadding>
      <ListItem>
        <div>
          <ListItemText primary="Activación Mental"/>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          </Box>
        </div>
        <ListItemSecondaryAction>
          <TextField 
            value={values.activacionMental}
            onChange={handleChangeProperties('activacionMental')}
            label='Valor'
            type='number' 
          />
        </ListItemSecondaryAction>
      </ListItem>
     
      </StyledList>
     </Grid>
     <Grid item xs={12} sm={6}>
    <StyledList disablePadding>
      <ListItem>
        <div>
          <ListItemText primary="Regeneración Muscular"/>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          </Box>
        </div>
        <ListItemSecondaryAction>
          <TextField 
            value={values.generacionMuscular}
            onChange={handleChangeProperties('generacionMuscular')}
            label='Valor'
            type='number' 
          />
        </ListItemSecondaryAction>
      </ListItem>
     
      </StyledList>
     </Grid>
     <Grid item xs={12} sm={6}>
    <StyledList disablePadding>
      <ListItem>
        <div>
          <ListItemText primary="Salud Hormonal"/>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          </Box>
        </div>
        <ListItemSecondaryAction>
          <TextField 
            value={values.saludHormonal}
            onChange={handleChangeProperties('saludHormonal')}
            type='number' 
          />
        </ListItemSecondaryAction>
      </ListItem>
     
      </StyledList>
     </Grid>
     <Grid item xs={12} sm={6}>
    <StyledList disablePadding>
      <ListItem>
        <div>
          <ListItemText primary="Piel, Cabello y Uñas"/>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          </Box>
        </div>
        <ListItemSecondaryAction>
          <TextField 
            value={values.pielCabelloUñas}
            onChange={handleChangeProperties('pielCabelloUñas')}
            label='Valor'
            type='number' 
          />
        </ListItemSecondaryAction>
      </ListItem>
     
      </StyledList>
     </Grid>
     <Grid item xs={12} sm={6}>
    <StyledList disablePadding>
      <ListItem>
        <div>
          <ListItemText primary="Digestion"/>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          </Box>
        </div>
        <ListItemSecondaryAction>
          <TextField 
            value={values.digestion}
            onChange={handleChangeProperties('digestion')}
            label='Valor'
            type='number' 
          />
        </ListItemSecondaryAction>
      </ListItem>
     
      </StyledList>
     </Grid>
     <Grid item xs={12} sm={6}>
    <StyledList disablePadding>
      <ListItem>
        <div>
          <ListItemText primary="Relajación"/>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          </Box>
        </div>
        <ListItemSecondaryAction>
          <TextField 
            value={values.relajación}
            onChange={handleChangeProperties('relajación')}
            label='Valor'
            type='number' 
          />
        </ListItemSecondaryAction>
      </ListItem>
     
      </StyledList>
     </Grid>
     <Grid item xs={12} sm={6}>
    <StyledList disablePadding>
      <ListItem>
        <div>
          <ListItemText primary="Sistema Óseo"/>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          </Box>
        </div>
        <ListItemSecondaryAction>
          <TextField 
          value={values.sistemaOseo}
          onChange={handleChangeProperties('sistemaOseo')}
            label='Valor'
            type='number' 
          />
        </ListItemSecondaryAction>
      </ListItem>
     
      </StyledList>
     </Grid>
     <Grid item xs={12} sm={6}>
    <StyledList disablePadding>
      <ListItem>
        <div>
          <ListItemText primary="Sistema Inmune"/>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          </Box>
        </div>
        <ListItemSecondaryAction>
          <TextField
            value={values.sistemaInmune} 
            onChange={handleChangeProperties('sistemaInmune')}
            label='Valor'
            type='number' 
          />
        </ListItemSecondaryAction>
      </ListItem>
     
      </StyledList>
     </Grid>
     <Grid item xs={12} sm={6}>
    <StyledList disablePadding>
      <ListItem>
        <div>
          <ListItemText primary="Circulacion Arterial"/>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          </Box>
        </div>
        <ListItemSecondaryAction>
          <TextField 
            value={values.circulaciónArterial}
            onChange={handleChangeProperties('circulaciónArterial')}
            label='Valor'
            type='number' 
          />
        </ListItemSecondaryAction>
      </ListItem>
     
      </StyledList>
     </Grid>
     </>
  )
}

export default ListProperties
