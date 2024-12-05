import React from 'react'
import { Box, Pagination } from '@mui/material'

const SimplePagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handleChange = (event, value) => {
    onPageChange(value)
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
      <Pagination count={totalPages} page={currentPage} onChange={handleChange} color='primary' />
    </Box>
  )
}

export default SimplePagination
