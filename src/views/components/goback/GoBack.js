// import * as React from 'react'
import Button from '@mui/material/Button'
import ArrowLeft from 'mdi-material-ui/ArrowLeft'
import Link from 'next/link'
export const GoBackButton = ({ onChangePage }) => {
  return (
    <div style={{ margin: '8px', witdh: '8px', height: '8px' }}>
      <Link href={onChangePage} passHref style={{ textDecoration: 'none' }}>
        <Button style={{ borderRadius: '30px' }} variant='contained'>
          <ArrowLeft />
        </Button>
      </Link>
    </div>
  )
}

export default GoBackButton
