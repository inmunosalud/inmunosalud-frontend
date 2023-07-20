// ** React Imports
import { useState } from 'react'
import Link from 'next/link' // <-- Add this line

// ** MUI Imports
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import MuiAccordion from '@mui/material/Accordion'
import MuiCardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'


// ** Icons Imports
import ChevronDown from 'mdi-material-ui/ChevronDown'

// ** Styled Components
const CardContent = styled(MuiCardContent)(({ theme }) => ({
  padding: `${theme.spacing(17.5, 36)} !important`,
  [theme.breakpoints.down('xl')]: {
    padding: `${theme.spacing(12.5, 20)} !important`
  },
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(10, 5)} !important`
  }
}))

const Accordion = styled(MuiAccordion)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:before': {
    height: 0
  },
  '&.Mui-expanded': {
    boxShadow: 'none'
  }
}))

const FAQs = (props) => {
  // ** Props
  const { data } = props

  // ** Props
  const [expanded, setExpanded] = useState(false)
  const theme = useTheme()


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const renderAccordion = () => {
    return data?.map((item) => {
      return (
        <Accordion key={item.id} elevation={0} expanded={expanded === item.id} onChange={handleChange(item.id)}>
          <AccordionSummary
            expandIcon={<ChevronDown />}
            id={`pricing-accordion-${item.id}-header`}
            aria-controls={`pricing-accordion-${item.id}-content`}
          >
            <Typography>{item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
              {item.answer}
              {item.link && (
                <Typography variant="body2" component="span">
                  {' '}
                  <Link href={item.link}>
                    <a target="_blank" rel="noopener noreferrer" style={{ color: theme.palette.primary.main }}>
                      {item.link}
                    </a>
                  </Link>
                </Typography>
              )}
            </Typography>
          </AccordionDetails>
        </Accordion>
      )
    })
  }

  return (
    <CardContent>
      <Box sx={{ mb: 9, textAlign: 'center' }}>
        <Typography variant='h6'>PREGUNTAS FRECUENTES</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box>{renderAccordion()}</Box>
      </Box>
    </CardContent>
  )
}

export default FAQs
