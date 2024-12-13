import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CustomSnackbar from 'src/views/components/snackbar/CustomSnackbar'
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
  GridToolbarColumnsButton,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridToolbarDensitySelector
} from '@mui/x-data-grid'

import { Pencil } from 'mdi-material-ui'
import { Typography, IconButton, Box, Tooltip } from '@mui/material'
import { closeSnackBar } from 'src/store/notifications'
import { Button } from '@mui/material'
import { esES } from '@mui/x-data-grid/locales'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import { getOrders, setUpdatedOrder } from 'src/store/orders'

export const BasicDataGrid = ({ isLoading, data, columns, title = '' }) => {
  const [pageSize, setPageSize] = React.useState(100)

  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ justifyContent: 'space-between', p: '1rem' }}>
        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <GridToolbarQuickFilter />
        <Box>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          {/* <GridToolbarDensitySelector /> */}
          <GridToolbarExport
            csvOptions={{
              utf8WithBom: true
            }}
          />
        </Box>
      </GridToolbarContainer>
    )
  }
  return (
    <DataGrid
      getRowHeight={() => 'auto'}
      checkboxSelection
      disableRowSelectionOnClick
      loading={isLoading}
      includeOutliers
      localeText={esES.components.MuiDataGrid.defaultProps.localeText}
      rows={data}
      disableColumnMenu={true}
      columns={columns}
      rowsPerPageOptions={[5, 10, 25]}
      pageSize={pageSize}
      onPageSizeChange={newPageSize => setPageSize(newPageSize)}
      components={{
        Toolbar: CustomToolbar
      }}
      sx={{
        height: '75vh',
        [`& .${gridClasses.cell}`]: {
          py: 0.5
        }
      }}
    />
  )
}
