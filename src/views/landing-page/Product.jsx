// ** MUI Imports
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'

// ** Icons Imports
import CircleOutline from 'mdi-material-ui/CircleOutline'

// ** Util Import
import Link from 'next/link'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import Image from 'next/image'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import { useRouter } from 'next/router'

// ** Styled Component for the wrapper of whole component
const BoxWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(5),
  borderRadius: theme.shape.borderRadius
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
  const router = useRouter()
  const theme = useTheme()

  const renderFeatures = () => {
    return data?.planBenefits.map((item, index) => (
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <CircleOutline sx={{ fontSize: '0.75rem', mr: 2, color: 'text.secondary' }} />
        <Typography variant='body2'>{item}</Typography>
      </Box>
    ))
  }

  return (
    <Card
      sx={{
        border: theme => `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          height: '100%',
          margin: '20px'
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
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <Image
            src={`${data?.urlImages[0]}`}
            alt={`${data?.product.toLowerCase()}-plan-img`}
            width={1000} // Ancho máximo que se ajuste a tu diseño
            height={1100} // Altura máxima que se ajuste a tu diseño
            // style={{
            //   transform: 'scale(1.5)'
            // }}
          />
        </Box>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant='h5'>{data?.product}</Typography>
        </Box>
        <Box sx={{ marginBottom: '20px' }}>
          <Typography variant='body2'>
            <Link href={`/ecommerce/products/?product=${data?.id}`}>
              <a
                rel='noopener noreferrer'
                style={{ color: theme.palette.primary.main, transition: 'color 0.3s' }}
                onMouseOver={e => (e.currentTarget.style.color = theme.palette.primary.light)}
                onMouseOut={e => (e.currentTarget.style.color = theme.palette.primary.main)}
              >
                Ver más
              </a>
            </Link>
          </Typography>
        </Box>
        <Box sx={{ marginTop: 'auto' }}>
          <Button
            fullWidth
            color='primary'
            variant={'outlined'}
            onClick={() => {
              router.push('/ecommerce/products/')
            }}
          >
            {'Agregar a carrito'}
          </Button>
        </Box>
      </Box>
    </Card>
  )
}

export default Product
