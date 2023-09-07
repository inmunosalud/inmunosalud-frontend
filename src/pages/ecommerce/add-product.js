import {
  Button,
  Card,
  InputLabel,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  FormHelperText,
  Typography
} from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { closeSnackBar, openSnackBar } from 'src/store/notifications'
import { createProduct, setRemoveEdit, updateProduct, uploadProductImages } from 'src/store/products'
import { setShowConfirmModal } from 'src/store/users'
import { getCustomStructure, getCustomStructureMainComponents, parseDataToEdit } from 'src/utils/functions'
import DialogForm from 'src/views/components/dialogs/DialogForm'
import ImageUploader from 'src/views/components/image-uploader/ImageUploader'
import CustomSnackbar from 'src/views/components/snackbar/CustomSnackbar'
import MultiSelectWithAddOption from '../components/multiselectWithAddOption'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const Modal = ({ open = false, onHandleOpenModal = () => {}, onSubmitConfirm = () => {}, isEditItem = false }) => {
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogContentText>Presione confirmar para {isEditItem ? 'editar' : 'crear'} el producto.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onHandleOpenModal}>Salir</Button>
        <Button onClick={onSubmitConfirm}>{isEditItem ? 'Editar producto' : 'Crear producto'}</Button>
      </DialogActions>
    </Dialog>
  )
}

