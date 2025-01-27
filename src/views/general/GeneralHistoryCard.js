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

const GeneralHistoryCard = ({ data }) => {
  // ** Vars
  console.log(data)
  return (
    <Card sx={{ overflow: 'visible', position: 'relative' }}>
      <CardContent></CardContent>
    </Card>
  )
}

export default GeneralHistoryCard

GeneralHistoryCard.defaultProps = {
  trend: 'positive',
  chipColor: 'primary'
}
