// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Tooltip from '@mui/material/Tooltip'
import { useForm } from 'react-hook-form'
import { Pencil } from 'mdi-material-ui'
import CustomSnackbar from 'src/views/components/snackbar/CustomSnackbar'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Styles Import

import { createMethod, setModal, updateMethod } from 'src/store/paymentMethods'
import { closeSnackBar } from 'src/store/notifications'
import DialogBankInfo from '../components/dialogs/DialogBankInfo'
import { Divider } from '@mui/material'

const defaultBankInfoValues = {
  beneficiary: '',
  clabe: '',
  bank: ''
}

const bankInfoSchema = yup.object().shape({
  beneficiary: yup.string().required(),
  clabe: yup
    .string()
    .required()
    .matches(/^[\d*]+$/, 'Solo dígitos o *')
    .min(18, 'Deben ser 18 dígitos')
    .max(18, 'Deben ser 18 dígitos'),
  bank: yup.string().required()
})

const UserProfileBankInfo = () => {
  const dispatch = useDispatch()
  // ** States
  const [clabeIsEmpty, setClabeIsEmpty] = useState(false)

  const { user } = useSelector(state => state.session)
  const { isOpen, isOpenDelete, bank, clabe } = useSelector(state => state.paymentMethods)
  const { open, message, severity } = useSelector(state => state.notifications)
  const {
    reset,
    control: bankInfoControl,
    handleSubmit,
    formState: { errors: bankInfoErrors }
  } = useForm({
    defaultValues: defaultBankInfoValues,
    resolver: yupResolver(bankInfoSchema)
  })

  useEffect(() => {
    setClabeIsEmpty(!clabe || (typeof clabe === 'object' && Object.keys(clabe).length === 0))
  }, [])

  const onBankInfoSubmit = values => {
    const body = {
      ...values,
      cardUse: 'Cobro'
    }
    dispatch(
      clabeIsEmpty
        ? createMethod({ body, uuid: user.id })
        : updateMethod({ body, uuid: user.id, idPaymentMethod: clabe.id })
    )
    handleEditCardClose()
  }

  // Handle Edit Card dialog and get card ID
  const handleEditCardClickOpen = item => {
    reset({
      clabe: item.clabe,
      beneficiary: item.beneficiary,
      bank: item.bank
    })

    dispatch(setModal(true))
  }

  const handleEditCardClose = () => {
    reset(defaultBankInfoValues)
    dispatch(setModal(false))
  }

  return (
    <Fragment>
      <Card sx={{ mb: 6 }}>
        <CardHeader title='Datos Bancarios' titleTypographyProps={{ variant: 'h6' }} />
        <CardContent>
          <Box
            key={0}
            sx={{
              p: 5,
              display: 'flex',
              borderRadius: 1,
              flexDirection: ['column', 'row'],
              justifyContent: ['space-between'],
              alignItems: ['flex-start', 'center'],
              mb: 12,
              border: theme => `1px solid ${theme.palette.divider}`
            }}
          >
            <div>
              <Box sx={{ mt: 0.5, display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: 500 }}>Beneficiario: </Typography>
              </Box>
              <Typography variant='body1'>{clabe.beneficiary}</Typography>
              <Divider />
              <Box sx={{ mt: 0.5, display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: 500 }}>CLABE Interbancaria:</Typography>
              </Box>
              <Typography variant='body2'>{clabe.clabe}</Typography>
              <Divider />
              <Box sx={{ mt: 0.5, display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: 500 }}>Banco:</Typography>
              </Box>
              <Typography variant='body2'>{clabe.bank}</Typography>
            </div>

            <Box sx={{ mt: [3, 0], textAlign: ['start', 'end'] }}>
              {Object.keys(clabe).length === 0 ? (
                <Button variant='contained' sx={{ mr: 3 }} onClick={() => handleEditCardClickOpen({})} color='primary'>
                  Agregar
                </Button>
              ) : (
                <Button
                  variant='contained'
                  sx={{ mr: 3 }}
                  onClick={() => handleEditCardClickOpen(clabe)}
                  color='primary'
                >
                  Eliminar
                </Button>
              )}
            </Box>
          </Box>
        </CardContent>

        <DialogBankInfo
          isOpen={isOpen}
          onHandleEditCardClose={handleEditCardClose}
          bankInfoControl={bankInfoControl}
          bankInfoErrors={bankInfoErrors}
          onBankInfoSubmit={onBankInfoSubmit}
          handleSubmit={handleSubmit}
        />
      </Card>

      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
    </Fragment>
  )
}

export default UserProfileBankInfo