const AddProduct = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { editItem, mainComponents } = useSelector(state => state.products)
  const { open, message, severity } = useSelector(state => state.notifications)
  const { showConfirmModal } = useSelector(state => state.users)
  const [authPassword, setAuthPassword] = React.useState('')
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      product: '',
      capsuleQuantity: '',
      capsuleConcentration: '',
      instructions: '',
      ingredients: '',
      price: '',
      quantity: ''
    }
  })

  /* images state */
  const [images, setImages] = React.useState([])

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
    circulaciónArterial: ''
  })
  /* fields of main components property - value form */
  const [fields, setFields] = React.useState([])
  const [formBody, setFormBody] = React.useState({})
  const [mainComponentValue, setMainComponentValue] = React.useState([])
  /* the new option for select */
  const [newOption, setNewOption] = React.useState('')
  const [openModal, setOpenModal] = React.useState(false)
  const [editorHtml, setEditorHtml] = React.useState('') // Estado para almacenar el contenido enriquecido
  const [isDescriptionEmpty, setIsDescriptionEmpty] = React.useState(true)

  // Maneja cambios en el editor de texto enriquecido
  const handleEditorChange = (content, delta, source, editor) => {
    const isEmpty = !content.trim() // Verifica si el contenido está vacío
    setIsDescriptionEmpty(isEmpty)
    setEditorHtml(content) // Actualiza el estado con el contenido enriquecido
  }

  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }

  const submitConfirm = () => {
    handleOpenModal()
    dispatch(setShowConfirmModal(false))
    dispatch(
      !Boolean(editItem)
        ? createProduct({ body: formBody, headers: { password: authPassword } })
        : updateProduct({ body: formBody, headers: { password: authPassword } })
    )
  }

  /* main component handle on change select */
  const handleOptionChange = ({ target }) => {
    const selectedValues = target.value
    let newFields = []

    // Map through the selected values and create a new field object for each one
    selectedValues.forEach(value => {
      newFields.push({
        property: value.value,
        value: ''
      })
    })

    // Update state with the new fields and selected values
    setFields(newFields)
    setMainComponentValue(selectedValues)
  }

  const handleNewOptionChange = event => {
    setNewOption(event.target.value)
  }

  const handleFieldChange = (index, field, value) => {
    const newFields = [...fields]
    newFields[index][field] = value
    setFields(newFields)
  }

  const handleAddOption = () => {
    // Check if the new option is already in the options list
    const existingOption = mainComponents.find(option => option.value === newOption)

    if (existingOption) {
      // If the new option already exists, set it as the selected option
      setMainComponentValue([...mainComponentValue, existingOption])
    } else {
      // If the new option doesn't exist, add it to the options list and set it as the selected option
      const newOptionObject = { value: newOption }
      setMainComponentValue([...mainComponentValue, newOptionObject])
    }

    // Update the last input field's property with the new option
    setFields(prevFields => [...prevFields, { property: newOption.trim(), value: '' }])

    // Clear the new option text field
    setNewOption('')
  }

  const handleCleanOptions = () => {
    setMainComponentValue([])
    setFields([])
  }

  const handleImagesUpdate = images => {
    setImages(images)
  }

  const handlePropertiesList = prop => event => {
    const newValue = event.target.value
    if (newValue >= 0 && newValue <= 10) {
      setValues(prevValues => ({ ...prevValues, [prop]: newValue }))
    }
  }

  const handleImagesUpload = async productName => {
    const body = {
      productName: productName,
      images: images
    }
    return dispatch(uploadProductImages(body))
  }

  const handleKeyDownInt = event => {
    const keyCode = event.keyCode || event.which
    const keyValue = String.fromCharCode(keyCode)

    if (!/^[0-9]+$/.test(keyValue) && keyCode !== 8 && keyCode !== 46) {
      event.preventDefault()
    }
  }

  const handleInputFloat = event => {
    const { value } = event.target

    if (!/^\d*\.?\d*$/.test(value)) {
      event.target.value = value.slice(0, -1)
    } else if (value === '.') {
      event.target.value = '0.'
    } else if (value.includes('.') && value.split('.')[1].length > 3) {
      event.target.value = parseFloat(value).toFixed(3)
    }
  }

  const onSubmit = (data, event) => {
    event.preventDefault()
    console.log('setIsDescriptionEmpty', isDescriptionEmpty)
    if (isDescriptionEmpty === true) {
      return
    }
    if (images.length === 0) {
      dispatch(
        openSnackBar({ open: true, message: 'Debes agregar al menos una imagen del producto', severity: 'error' })
      )
      return
    }
    handleImagesUpload(data.product).then(productImages => {
      const newProperties = getCustomStructure(values)
      const body = {
        product: data?.product,
        description: editorHtml,
        capsuleQuantity: data?.capsuleQuantity,
        capsuleConcentration: data?.capsuleConcentration,
        mainComponents: fields,
        instructions: data?.instructions,
        price: data?.price,
        ingredients: data?.ingredients,
        quantity: data?.quantity,
        properties: newProperties,
        urlImages: productImages.payload,
        id: editItem?.id ?? ''
      }
      if (productImages.payload === 'error') {
        return
      }
      setFormBody(body)
      handleOpenModal()
    })
  }

  React.useEffect(() => {
    return () => {
      dispatch(setRemoveEdit()) //cleaning edit values
    }
  }, [dispatch])

  React.useEffect(() => {
    if (editItem) {
      reset({
        product: editItem.product,
        capsuleQuantity: editItem.capsuleQuantity,
        capsuleConcentration: editItem.capsuleConcentration,
        mainComponents: editItem.mainComponent,
        instructions: editItem.instructions,
        price: editItem.price,
        ingredients: editItem.ingredients,
        quantity: 1
      })
      setEditorHtml(editItem.description)
      const defaultProperties = parseDataToEdit(editItem.properties)
      setValues(defaultProperties)
      setImages(editItem.urlImages)
      setFields(editItem?.mainComponents)
      const defaultMainComponents = getCustomStructureMainComponents(editItem?.mainComponents)
      setMainComponentValue(defaultMainComponents)
    }
  }, [editItem])

  return (
    <>
      <Card sx={{ margin: '40px 20px' }}>
        <CardHeader title={`${editItem ? 'Editar' : 'Agregar'} Producto`} titleTypographyProps={{ variant: 'h6' }} />
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  name='product'
                  rules={{ required: true }}
                  render={({ field, fieldState }) => (
                    <TextField error={!!errors.product} label='Producto' fullWidth {...field} />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  name='price'
                  rules={{ required: true }}
                  render={({ field, formState }) => {
                    const { value } = field
                    return (
                      <TextField
                        label='Precio'
                        fullWidth
                        error={!!errors.price}
                        {...field}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <Typography variant='subtitle2' color='textSecondary'>
                                $
                              </Typography>
                            </InputAdornment>
                          )
                        }}
                        onInput={handleInputFloat}
                      />
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  control={control}
                  name='capsuleQuantity'
                  rules={{ required: true }}
                  render={({ field, fieldState }) => (
                    <TextField
                      error={!!errors.capsuleQuantity}
                      label='Cantidad de Cápsulas'
                      fullWidth
                      {...field}
                      type='text'
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <Typography variant='subtitle2' color='textSecondary'>
                              cápsulas
                            </Typography>
                          </InputAdornment>
                        )
                      }}
                      onKeyDown={handleKeyDownInt}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  control={control}
                  name='capsuleConcentration'
                  rules={{ required: true }}
                  render={({ field, fieldState }) => (
                    <TextField
                      error={!!errors.capsuleConcentration}
                      label='Concentración de Cápsulas'
                      fullWidth
                      {...field}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <Typography variant='subtitle2' color='textSecondary'>
                              mg en cada cápsula
                            </Typography>
                          </InputAdornment>
                        )
                      }}
                      onInput={handleInputFloat}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  control={control}
                  name='quantity'
                  rules={{ required: true }}
                  render={({ field, fieldState }) => (
                    <TextField
                      error={!!errors.capsuleQuantity}
                      label='Cantidad en almacén'
                      fullWidth
                      {...field}
                      type='text'
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <Typography variant='subtitle2' color='textSecondary'>
                              en almacén
                            </Typography>
                          </InputAdornment>
                        )
                      }}
                      onKeyDown={handleKeyDownInt}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  name='instructions'
                  rules={{ required: true }}
                  render={({ field, fieldState }) => (
                    <TextField error={!!errors.instructions} label='Instrucciones' fullWidth {...field} />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  name='ingredients'
                  rules={{ required: true }}
                  render={({ field, fieldState }) => (
                    <TextField error={!!errors.ingredients} label='Ingredientes' fullWidth {...field} />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Grid item xs={12} sm={6}>
                  <div>
                    <InputLabel id='signature-label' sx={{ mb: 2 }}>
                      Descripcion del producto:
                    </InputLabel>
                    <ReactQuill
                      value={editorHtml}
                      onChange={handleEditorChange}
                      modules={{
                        toolbar: [['link']]
                      }}
                      style={{ height: '200px' }} // Establece una altura fija
                    />
                  </div>
                  {isDescriptionEmpty && (
                    <FormHelperText sx={{ color: 'error.main', mt: '50px' }} id='stepper-linear-description'>
                      La descripción es requerida
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sx={{ marginTop: '50px' }}>
                  {/* create here dropdown dynammic */}
                  <MultiSelectWithAddOption
                    //handle select
                    options={mainComponents.map((option, index) => ({
                      label: option,
                      value: option,
                      fieldIndex: index
                    }))}
                    onOptionChange={handleOptionChange}
                    value={mainComponentValue}
                    //handle text
                    newOption={newOption}
                    onHandleNewOptionChange={handleNewOptionChange}
                    onHandleAddOption={handleAddOption}
                    onCleanOptions={handleCleanOptions}
                  />
                </Grid>
                {/* main components fields */}
                <Typography sx={{ margin: '8px 0px' }} variant='h6'>
                  Componentes principales
                </Typography>
                {fields.map((field, index) => {
                  return (
                    <Grid container item xs={12} spacing={5} key={index}>
                      <Grid item xs={6} sx={{ marginTop: '10px' }}>
                        <TextField
                          label='Componente Principal'
                          variant='outlined'
                          value={field.property}
                          error={field.property == ''}
                          fullWidth
                          onChange={e => handleFieldChange(index, 'property', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={6} sx={{ marginTop: '10px' }}>
                        <TextField
                          label='Valor'
                          variant='outlined'
                          value={field.value}
                          error={field.value == ''}
                          fullWidth
                          onChange={e => handleFieldChange(index, 'value', e.target.value)}
                          type='text'
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                <Typography variant='subtitle2' color='textSecondary'>
                                  mg en cada cápsula
                                </Typography>
                              </InputAdornment>
                            )
                          }}
                          onInput={handleInputFloat}
                        />
                      </Grid>
                    </Grid>
                  )
                })}
                <Grid item sx={{ marginTop: '10px' }}></Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ margin: 'auto 0px' }} variant='h5'>
                  Imágenes Del Producto
                </Typography>
                <ImageUploader base64Images={editItem ? editItem.urlImages : []} handleImages={handleImagesUpdate} />
              </Grid>
            </Grid>
          </CardContent>
          <Grid item xs={12}>
            <Divider sx={{ mb: 2 }} />
          </Grid>
          <CardActions>
            <Button size='large' type='submit' sx={{ m: 0 }} variant='contained'>
              {editItem ? 'Guardar Cambios' : 'Crear Producto'}
            </Button>
            <Button
              onClick={() => router.push('/ecommerce/products')}
              size='large'
              color='secondary'
              variant='outlined'
            >
              Regresar
            </Button>
          </CardActions>
        </form>
      </Card>
      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
      <Modal
        open={openModal}
        onHandleOpenModal={handleOpenModal}
        onSubmitConfirm={() => dispatch(setShowConfirmModal(true))}
        isEditItem={Boolean(editItem)}
      />
      <DialogForm
        text={'Ingrese su contraseña para continuar'}
        open={showConfirmModal}
        handleClose={() => dispatch(setShowConfirmModal(false))}
        onClick={submitConfirm}
        setAuthPass={setAuthPassword}
      ></DialogForm>
    </>
  )
}
AddProduct.getLayout = page => <BlankLayout>{page}</BlankLayout>
AddProduct.guestGuard = true
export default AddProduct
