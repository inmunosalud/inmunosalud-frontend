// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import AlertTitle from '@mui/material/AlertTitle'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import LinearProgress from '@mui/material/LinearProgress'
import TableContainer from '@mui/material/TableContainer'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContentText from '@mui/material/DialogContentText'

// ** Icons Imports
import Plus from 'mdi-material-ui/Plus'

// ** Third Party Imports
import Payment from 'payment'
import Cards from 'react-credit-cards'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'

// ** Util Import
import { formatCVC, formatExpirationDate, formatCreditCardNumber } from 'src/@core/utils/format'

// ** Styled Component Imports
import CardWrapper from 'src/@core/styles/libs/react-credit-cards'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'

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

const data = [
  {
    cardCvc: '587',
    name: 'Tom McBride',
    expiryDate: '12/24',
    imgAlt: 'Mastercard',
    badgeColor: 'primary',
    cardStatus: 'Primary',
    cardNumber: '5577 0000 5577 9865',
    imgSrc: '/images/logos/mastercard.png'
  },
  {
    cardCvc: '681',
    imgAlt: 'Visa card',
    expiryDate: '02/24',
    name: 'Mildred Wagner',
    cardNumber: '4532 3616 2070 5678',
    imgSrc: '/images/logos/visa.png'
  },
  {
    cardCvc: '3845',
    expiryDate: '08/20',
    badgeColor: 'error',
    cardStatus: 'Expired',
    name: 'Lester Jennings',
    imgAlt: 'American Express card',
    cardNumber: '3700 000000 00002',
    imgSrc: '/images/logos/american-express.png'
  }
]

