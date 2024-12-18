import * as React from 'react'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

const LightTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(
  ({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11
    }
  })
)

export default function CustomizedTooltip({ title, children }) {
  return (
    <div>
      <LightTooltip title={title}>{children}</LightTooltip>
    </div>
  )
}
