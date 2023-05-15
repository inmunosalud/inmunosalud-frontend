import { useSelector, useDispatch } from 'react-redux'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Third Party Styles Imports
import AddMonthlyPurchase from 'src/views/ecommerce/AddMonthlyPurchase'
import AddMonthlyPurchaseModal from 'src/views/ecommerce/AddMonthlyPurchaseModal'
import { setModal } from 'src/store/monthlypurchase'

const MonthlyPurchase = () => {
  const dispatch = useDispatch()

  const { showModal } = useSelector(state => state.monthlyPurchase)

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xl={12} xs={12}>
          <AddMonthlyPurchase />
        </Grid>
        <AddMonthlyPurchaseModal open={showModal} onClose={() => dispatch(setModal(false))}/>
      </Grid>
    </>
  )
}

export default MonthlyPurchase
