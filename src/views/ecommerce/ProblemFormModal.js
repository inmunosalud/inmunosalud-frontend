// ** React Imports
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'


// ** MUI Imports
import Close from 'mdi-material-ui/Close'
import IconButton from '@mui/material/IconButton'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Dialog from '@mui/material/Dialog'
import { Controller } from 'react-hook-form'
import {
    FormControl,
    TextField,
    FormHelperText,
    Grid,
    Box,
    Button
} from '@mui/material'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { contactUs, setModal } from 'src/store/contactus'
import BackDropLoader from '../components/loaders/BackDropLoader'


const defaultProblemValues = {
    email: '',
    name: '',
    phone: '',
    city: '',
    message: '',
}

const problemSchema = yup.object().shape({
    email: yup
        .string()
        .email('Ingresa un correo valido')
        .required('El campo es requerido'),
    name: yup.string(),
    phone: yup.string().matches(/^$|[0-9]{10}/, 'Ingresa un número de télefono valido de 10 dígitos'),
    city: yup.string(),
    message: yup.string().required()
})

const ProblemFormModal = () => {
    const dispatch = useDispatch()

    const { openModalContact, isLoadingContact } = useSelector(state => state.contact)

    const {
        reset,
        control: problemControl,
        handleSubmit,
        formState: { errors: problemErrors }
    } = useForm({
        defaultValues: defaultProblemValues,
        resolver: yupResolver(problemSchema)
    })

    useEffect(() => {
        if (!openModalContact)
            reset(defaultProblemValues)
    }, [openModalContact])

    const onSubmit = data => {
        const body = {
            email: data.email,
            name: data.name,
            phone: data.phone,
            city: data.city,
            message: data.message,
        }
        dispatch(contactUs(body))
    }

    const onClose = () => {
        dispatch(setModal(!openModalContact))
    }

    return (
        <div className='demo-space-x'>
            <Dialog
                open={openModalContact}
                scroll='paper'
                maxWidth='md'
                onClose={onClose}
                aria-labelledby='scroll-dialog-title'
                aria-describedby='scroll-dialog-description'
            >
                <DialogTitle id='scroll-dialog-title'>Tengo un problema</DialogTitle>
                <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
                    <Close />
                </IconButton>
                <DialogContent>
                    <form key={0} onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={5}>
                            <Grid item xs={12} >
                                <FormControl fullWidth>
                                    <Controller
                                        name='name'
                                        control={problemControl}
                                        rules={{ required: false }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                value={value}
                                                label='Nombre'
                                                onChange={onChange}
                                                placeholder='Nombre'
                                                error={Boolean(problemErrors.name)}
                                                aria-describedby='validation-basic-name'
                                            />
                                        )}
                                    />
                                    {problemErrors.name?.type === 'required' && (
                                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-name'>
                                            El campo es requerido
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='email'
                                        control={problemControl}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                value={value}
                                                label='Correo electrónico'
                                                onChange={onChange}
                                                placeholder='Email'
                                                error={Boolean(problemErrors.email)}
                                                aria-describedby='validation-basic-email'
                                            />
                                        )}
                                    />
                                    {Boolean(problemErrors.email) && (
                                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-email'>
                                            {problemErrors.email?.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='city'
                                        control={problemControl}
                                        rules={{ required: false }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                value={value}
                                                label='Ciudad'
                                                onChange={onChange}
                                                placeholder='Ciudad'
                                                error={Boolean(problemErrors.city)}
                                                aria-describedby='validation-basic-reference'
                                            />
                                        )}
                                    />
                                    {problemErrors.city?.type === 'required' && (
                                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-refer'>
                                            El campo es requerido
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='phone'
                                        control={problemControl}
                                        rules={{ required: false }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                value={value}
                                                label='Número de teléfono'
                                                onChange={onChange}
                                                placeholder='Número de telefono'
                                                error={Boolean(problemErrors.phone)}
                                                aria-describedby='validation-basic-reference'
                                            />
                                        )}
                                    />
                                    {Boolean(problemErrors.phone) && (
                                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-refer'>
                                            {problemErrors.phone?.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} >
                                <FormControl fullWidth>
                                    <Controller
                                        name='message'
                                        control={problemControl}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                value={value} inputProps={{
                                                    style: {
                                                        height: "120px",
                                                    },
                                                }}
                                                label='Descripción'
                                                onChange={onChange}
                                                placeholder='Describe tu problema'
                                                error={Boolean(problemErrors.message)}
                                                aria-describedby='validation-basic-reference'
                                                multiline
                                            />
                                        )}
                                    />
                                    {problemErrors.message?.type === 'required' && (
                                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-refer'>
                                            El campo es requerido
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 5 }}>
                            <Button
                                type='submit'
                                variant='contained'
                            >
                                Enviar
                            </Button>
                        </Box>
                    </form>
                    <BackDropLoader isLoading={isLoadingContact} />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ProblemFormModal
