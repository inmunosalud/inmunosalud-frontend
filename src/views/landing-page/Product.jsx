// ** MUI Imports
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** Icons Imports
import CircleOutline from 'mdi-material-ui/CircleOutline'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Styled Component for the wrapper of whole component
const BoxWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(5),
  borderRadius: theme.shape.borderRadius,
  
}))

// ** Styled Component for the wrapper of all the features of a plan
const BoxFeature = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(5.75),
  '& > :not(:first-of-type)': {
    marginTop: theme.spacing(3.5)
  }
}))

const Product = props => {
  // ** Props
  const { plan, data } = props

  const renderFeatures = () => {
    return data?.planBenefits.map((item, index) => (
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <CircleOutline sx={{ fontSize: '0.75rem', mr: 2, color: 'text.secondary' }} />
        <Typography variant='body2'>{item}</Typography>
      </Box>
    ))
  }

  return (
    <BoxWrapper
      sx={{
        border: theme => `1px solid ${theme.palette.divider}`
      }}
    >
      {data?.popularPlan ? (
        <CustomChip
          skin='light'
          label='Popular'
          color='primary'
          sx={{
            top: 11,
            right: 12,
            height: 20,
            position: 'absolute',
            '& .MuiChip-label': {
              px: 1.75,
              fontWeight: 600,
              fontSize: '0.75rem'
            }
          }}
        />
      ) : null}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <img
          src={`${data?.urlImages[0]}`}
          width={70}
          height={100}
          alt={`${data?.product.toLowerCase()}-plan-img`}
        />
      </Box>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant='h5'>{data?.product}</Typography>
        <Typography variant='body2'>{data?.description}</Typography>
      </Box>
      <Button fullWidth color='primary' variant={'outlined'}>
        {'Agregar a carrito'}
      </Button>
    </BoxWrapper>
  )
}

export default Product
