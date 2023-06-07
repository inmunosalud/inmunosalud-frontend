// ** React Imports
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import Check from 'mdi-material-ui/Check'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'
import { Cart } from 'mdi-material-ui'
import { FileUpload } from 'mdi-material-ui'
import { Pencil } from 'mdi-material-ui';
import Tooltip from '@mui/material/Tooltip';

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { setModal } from 'src/store/users'
import Modal from '../dashboards/users/Modal'

// ** store imports
import { getUserInfo } from 'src/store/users'
import { React } from 'mdi-material-ui'
import { loadSession } from 'src/store/dashboard/generalSlice'
import { useRouter } from 'next/router'
import Link from 'next/link'


// ** Styled <sup> component
const Sup = styled('sup')(({ theme }) => ({
  top: '0.2rem',
  left: '-0.6rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

// ** Styled <sub> component
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

const UserProfileLeft = ({ data }) => {
  const { userInfo, showModal } = useSelector(state => state.users)
  const dispatch = useDispatch()

  const router = useRouter()

  const handleModal = () => {
    dispatch(setModal(false))
  }

  useEffect(() => {
    dispatch(loadSession())
    dispatch(getUserInfo(data?.id))
  }, [])

  const renderUserAvatar = () => {
    if (data) {
      return (
        <CustomAvatar
          skin='light'
          variant='rounded'
          color={data.avatarColor}
          sx={{ width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: '3rem' }}
        >
          {getInitials(data.email)}
        </CustomAvatar>
      )
    } else {
      return null
    }
  }

  if (data) {
    const isActive = 'Usuario Activo'
    const isInactive = "Usuario Inactivo"
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pt: 15, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {renderUserAvatar()}
                <Tooltip title="Editar" placement="top">
              <Typography variant='h6' sx={{ mb: 2, mr: 0.5, cursor: 'pointer' }} onClick={() => dispatch(setModal(true))} >
                {userInfo?.firstName} {userInfo?.lastName}
                    <Pencil color="warning"/>
              </Typography>
                </Tooltip>
              <Typography variant='h6' sx={{ mb: 2 }}>
                {data.email}
              </Typography>
              {
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
              }
              {
                <CustomChip
                  skin='light'
                  size='small'
                  label={userInfo?.valid ? isActive : isInactive}
                  color={userInfo?.valid ? 'success' : 'error'}
                  sx={{
                    height: 20,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    borderRadius: '5px',
                    textTransform: 'capitalize',
                    '& .MuiChip-label': { mt: -0.25 }
                  }}
                />
              }
            </CardContent>

            <CardContent sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ mr: 8, display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin='light' variant='rounded' sx={{ mr: 3 }}>
                    <Check />
                  </CustomAvatar>
                  <Box>
                    <Typography variant='h6' sx={{ lineHeight: 1.3 }}>
                      {userInfo?.antiquity}
                    </Typography>
                    <Typography variant='body2'>Tiempo</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin='light' variant='rounded' sx={{ mr: 3 }}>
                    <BriefcaseVariantOutline />
                  </CustomAvatar>
                  <Box>
                    <Typography variant='h6' sx={{ lineHeight: 1.3 }}>
                      {userInfo?.numberOfPurchases}
                    </Typography>
                    <Typography variant='body2'>Compras</Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ pt: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Link href='/ecommerce/billing' passHref>
              <Button variant='outlined' sx={{ mb: 3, mr: 0.5 }} startIcon={<FileUpload />}
              >
                Carga tu factura
              </Button>
            </Link>
            <Button variant='outlined' sx={{ mb: 3, ml: 0.5 }} onClick={() => router.push('/ecommerce/monthly-purchase/')} startIcon={<Cart />}>
              Pedido Mensual
            </Button>
          </Card>
        </Grid>
        {userInfo?.balance > 0 && <Grid item xs={12}>
          <Card>
            <CardContent >
              <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between' }}>
                <Typography variant='h6'>Saldo a favor</Typography>
                <Typography variant='h6'>
                  ${userInfo?.balance}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>}
        {/* New Param showOnlyName to only show name and last name inputs*/}
        <Modal label='Editar nombre' open={showModal} handleModal={handleModal} item={userInfo} showOnlyName={true} />
      </Grid>
    )
  } else {
    return null
  }
}

export default UserProfileLeft
