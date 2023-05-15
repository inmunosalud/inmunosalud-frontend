import { useDispatch, useSelector } from 'react-redux'

import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
import { Box, Button, Typography } from '@mui/material'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'
import { updateMonthlyPurchase } from 'src/store/monthlypurchase'
import { useState } from 'react'



const RepeatingContent = styled(Grid)(({ theme }) => ({
    paddingRight: 0,
    display: 'flex',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    '& .col-title': {
        top: '-1.5rem',
        position: 'absolute'
    },
    [theme.breakpoints.down('lg')]: {
        '& .col-title': {
            top: '0',
            position: 'relative'
        }
    }
}))


export const MonthlyProductItem = props => {
    //debugger
    const dispatch = useDispatch()
    const { products, id } = useSelector(state => state.monthlyPurchase)

    const [localQuantity, setLocalQuantity] = useState(1)


    const handleUpdate = (idProduct, canBeRemoved) => {
        const body = {
            id: idProduct,
            quantity: localQuantity
        }

        dispatch(updateMonthlyPurchase({ id, body }))
    }

    return (
        <Grid container>
            <RepeatingContent item xs={12}>
                <Grid container sx={{ py: 4, width: '100%', pr: { lg: 0, xs: 4 } }}>
                    <Grid item lg={6} md={5} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                        <Typography
                            variant='body2'
                            className='col-title'
                            sx={{ fontWeight: '600', mb: { md: 2, xs: 0 } }}
                        >
                            Articulo
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <img width={40} height={50} alt='Apple iPhone 11 Pro' src={props.urlImages[0]} />
                            <Typography sx={{ ml: 3 }}>{props.product}</Typography>
                        </Box>
                    </Grid>
                    <Grid item lg={2} md={3} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                        <Typography
                            variant='body2'
                            className='col-title'
                            sx={{ fontWeight: '600', mb: { md: 2, xs: 0 } }}
                        >
                            Precio
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography sx={{ ml: 3 }}>${props.price}</Typography>
                        </Box>
                    </Grid>
                    <Grid item lg={2} md={2} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                        <Typography
                            variant='body2'
                            className='col-title'
                            sx={{ fontWeight: '600', mb: { md: 2, xs: 0 } }}
                        >
                            Cantidad
                        </Typography>
                        <TextField
                            size='small'
                            type='number'
                            placeholder='1'
                            defaultValue={localQuantity}
                            InputProps={{ inputProps: { min: 0 } }}
                            onChange={ev => setLocalQuantity(ev.target.value)}
                        />
                    </Grid>
                    <Grid item lg={2} md={2} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                        <Button
                            size='small'
                            variant='contained'
                            disabled={products.some(item => item.id === props.id)}
                            onClick={() => handleUpdate(props.id, props.canBeRemoved)}
                        >
                            Agregar
                        </Button>
                    </Grid>
                    {/* <Grid item lg={2} md={1} xs={12} sx={{ px: 4, my: { lg: 0 }, mt: 2 }}>
                        <Typography
                            variant='body2'
                            className='col-title'
                            sx={{ fontWeight: '600', mb: { md: 2, xs: 0 } }}
                        >
                            Total
                        </Typography>
                        <Typography>${props.total}</Typography>
                    </Grid> */}
                </Grid>
                {/* <InvoiceAction>
                    {props.canBeRemoved ? (
                        <IconButton size='small' onClick={ev => handleUpdate(props.id, 0, props.canBeRemoved)}>
                            <Close fontSize='small' />
                        </IconButton>
                    ) : null}
                </InvoiceAction> */}
            </RepeatingContent>
        </Grid>
    )
}
