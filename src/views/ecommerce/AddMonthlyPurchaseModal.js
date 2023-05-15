// ** React Imports
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'


// ** MUI Imports
import Close from 'mdi-material-ui/Close'
import IconButton from '@mui/material/IconButton'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Dialog from '@mui/material/Dialog'
import { getProducts } from 'src/store/products'
import { MonthlyProductItem } from '../dashboards/products/MonthlyProductItem'


const AddMonthlyPurchaseModal = ({ open = false, onClose = () => { } }) => {
    const dispatch = useDispatch()

    const { products } = useSelector(state => state.products)

    useEffect(() => {
        //load products
        dispatch(getProducts())
       
    }, [open])

    const displayMapProducts = () => {
        const { content } = products
        return (
            <>
                {content?.map((product, i) => (
                    <div key={i} style={{ marginTop: '25px' }}>
                        <MonthlyProductItem
                            isEdit={ false}
                            {...product}
                        />
                    </div>
                ))}
            </>
        )
    }

    return (
        <div className='demo-space-x'>
            <Dialog
                open={open}
                scroll='paper'
                maxWidth='md'
                onClose={onClose}
                aria-labelledby='scroll-dialog-title'
                aria-describedby='scroll-dialog-description'
            >
                <DialogTitle id='scroll-dialog-title'>Productos</DialogTitle>
                <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
                    <Close />
                </IconButton>
                <DialogContent dividers='paper'>
                    {displayMapProducts()}
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddMonthlyPurchaseModal
