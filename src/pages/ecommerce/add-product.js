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
  Typography,
  CircularProgress,
  Box,
  FormLabel,
  Checkbox
} from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { closeSnackBar, openSnackBar } from 'src/store/notifications'
import { createProduct, setRemoveEdit, updateProduct, uploadProductImages, getProductById } from 'src/store/products'
import { setShowConfirmModal } from 'src/store/users'
import { getCustomStructureMainComponents, parseDataToEdit } from 'src/utils/functions'
import DialogForm from 'src/views/components/dialogs/DialogForm'
import ImageUploader from 'src/views/components/form/ImageUploader'
import RichTextEditor from 'src/views/components/form/RichTextEditor'
import MultiSelectWithAddOption from '../components/multiselectWithAddOption'
import { Plus } from 'mdi-material-ui'
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
  const { editItem, isLoading, currentProduct } = useSelector(state => state.products)
  const { showConfirmModal } = useSelector(state => state.users)
  const [authPassword, setAuthPassword] = React.useState('')
  const {
    control,
    reset,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        product: yup.string().trim().required('El campo es requerido'),
        stock: yup.string().trim().required('El campo es requerido'),
        isForAffiliated: yup.boolean(),
        content: yup.string().trim().required('El campo es requerido'),
        ingredients: yup.string().trim().required('El campo es requerido'),
        price: yup.string().trim().required('El campo es requerido'),
        affiliatedPrice: yup.string().trim().required('El campo es requerido'),
        description: yup.string().trim().required('El campo es requerido'),
        images: yup
          .array()
          .of(yup.string())
          .min(1, 'Debes subir al menos una imagen')
          .required('Las imágenes son requeridas'),
        benefits: yup
          .array()
          .of(
            yup.object().shape({
              title: yup.string().trim().required('El beneficio es requerido'),
              detail: yup.string().trim().required('El detalle del beneficio es requerido')
            })
          )
          .min(1, 'Debes agregar al menos un beneficio'),
        studies: yup
          .array()
          .of(
            yup.object().shape({
              title: yup.string().trim().required('El título es requerido'),
              pageName: yup.string().trim().required('El nombre de la página es requerido'),
              url: yup.string().trim().url('Debe ser una URL válida').required('La URL es requerida')
            })
          )
          .min(1, 'Debes agregar al menos un estudio')
      })
    ),
    defaultValues: {
      product: '',
      stock: '',
      isForAffiliated: false,
      content: '',
      ingredients: '',
      price: '',
      affiliatedPrice: '',
      description: '',
      benefits: [{ title: '', detail: '' }],
      studies: [{ title: '', pageName: '', url: '' }]
    }
  })
  const benefits = watch('benefits')
  const studies = watch('studies')
  /* benefits of main components property - value form */
  const [formBody, setFormBody] = React.useState({})
  /* the new option for select */
  const [openModal, setOpenModal] = React.useState(false)

  // Maneja cambios en el editor de texto enriquecido

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

  const handleAddBenefit = () => {
    const currentBenefits = benefits
    setValue('benefits', [...currentBenefits, { title: '', detail: '' }])
  }

  const handleImagesUpload = async (productName, images) => {
    const body = {
      productName: productName,
      images: images
    }
    return dispatch(uploadProductImages(body))
  }

  const handleKeyDownInt = event => {
    const keyCode = event.keyCode || event.which
    const keyValue = String.fromCharCode(keyCode)

    if (!/^[0-9]+$/.test(keyValue) && keyCode !== 8 && keyCode !== 46 && keyCode !== 9) {
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
    handleImagesUpload(data.product, data.images).then(productImages => {
      const body = {
        product: data.product,
        urlImages: productImages.payload,
        ingredients: data.ingredients,
        content: data.content,
        price: parseFloat(data.price),
        affiliatedPrice: parseFloat(data.affiliatedPrice),
        stock: parseInt(data.stock),
        isForAffiliated: data.isForAffiliated,
        description: data.description,
        benefits: data.benefits.map(benefit => ({ title: benefit.title, detail: benefit.detail })),
        studies: data.studies.map(study => ({ title: study.title, pageName: study.pageName, url: study.url })),
        id: editItem?.id ?? ''
      }
      if (productImages.payload === 'error') {
        return
      }
      setFormBody(body)
      handleOpenModal()
    })
  }

  useEffect(() => {
    if (editItem) {
      dispatch(getProductById(editItem.id))
    }
  }, [dispatch, editItem])

  React.useEffect(() => {
    const handleRouteChange = url => {
      if (url !== '/ecommerce/add-products') {
        dispatch(setRemoveEdit())
      }
    }

    router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [dispatch, router.events])

  React.useEffect(() => {
    if (editItem && currentProduct) {
      reset({
        product: currentProduct.product,
        stock: currentProduct.stock,
        isForAffiliated: currentProduct.isForAffiliated,
        content: currentProduct.content,
        benefits: currentProduct.benefits,
        studies: currentProduct.studies,
        price: currentProduct.price,
        affiliatedPrice: currentProduct.affiliatedPrice,
        ingredients: currentProduct.ingredients,
        description: currentProduct.description,
        urlImages: currentProduct.urlImages
      })
    }
  }, [currentProduct])

  const handleDeleteBenefit = index => {
    const currentBenefits = benefits
    if (currentBenefits.length > 1) {
      const newBenefits = currentBenefits.filter((_, i) => i !== index)
      setValue('benefits', newBenefits)
    }
  }

  const handleAddStudy = () => {
    const currentStudies = studies
    setValue('studies', [...currentStudies, { title: '', pageName: '', url: '' }])
  }

  const handleDeleteStudy = index => {
    const currentStudies = studies
    if (currentStudies.length > 1) {
      const newStudies = currentStudies.filter((_, i) => i !== index)
      setValue('studies', newStudies)
    }
  }

  return isLoading ? (
    <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px' }}>
      <CircularProgress />
    </Box>
  ) : (
    <>
      <Card sx={{ margin: '40px 20px' }}>
        <CardHeader title={`${editItem ? 'Editar' : 'Agregar'} Producto`} titleTypographyProps={{ variant: 'h6' }} />
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} md={6}>
                <Grid container spacing={5}>
                  <Grid item xs={12} md={5}>
                    <Controller
                      control={control}
                      name='product'
                      rules={{ required: true }}
                      render={({ field, fieldState }) => (
                        <TextField
                          error={!!errors.product}
                          helperText={errors.product?.message}
                          label='Producto'
                          fullWidth
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Controller
                      control={control}
                      name='stock'
                      rules={{ required: true }}
                      render={({ field, fieldState }) => (
                        <TextField
                          error={!!errors.stock}
                          helperText={errors.stock?.message}
                          label='Cantidad en almacén'
                          fullWidth
                          {...field}
                          type='text'
                          onKeyDown={handleKeyDownInt}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Controller
                      name='isForAffiliated'
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <Checkbox
                          {...field}
                          checked={field.value}
                          onChange={event => field.onChange(event.target.checked)}
                        />
                      )}
                    />
                    <FormLabel>Exclusivo de afiliados</FormLabel>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Controller
                      control={control}
                      name='price'
                      rules={{ required: true }}
                      render={({ field, formState }) => {
                        const { value } = field
                        return (
                          <TextField
                            label='Precio General'
                            fullWidth
                            error={!!errors.price}
                            helperText={errors.price?.message}
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
                  <Grid item xs={12} md={6}>
                    <Controller
                      control={control}
                      name='affiliatedPrice'
                      rules={{ required: true }}
                      render={({ field, formState }) => {
                        const { value } = field
                        return (
                          <TextField
                            label='Precio para afiliados'
                            fullWidth
                            error={!!errors.affiliatedPrice}
                            helperText={errors.affiliatedPrice?.message}
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
                  <Grid item xs={12} md={12}>
                    <Controller
                      control={control}
                      name='content'
                      rules={{ required: true }}
                      render={({ field, fieldState }) => (
                        <TextField
                          error={!!errors.content}
                          label='Contenido'
                          fullWidth
                          helperText={errors.content?.message}
                          {...field}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <Controller
                      control={control}
                      name='ingredients'
                      rules={{ required: true }}
                      render={({ field, fieldState }) => (
                        <TextField
                          error={!!errors.ingredients}
                          helperText={errors.ingredients?.message}
                          label='Ingredientes activos'
                          multiline
                          maxRows={3}
                          fullWidth
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <InputLabel
                      id='signature-label'
                      sx={{
                        mb: 2,
                        color: errors.description ? 'error.main' : 'text.primary'
                      }}
                    >
                      Descripcion del producto
                    </InputLabel>
                    <Controller
                      control={control}
                      name='description'
                      rules={{ required: true }}
                      render={({ field, fieldState }) => <RichTextEditor field={field} errors={errors} />}
                    />
                    {errors.description && (
                      <FormHelperText sx={{ color: 'error.main', mt: '50px' }} id='stepper-linear-description'>
                        {errors.description.message}
                      </FormHelperText>
                    )}
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel id='signature-label' sx={{ mb: 2, color: errors.images ? 'error.main' : 'text.primary' }}>
                  Imágenes del producto
                </InputLabel>
                <Controller
                  name='images'
                  control={control}
                  style={{ height: '100%' }}
                  rules={{ required: 'Debes subir al menos una imagen' }}
                  render={({ field, fieldState }) => (
                    <ImageUploader
                      field={field}
                      fieldState={fieldState}
                      base64Images={editItem && currentProduct ? currentProduct.urlImages : []}
                    />
                  )}
                />
                {errors.images && (
                  <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-description'>
                    {errors.images.message}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12} md={12}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: '20px',
                    mb: '20px'
                  }}
                >
                  <Typography variant='h6' sx={{ alignSelf: 'flex-end' }}>
                    Beneficios del producto:
                  </Typography>
                </Box>
                <Grid container item xs={12} spacing={5}>
                  <Grid item xs={12} sx={{ marginTop: '10px' }}>
                    {benefits?.map((field, index) => (
                      <Grid container item xs={12} spacing={5} key={index}>
                        <Grid item xs={3} sx={{ marginTop: '10px' }}>
                          <Controller
                            name={`benefits[${index}].title`}
                            control={control}
                            defaultValue={field.title}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <TextField
                                label='Beneficio'
                                variant='outlined'
                                error={!!errors.benefits?.[index]?.title}
                                helperText={errors.benefits?.[index]?.title?.message}
                                fullWidth
                                {...field}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={8} sx={{ marginTop: '10px' }}>
                          <Controller
                            name={`benefits[${index}].detail`}
                            control={control}
                            defaultValue={field.detail}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <TextField
                                label='Detalles del Beneficio'
                                variant='outlined'
                                error={!!errors.benefits?.[index]?.detail}
                                helperText={errors.benefits?.[index]?.detail?.message}
                                fullWidth
                                multiline
                                minRows={6}
                                maxRows={6}
                                {...field}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
                          {benefits.length > 1 && (
                            <Button variant='text' color='error' onClick={() => handleDeleteBenefit(index)}>
                              Eliminar
                            </Button>
                          )}
                        </Grid>
                      </Grid>
                    ))}
                    <Grid item xs={12}>
                      <Button color='primary' onClick={handleAddBenefit} sx={{ mt: 2, width: '100%' }}>
                        <Plus /> Agregar Nuevo Beneficio
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={12}>
                <Box display='flex' justifyContent='space-between' alignItems='center' sx={{ mt: '20px', mb: '20px' }}>
                  <Typography variant='h6'>Estudios relacionados:</Typography>
                </Box>
                <Grid container item xs={12} spacing={5}>
                  <Grid item xs={12} sx={{ marginTop: '10px' }}>
                    {studies?.map((study, index) => (
                      <Grid container item xs={12} spacing={5} key={index}>
                        <Grid item xs={3} sx={{ marginTop: '10px' }}>
                          <Controller
                            name={`studies[${index}].title`}
                            control={control}
                            defaultValue={study.title}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <TextField
                                label='Título'
                                variant='outlined'
                                error={!!errors.studies?.[index]?.title}
                                helperText={errors.studies?.[index]?.title?.message}
                                fullWidth
                                {...field}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={3} sx={{ marginTop: '10px' }}>
                          <Controller
                            name={`studies[${index}].pageName`}
                            control={control}
                            defaultValue={study.pageName}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <TextField
                                label='Nombre de la página'
                                variant='outlined'
                                error={!!errors.studies?.[index]?.pageName}
                                helperText={errors.studies?.[index]?.pageName?.message}
                                fullWidth
                                {...field}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={5} sx={{ marginTop: '10px' }}>
                          <Controller
                            name={`studies[${index}].url`}
                            control={control}
                            defaultValue={study.url}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <TextField
                                label='URL'
                                variant='outlined'
                                error={!!errors.studies?.[index]?.url}
                                helperText={errors.studies?.[index]?.url?.message}
                                fullWidth
                                {...field}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
                          {studies.length > 1 && (
                            <Button variant='text' color='error' onClick={() => handleDeleteStudy(index)}>
                              Eliminar
                            </Button>
                          )}
                        </Grid>
                      </Grid>
                    ))}
                    <Grid item xs={12}>
                      <Button color='primary' onClick={handleAddStudy} sx={{ mt: 2, width: '100%' }}>
                        <Plus /> Agregar Nuevo Estudio
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <Grid item xs={12}>
            <Divider sx={{ mb: 2 }} />
          </Grid>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button
              onClick={() => router.push('/ecommerce/products')}
              size='large'
              color='secondary'
              variant='outlined'
            >
              Volver
            </Button>
            <Button size='large' type='submit' sx={{ ml: 1 }} variant='contained'>
              {editItem ? 'Guardar Cambios' : 'Crear Producto'}
            </Button>
          </CardActions>
        </form>
      </Card>
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

export default AddProduct
