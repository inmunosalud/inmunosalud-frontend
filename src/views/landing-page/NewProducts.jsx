// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
import PlanDetails from 'src/@core/components/plan-details'
import Product from './Product'

const NewProducts = props => {
  // ** Props
  const { plan, data } = props

  const renderPlan = () => {
    return data?.map(item => {
      return (
        <Grid item xs={12} md={3} key={item.product.toLowerCase()}>
          <Product plan={plan} data={item} />
        </Grid>
      )
    })
  }

  return (
    <Grid container justifyContent='center' sx={{ mb: 6 }} spacing={6}>
      {renderPlan()}
    </Grid>
  )
}

export default NewProducts