const UserProfileBilling = () => {
  // ** States
  const [cvc, setCvc] = useState('')
  const [name, setName] = useState('')
  const [focus, setFocus] = useState()
  const [cardId, setCardId] = useState(0)
  const [expiry, setExpiry] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [dialogTitle, setDialogTitle] = useState('Add')
  const [openEditCard, setOpenEditCard] = useState(false)
  const [openAddressCard, setOpenAddressCard] = useState(false)
  const [openUpgradePlans, setOpenUpgradePlans] = useState(false)

  // Handle Edit Card dialog and get card ID
  const handleEditCardClickOpen = id => {
    setDialogTitle('Edit')
    setCardId(id)
    setCardNumber(data[id].cardNumber)
    setName(data[id].name)
    setCvc(data[id].cardCvc)
    setExpiry(data[id].expiryDate)
    setOpenEditCard(true)
  }

  const handleAddCardClickOpen = () => {
    setDialogTitle('Add')
    setCardNumber('')
    setName('')
    setCvc('')
    setExpiry('')
    setOpenEditCard(true)
  }

  const handleEditCardClose = () => {
    setDialogTitle('Add')
    setCardNumber('')
    setName('')
    setCvc('')
    setExpiry('')
    setOpenEditCard(false)
  }

  // Handle Upgrade Plan dialog
  const handleUpgradePlansClickOpen = () => setOpenUpgradePlans(true)
  const handleUpgradePlansClose = () => setOpenUpgradePlans(false)
  const handleBlur = () => setFocus(undefined)

  const handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value, Payment)
      setCardNumber(target.value)
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value)
      setExpiry(target.value)
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value, cardNumber, Payment)
      setCvc(target.value)
    }
  }

  return (
    <Fragment>
      <Card sx={{ mb: 6 }}>
        <CardHeader
          title='Metodos de Pago'
          titleTypographyProps={{ variant: 'h6' }}
          action={
            <Button variant='contained' onClick={handleAddCardClickOpen}>
              <Plus sx={{ mr: 1, fontSize: '1.125rem' }} />
              Agregar
            </Button>
          }
        />
        <CardContent>
          {data.map((item, index) => (
            <Box
              key={index}
              sx={{
                p: 5,
                display: 'flex',
                borderRadius: 1,
                flexDirection: ['column', 'row'],
                justifyContent: ['space-between'],
                alignItems: ['flex-start', 'center'],
                mb: index !== data.length - 1 ? 4 : undefined,
                border: theme => `1px solid ${theme.palette.divider}`
              }}
            >
              <div>
                <img height='25' alt={item.imgAlt} src={item.imgSrc} />
                <Box sx={{ mt: 0.5, display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ fontWeight: 500 }}>{item.name}</Typography>
                </Box>
                <Typography variant='body2'>
                  **** **** **** {item.cardNumber.substring(item.cardNumber.length - 4)}
                </Typography>
              </div>

              <Box sx={{ mt: [3, 0], textAlign: ['start', 'end'] }}>
                <Button variant='outlined' sx={{ mr: 3 }} onClick={() => handleEditCardClickOpen(index)}>
                  Editar
                </Button>
                <Button variant='outlined' color='secondary'>
                  Eliminar
                </Button>
                <Typography variant='body2' sx={{ mt: 5 }}>
                  Expira el {item.expiryDate}
                </Typography>
              </Box>
            </Box>
          ))}
        </CardContent>

        <Dialog
          open={openEditCard}
          onClose={handleEditCardClose}
          aria-labelledby='user-view-billing-edit-card'
          sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
          aria-describedby='user-view-billing-edit-card-description'
        >
          <DialogTitle id='user-view-billing-edit-card' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
            {dialogTitle} Card
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              variant='body2'
              id='user-view-billing-edit-card-description'
              sx={{ textAlign: 'center', mb: 7 }}
            >
              {dialogTitle} card for future billing
            </DialogContentText>
            <form>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <CardWrapper sx={{ '& .rccs': { m: '0 auto' } }}>
                    <Cards cvc={cvc} focused={focus} expiry={expiry} name={name} number={cardNumber} />
                  </CardWrapper>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={6}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name='number'
                        value={cardNumber}
                        autoComplete='off'
                        label='Card Number'
                        onBlur={handleBlur}
                        onChange={handleInputChange}
                        placeholder='0000 0000 0000 0000'
                        onFocus={e => setFocus(e.target.name)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <TextField
                        fullWidth
                        name='name'
                        value={name}
                        autoComplete='off'
                        onBlur={handleBlur}
                        label='Name on Card'
                        placeholder='John Doe'
                        onChange={e => setName(e.target.value)}
                        onFocus={e => setFocus(e.target.name)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        name='expiry'
                        label='Expiry'
                        value={expiry}
                        onBlur={handleBlur}
                        placeholder='MM/YY'
                        onChange={handleInputChange}
                        inputProps={{ maxLength: '5' }}
                        onFocus={e => setFocus(e.target.name)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-billing-edit-card-status-label'>Card Status</InputLabel>
                        <Select
                          label='Card Status'
                          id='user-view-billing-edit-card-status'
                          labelId='user-view-billing-edit-card-status-label'
                          defaultValue={data[cardId].cardStatus ? data[cardId].cardStatus : ''}
                        >
                          <MenuItem value='Primary'>Primary</MenuItem>
                          <MenuItem value='Expired'>Expired</MenuItem>
                          <MenuItem value='Active'>Active</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        name='cvc'
                        label='CVC'
                        value={cvc}
                        autoComplete='off'
                        onBlur={handleBlur}
                        onChange={handleInputChange}
                        onFocus={e => setFocus(e.target.name)}
                        placeholder={Payment.fns.cardType(cardNumber) === 'amex' ? '1234' : '123'}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={<Switch defaultChecked />}
                        label='Save Card for future billing?'
                        sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center' }}>
            <Button variant='contained' sx={{ mr: 1 }} onClick={handleEditCardClose}>
              Submit
            </Button>
            <Button variant='outlined' color='secondary' onClick={handleEditCardClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Fragment>
  )
}

export default UserProfileBilling
