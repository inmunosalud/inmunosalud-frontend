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

const UserProfileAddress = () => {
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
      <Card>
        <CardHeader
          title='Direcciones'
          titleTypographyProps={{ variant: 'h6' }}
          action={
            <Button variant='contained' onClick={() => setOpenAddressCard(true)}>
              Editar
            </Button>
          }
        />
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12} lg={6}>
              <TableContainer>
                <Table size='small' sx={{ width: '95%' }}>
                  <TableBody
                    sx={{
                      '& .MuiTableCell-root': {
                        border: 0,
                        pt: 2,
                        pb: 2,
                        pl: '0 !important',
                        pr: '0 !important',
                        '&:first-of-type': {
                          width: 148
                        }
                      }
                    }}
                  >
                    <TableRow>
                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: '0.875rem',
                            whiteSpace: 'nowrap',
                            lineHeight: '22px',
                            letterSpacing: '0.1px'
                          }}
                        >
                          Alias:
                        </Typography>
                      </TableCell>
                      <TableCell>Casa 1</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: '0.875rem',
                            whiteSpace: 'nowrap',
                            lineHeight: '22px',
                            letterSpacing: '0.1px'
                          }}
                        >
                          Calle:
                        </Typography>
                      </TableCell>
                      <TableCell>Av. chapultepec</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: '0.875rem',
                            whiteSpace: 'nowrap',
                            lineHeight: '22px',
                            letterSpacing: '0.1px'
                          }}
                        >
                          Número Exterior
                        </Typography>
                      </TableCell>
                      <TableCell>623</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: '0.875rem',
                            whiteSpace: 'nowrap',
                            lineHeight: '22px',
                            letterSpacing: '0.1px'
                          }}
                        >
                          Número Interior
                        </Typography>
                      </TableCell>
                      <TableCell>N/A</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: '0.875rem',
                            whiteSpace: 'nowrap',
                            lineHeight: '22px',
                            letterSpacing: '0.1px'
                          }}
                        >
                          Colonia:
                        </Typography>
                      </TableCell>
                      <TableCell>Moderna</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xs={12} lg={6}>
              <TableContainer>
                <Table size='small'>
                  <TableBody
                    sx={{
                      '& .MuiTableCell-root': {
                        border: 0,
                        pt: 2,
                        pb: 2,
                        pl: '0 !important',
                        pr: '0 !important',
                        '&:first-of-type': {
                          width: 148
                        }
                      }
                    }}
                  >
                    <TableRow>
                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: '0.875rem',
                            whiteSpace: 'nowrap',
                            lineHeight: '22px',
                            letterSpacing: '0.1px'
                          }}
                        >
                          Ciudad:
                        </Typography>
                      </TableCell>
                      <TableCell>Guadalajara</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: '0.875rem',
                            whiteSpace: 'nowrap',
                            lineHeight: '22px',
                            letterSpacing: '0.1px'
                          }}
                        >
                          Estado:
                        </Typography>
                      </TableCell>
                      <TableCell>Jalisco</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: '0.875rem',
                            whiteSpace: 'nowrap',
                            lineHeight: '22px',
                            letterSpacing: '0.1px'
                          }}
                        >
                          Código Postal:
                        </Typography>
                      </TableCell>
                      <TableCell>44333</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: '0.875rem',
                            whiteSpace: 'nowrap',
                            lineHeight: '22px',
                            letterSpacing: '0.1px'
                          }}
                        >
                          Código Postal:
                        </Typography>
                      </TableCell>
                      <TableCell>Mexico</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: '0.875rem',
                            whiteSpace: 'nowrap',
                            lineHeight: '22px',
                            letterSpacing: '0.1px'
                          }}
                        >
                          Referencia:
                        </Typography>
                      </TableCell>
                      <TableCell>Casa blanca, puerta azul</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </CardContent>

        <Dialog
          open={openAddressCard}
          onClose={() => setOpenAddressCard(false)}
          aria-labelledby='user-address-edit'
          sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
          aria-describedby='user-address-edit-description'
        >
          <DialogTitle id='user-address-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
            Editar
          </DialogTitle>
          <DialogContent>
            <DialogContentText variant='body2' id='user-address-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
              Edit Address for future billing
            </DialogContentText>
            <form>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <TextField size='small' defaultValue='ThemeSelection' label='Company Name' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField type='email' size='small' defaultValue='gertrude@gmail.com' label='Email' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField size='small' defaultValue='TAX-875623' label='Tax ID' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField size='small' defaultValue='SDF754K77' label='VAT Number' />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={2}
                    size='small'
                    label='Billing Address'
                    defaultValue='100 Water Plant Avenue, Building 1303 Wake Island'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField size='small' defaultValue='+1(609) 933-44-22' label='Contact' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl size='small' fullWidth>
                    <InputLabel id='country-select'>Country</InputLabel>
                    <Select labelId='country-select' defaultValue='usa' label='Country'>
                      <MenuItem value='usa'>USA</MenuItem>
                      <MenuItem value='uk'>UK</MenuItem>
                      <MenuItem value='france'>France</MenuItem>
                      <MenuItem value='germany'>Germany</MenuItem>
                      <MenuItem value='japan'>Japan</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField size='small' defaultValue='Capholim' label='State' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField type='number' size='small' defaultValue='403114' label='Zip Code' />
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center' }}>
            <Button variant='contained' sx={{ mr: 1 }} onClick={() => setOpenAddressCard(false)}>
              Submit
            </Button>
            <Button variant='outlined' color='secondary' onClick={() => setOpenAddressCard(false)}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Fragment>
  )
}

export default UserProfileAddress
