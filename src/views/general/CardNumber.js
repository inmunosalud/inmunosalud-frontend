// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Styled component for the image
const Img = styled('img')({
  right: 7,
  bottom: 0,
  height: 177,
  position: 'absolute'
})

const CardNumber = ({ data, userInfo = {} }) => {
  // ** Vars
  const { title, chipColor, chipText, src, stats, trend, trendNumber } = data
  const isActive = 'Usuario Activo'
  const isInactive = 'Usuario Inactivo'
  console.log(data)
  return (
    <Card sx={{ overflow: 'visible', position: 'relative' }}>
      <CardContent>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography sx={{ mb: 6.5, fontWeight: 600 }}>{title}</Typography>
          {title === 'Proximo Corte' ? (
            <Typography sx={{ mb: 6.5, fontWeight: 600 }}>{userInfo?.valid ? isActive : isInactive}</Typography>
          ) : null}
        </div>
        <Box
          sx={{
            mb: 1.5,
            rowGap: 1,
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant='h5' sx={{ mr: 1.5 }}>
            {stats}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardNumber

CardNumber.defaultProps = {
  trend: 'positive',
  chipColor: 'primary'
}
