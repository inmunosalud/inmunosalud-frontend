// ** React Imports
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'

// ** Icons Imports
import Check from 'mdi-material-ui/Check'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'
import { Cart } from 'mdi-material-ui'
import { FileUpload } from 'mdi-material-ui'
import InvoiceIcon from '@mui/icons-material/Description'
import TransgenderIcon from '@mui/icons-material/Transgender'
import FemaleIcon from '@mui/icons-material/Female'
import MaleIcon from '@mui/icons-material/Male'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { setModal } from 'src/store/users'
import Modal from '../dashboards/users/Modal'
import ConfirmationModal from '../dashboards/users/ConfirmationModal'

// ** Styled Components
const Sup = styled('sup')(({ theme }) => ({
  top: '0.2rem',
  left: '-0.6rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

const Sub = styled('sub')({
  fontWeight: 300,
  fontSize: '1rem',
  alignSelf: 'flex-end'
})

const roleColors = {
  'Administrador de Productos': 'error',
  'Administrador General': 'warning',
  Afiliado: 'success',
  Consumidor: 'primary'
}

const formatPhoneNumber = phone => {
  if (!phone) return ''
  return phone.replace(/(\d{2})(\d{4})(\d{4})/, '$1 $2 $3')
}

const UserProfileLeft = ({ data }) => {
  const { user } = useSelector(state => state.session)
  const { showModal } = useSelector(state => state.users)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const dispatch = useDispatch()

  const handleModal = () => {
    dispatch(setModal(false))
  }

  const handleConfirmationModal = () => {
    setShowConfirmationModal(!showConfirmationModal)
  }

  console.log(user)
  const renderUserAvatar = () => {
    if (data) {
      return (
        <CustomAvatar
          skin='light'
          variant='rounded'
          color={data.avatarColor}
          sx={{ width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: '3rem' }}
        >
          {data.avatar || 'A'}
        </CustomAvatar>
      )
    } else {
      return null
    }
  }

  if (data) {
    const isActive = 'Usuario Activo'
    const isInactive = 'Usuario Inactivo'
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {renderUserAvatar()}
              <Typography variant='h6' sx={{ mb: 2 }}>
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography variant='h6' sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <EmailIcon sx={{ mr: 1 }} color='primary' />
                {data?.email}
              </Typography>
              <Typography variant='h6' sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <PhoneIcon sx={{ mr: 1 }} color='primary' />
                {formatPhoneNumber(data?.phone)}
              </Typography>
              <Typography variant='h6' sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                {data?.gender === 'Hombre' ? (
                  <MaleIcon sx={{ mr: 1 }} color='primary' />
                ) : data?.gender === 'Mujer' ? (
                  <FemaleIcon sx={{ mr: 1 }} color='primary' />
                ) : data?.gender === 'Otro' ? (
                  <TransgenderIcon sx={{ mr: 1 }} color='primary' />
                ) : (
                  <QuestionMarkIcon sx={{ mr: 1 }} color='primary' />
                )}
                {data?.gender || 'Género no especificado'}
              </Typography>
              <Button
                color='primary'
                size='small'
                variant='outlined'
                sx={{ mb: '1.5rem' }}
                onClick={() => dispatch(setModal(true))}
              >
                Editar Perfil
              </Button>
              <CustomChip
                skin='light'
                size='small'
                label={data.profile}
                color='primary'
                sx={{
                  height: 20,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  borderRadius: '5px',
                  textTransform: 'capitalize',
                  '& .MuiChip-label': { mt: -0.25 },
                  mb: 1
                }}
              />
              <CustomChip
                skin='light'
                size='small'
                label={user?.isActive ? isActive : isInactive}
                color={user?.isActive ? 'success' : 'error'}
                sx={{
                  height: 20,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  borderRadius: '5px',
                  textTransform: 'capitalize',
                  '& .MuiChip-label': { mt: -0.25 }
                }}
              />
            </CardContent>
            <CardContent sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ mr: 8, display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin='light' variant='rounded' sx={{ mr: 3 }}>
                    <Check />
                  </CustomAvatar>
                  <Box>
                    <Typography variant='h6' sx={{ lineHeight: 1.3 }}>
                      {user?.antiquity || '0'}
                    </Typography>
                    <Typography variant='body2'>Antigüedad</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin='light' variant='rounded' sx={{ mr: 3 }}>
                    <BriefcaseVariantOutline />
                  </CustomAvatar>
                  <Box>
                    <Typography variant='h6' sx={{ lineHeight: 1.3 }}>
                      {user?.numberOfPurchases || '0'}
                    </Typography>
                    <Typography variant='body2'>Compras</Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <ConfirmationModal
          open={showConfirmationModal}
          handleClose={handleConfirmationModal}
          handleConfirm={() => console.log('Confirmación realizada')}
        />
        <Modal label='Editar nombre' open={showModal} handleModal={handleModal} item={user} />
      </Grid>
    )
  } else {
    return null
  }
}

export default UserProfileLeft
