import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useForm, Controller } from "react-hook-form";
import {
  CardContent,
  Card,
  CardHeader, 
  CardActions,
  Grid,
  TextField,
  Divider,
  Select,
  MenuItem,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Box,
  Chip,
  InputAdornment
} from '@mui/material'
import CustomSnackbar from 'src/views/components/snackbar/CustomSnackbar'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import ListProperties from '../components/propertiesProduct';
//import utils fns
import { getCustomStructure } from 'src/utils/functions';
import { createProduct, setRemoveEdit, updateProduct } from 'src/store/products';
import { parseDataToEdit } from 'src/utils/functions';
import { closeSnackBar } from 'src/store/notifications'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const ingredients = [
  "Aceite de coco extra virgen",
  "Oxido de zinc",
  "Oxido de magnesio",
  "Vitamina D3 (colecalciferol)",
  "Vitaminas K2 (menaquinona)",
  "Grenetina",
  "Agua purificada",
  "Glicerina",
  "Dióxido de titanio"
]

/* edit form */
const AddProduct = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const { editItem } = useSelector(state => state.products)
  const { open, message, severity } = useSelector(state => state.notifications)
  
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      product: '',
      capsuleActiveMg: '',
      description: '',
      capsuleQuantity: '',
      capsuleConcentration: '',
      mainComponent: '',
      instructions: '',
      price: '',
      quantity: '',
   }
  });
  /* images state */
  const [images, setImages] = React.useState({ link1: null, link2: null })
  /* ingredients state */
  const [ingredientsState, setIngredientsState] = React.useState([])
  /* properties */
  const [values, setValues] = React.useState({
    viasRespiratorias: '',
    activacionMental: '',
    generacionMuscular: '',
    saludHormonal: '',
    pielCabelloUñas: '',
    digestion: '',
    relajación: '',
    sistemaOseo: '',
    sistemaInmune: '',
    circulaciónArterial: '',
  })
  const onSubmit = (data) => {
    const newProperties = getCustomStructure(values);

    const body = {
      product: data?.product ,
      capsuleActiveMg: data?.capsuleActiveMg,
      description: data?.description,
      capsuleQuantity: data?.capsuleQuantity,
      capsuleConcentration: data?.capsuleConcentration,
      mainComponent: data?.mainComponent,
      instructions: data?.instructions,
      price: data?.price,
      quantity: 1,
      properties: newProperties,
      ingredients: ingredientsState,
      urlImages: setLinks()
    }
     dispatch(createProduct(body))
  };

  const onSubmitUpdate = (data) => {
    const newProperties = getCustomStructure(values);

    const body = {
      product: data?.product ,
      capsuleActiveMg: data?.capsuleActiveMg,
      description: data?.description,
      capsuleQuantity: data?.capsuleQuantity,
      capsuleConcentration: data?.capsuleConcentration,
      mainComponent: data?.mainComponent,
      instructions: data?.instructions,
      price: data?.price,
      quantity: 1,
      properties: newProperties,
      ingredients: ingredientsState,
      urlImages: setLinks(),
      id: editItem?.id
    } 

    dispatch(updateProduct(body))
  } 

  const setLinks = () => {
    return Object.values(images)
  }
  
  const handleChangeLinks = (prop) => (event) => {
    setImages({
      ...images,
      [prop]: event.target.value
    })
  }

  const handleChangeIngredients = (event) => {
    const {
      target: { value },
    } = event;
    setIngredientsState(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handlePropertiesList = (prop) => (event) => {
    const newValue = event.target.value;
    if (newValue >= 0 && newValue <= 10) {
      setValues((prevValues) => ({ ...prevValues, [prop]: newValue }));
    }
  }
  
  React.useEffect(() => {
    return () => {
      setIngredientsState([])
      dispatch(setRemoveEdit())//cleaning edit values
     }
  }, [dispatch])

   React.useEffect(() => {
    if (editItem) {
      reset({
        product: editItem.product,
        capsuleActiveMg: editItem.capsuleActiveMg,
        description: editItem.description,
        capsuleQuantity: editItem.capsuleQuantity,
        capsuleConcentration: editItem.capsuleConcentration,
        mainComponent: editItem.mainComponent,
        instructions: editItem.instructions,
        price: editItem.price,
        quantity: 1,
      })

      setIngredientsState(editItem.ingredients)
      const defaultProperties = parseDataToEdit(editItem.properties)
      setValues(defaultProperties)
      setImages({
        link1: editItem.urlImages[0],
        link2: editItem.urlImages[1],
      })
    }
   }, [editItem])
  
  return (
    <>
    <Card sx={{ margin: '40px 100px'  }}>
      <CardHeader title={`${editItem ? 'Editar' : 'Agregar'} Producto`} titleTypographyProps={{ variant: 'h6' }} />
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <form onSubmit={handleSubmit(Boolean(editItem) ? onSubmitUpdate : onSubmit)} >
      <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="product"
                rules={{ required: true }}
                render={({
                  field,
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <TextField
                    error={!!errors.product}
                    label='Producto'
                    fullWidth
                    {...field}
                  />
                )}
              />
              
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name='capsuleActiveMg'
                rules={{ required: true }}
                render={({
                  field,
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <TextField
                    error={!!errors.capsuleActiveMg}
                    label='Mg Activos en Cápsula'
                    fullWidth 
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="description"
                rules={{ required: true }}
                render={({
                  field,
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <TextField
                    error={!!errors.description}
                    label='Description'
                    fullWidth
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="capsuleQuantity"
                rules={{ required: true }}
                render={({
                  field,
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <TextField
                    error={!!errors.capsuleQuantity}
                    label='Cantidad de Capsulas'
                    fullWidth
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="capsuleConcentration"
                rules={{ required: true }}
                render={({
                  field,
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <TextField
                    error={!!errors.capsuleConcentration}
                    label='Concentracion de Capsulas'
                    fullWidth
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="mainComponent"
                rules={{ required: true }}
                render={({
                  field,
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <TextField
                    error={!!errors.mainComponent}
                    label='Componente principal'
                    fullWidth
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="instructions"
                rules={{ required: true }}
                render={({
                  field,
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <TextField
                    error={!!errors.instructions}
                    label='Instrucciones'
                    fullWidth
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="price"
                rules={{ required: true }}
                render={({ field, formState }) => {
                  const { value } = field;
                  if (value >= 0) {
                    return (
                      <TextField
                        label="Precio"
                        fullWidth
                        type="number"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        {...field}
                      />
                    );
                  } else {
                    return (
                      <TextField
                        label="Precio"
                        fullWidth
                        type="number"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        {...field}
                        error
                      />
                    );
                  }
                }}
              />
            </Grid>   
            
            <Grid item xs={12} >
            <FormControl fullWidth>
              <InputLabel id='form-layouts-separator-select-label'>Ingredientes</InputLabel>
                <Select
                  value={ingredientsState}
                  onChange={(e) => handleChangeIngredients(e)}
                  multiple
                  label='Ingredientes'
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                  >
                  {ingredients.map((item, i) => (
                    <MenuItem key={i} value={item}>{item}</MenuItem>
                  )) }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} >
              <Typography sx={{margin: 'auto 0px'}} variant='h6'>Propiedades</Typography>
            </Grid>
            <ListProperties
              values={values}
              handleChangeProperties={handlePropertiesList}
            />
            <Grid item xs={12} sm={6}>
              <TextField
                focused={images.link2 ? true : false}
                label='Foto del producto'
                value={images.link1}
                id='input-link'
                name='link1'
                fullWidth
                type='text'
                onChange={handleChangeLinks('link1')}
              />
          </Grid>   
          <Grid item xs={12} sm={6}>
              <TextField
                focused={images.link2 ? true : false}
                label='Foto del producto'
                value={images.link2}
                id='input-link'
                fullWidth
                name='link2'
                type='text'
                onChange={handleChangeLinks('link2')}
            />
              </Grid>
          </Grid> 
      </CardContent>
      <Grid item xs={12}>
        <Divider sx={{ mb: 2 }} />
      </Grid>
      <CardActions>
        <Button size='large' type='submit' sx={{ m: 0 }} variant='contained'>
          Enviar
        </Button>
          <Button onClick={() => router.push('/ecommerce/products')} size='large' color='secondary' variant='outlined'>
          Regresar
        </Button>
        </CardActions>
      </form>
    </Card>
    <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
    </>
  )
}
AddProduct.getLayout = page => <BlankLayout>{page}</BlankLayout>
AddProduct.guestGuard = true
export default AddProduct