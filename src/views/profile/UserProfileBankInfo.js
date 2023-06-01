// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Tooltip from '@mui/material/Tooltip';


// ** Icons Imports
import Plus from 'mdi-material-ui/Plus'
import Delete from 'mdi-material-ui/Delete'
import CustomSnackbar from '../components/snackbar/CustomSnackbar'
import { Pencil } from 'mdi-material-ui';


// ** Third Party Imports
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'
import { createMethod, setModal, updateMethod } from 'src/store/paymentMethods'
import { closeSnackBar } from 'src/store/notifications'
import DialogBankInfo from '../components/dialogs/DialogBankInfo'
import { loadInfo } from 'src/store/paymentMethods'

const CARD_LOGOS = {
  VISA: '/images/logos/visa.png',
  AMEX: '/images/logos/american-express.png',
  MASTERCARD: '/images/logos/mastercard.png'
}

const defaultBankInfoValues = {
  clabe: ''
}

const bankInfoSchema = yup.object().shape({
  clabe: yup
    .string()
    .required()
    .matches(/^[\d*]+$/, 'Solo digitos o *')
    .min(18, 'Deben ser 18 digitos')
    .max(18, 'Deben ser 18 digitos')
})

const UserProfileBankInfo = ({ bankInfo = {} }) => {
  const dispatch = useDispatch()
  // ** States
  const [clabeIsEmpty, setClabeIsEmpty] = useState(false)

  const { user } = useSelector(state => state.dashboard.general)
  const { isOpen, isOpenDelete } = useSelector(state => state.paymentMethods)
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

  useEffect(() => setClabeIsEmpty(!bankInfo.clabe), [])

  const onBankInfoSubmit = values => {
    const body = {
      ...values,
      cardUse: 'Cobro'
    }

    dispatch(
      clabeIsEmpty
        ? createMethod({ body, uuid: user.id })
        : updateMethod({ body, uuid: user.id, idPaymentMethod: bankInfo.id })
    )
    dispatch(loadInfo(user.id))
    handleEditCardClose()
  }

  // Handle Edit Card dialog and get card ID
  const handleEditCardClickOpen = item => {
    reset({
      clabe: item.clabe
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
                <Typography sx={{ fontWeight: 500 }}>CLABE Interbancaria</Typography>
              </Box>
              <Typography variant='body2'>{bankInfo.clabe}</Typography>
            </div>

            <Box sx={{ mt: [3, 0], textAlign: ['start', 'end'] }}>
            <Tooltip title="Editar" placement="top">
              <Button variant='outlined' sx={{ mr: 3 }} onClick={() => handleEditCardClickOpen(bankInfo)} color="warning">
                <Pencil/>
              </Button>
            </Tooltip>
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
