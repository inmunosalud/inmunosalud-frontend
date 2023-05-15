// ** React Imports
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CustomChip from 'src/@core/components/mui/chip'
// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'
import { addressList, setSelectedAddressInCart } from 'src/store/address'

export const AddressList = () => {
  const dispatch = useDispatch()

  const [selectedAddress, setSelectedAddress] = React.useState(null)

  const { user } = useSelector(state => state.session)
  const { address } = useSelector(state => state.address)

  React.useEffect(() => {
    if (user?.id) dispatch(addressList(user.id))
  }, [dispatch])
  React.useEffect(() => {
    if (user?.id) dispatch(addressList(user.id))
  }, [address])

  const handleSelectAddress = item => {
    setSelectedAddress(item.id)
    dispatch(setSelectedAddressInCart(item))
  }

  return (
    <>
      {address.map((item, index) => (
        <Box
          key={index}
          sx={{
            p: 5,
            display: 'flex',
            borderRadius: 1,
            flexDirection: ['column', 'row'],
            justifyContent: ['space-between'],
            alignItems: ['flex-start', 'center'],
            mb: index === address.length - 1 ? undefined : 4,
            border: theme => (selectedAddress === item.id ? `1px solid white` : `1px solid ${theme.palette.divider}`),
            '&:hover': {
              border: '1px solid #D9D4D3',
              color: 'gray'
            }
          }}
        >
          <div>
            <Box sx={{ mt: 0.5, display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ fontWeight: 500 }}>{item.name}</Typography>
              {item.cardStatus ? (
                <CustomChip
                  skin='light'
                  size='small'
                  label={item.cardStatus}
                  color={item.badgeColor}
                  sx={{ height: 20, ml: 2, fontSize: '0.75rem', fontWeight: 600, borderRadius: '5px' }}
                />
              ) : null}
            </Box>
            <Typography variant='body2'>{`${item.street} ${item.extNumber}${
              item.intNumber ? ` - ${item.intNumber}` : ''
            }, ${item.colony}`}</Typography>
            <Typography variant='body2'>{item.zipCode}</Typography>
            <Typography variant='body2'>{item.city}</Typography>
          </div>

          <Box sx={{ mt: [3, 0], textAlign: ['start', 'end'] }}>
            <Button variant='outlined' sx={{ ml: 3 }} onClick={() => handleSelectAddress(item)}>
              {selectedAddress === item.id ? 'Seleccionado' : 'Seleccionar'}
            </Button>
            <Typography variant='body2' sx={{ mt: 5 }}>
              {item.country}
            </Typography>
          </Box>
        </Box>
      ))}
    </>
  )
}
