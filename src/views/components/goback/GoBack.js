// import * as React from 'react'
import Button from '@mui/material/Button'
import ArrowLeft from 'mdi-material-ui/ArrowLeft'

export const GoBackButton = ({ onChangePage }) => {
  return (
    <div style={{ margin: '8px', witdh: '8px', height: '8px' }}>
      <Button style={{ borderRadius: '30px' }} variant='contained' onClick={onChangePage}>
        <ArrowLeft />
      </Button>
    </div>
  )
}

export default GoBackButton
