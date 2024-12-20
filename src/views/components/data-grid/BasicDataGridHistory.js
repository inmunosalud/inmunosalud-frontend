import React, { useEffect } from 'react'
import moment from 'moment'
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  gridClasses,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport
} from '@mui/x-data-grid'
import { Typography, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material'
import { esES } from '@mui/x-data-grid/locales'

export const BasicDataGridHistory = ({ isLoading, data, columns, title = '', fetchData }) => {
  const storageKey = 'datagrid-settings'

  const loadSettings = key => {
    const savedSettings = localStorage.getItem(storageKey)
    if (savedSettings) {
      const settings = JSON.parse(savedSettings)
      return (
        settings[key] || {
          filters: { items: [] },
          sort: [],
          columnVisibility: {}
        }
      )
    }
    return { filters: { items: [] }, sort: [], columnVisibility: {} }
  }

  const saveSettings = (key, settings) => {
    const savedSettings = localStorage.getItem(storageKey)
    const currentSettings = savedSettings ? JSON.parse(savedSettings) : {}
    currentSettings[key] = settings
    localStorage.setItem(storageKey, JSON.stringify(currentSettings))
  }

  const [pageSize, setPageSize] = React.useState(100)
  const [filterModel, setFilterModel] = React.useState(() => loadSettings(title).filters)
  const [sortModel, setSortModel] = React.useState(() => loadSettings(title).sort)
  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState(() => loadSettings(title).columnVisibility)
  const [dateRange, setDateRange] = React.useState('1m')

  useEffect(() => {
    saveSettings(title, {
      filters: filterModel,
      sort: sortModel,
      columnVisibility: columnVisibilityModel
    })
  }, [filterModel, sortModel, columnVisibilityModel])

  useEffect(() => {
    const queryParam = getQueryParamsFromDateRange(dateRange)
    fetchData(queryParam)
  }, [dateRange])

  const getQueryParamsFromDateRange = range => {
    const endDate = moment().format('YYYY-MM-DD')
    let startDate

    switch (range) {
      case '1m':
        startDate = moment().subtract(1, 'month').format('YYYY-MM-DD')
        break
      case '3m':
        startDate = moment().subtract(3, 'months').format('YYYY-MM-DD')
        break
      case '6m':
        startDate = moment().subtract(6, 'months').format('YYYY-MM-DD')
        break
      case '1y':
        startDate = moment().subtract(1, 'year').format('YYYY-MM-DD')
        break
      default:
        startDate = moment().subtract(1, 'month').format('YYYY-MM-DD')
    }

    return { startDate, endDate }
  }

  const handleDateRangeChange = event => {
    setDateRange(event.target.value)
  }

  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ justifyContent: 'space-between', p: '1rem' }}>
        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <GridToolbarQuickFilter />
        </Box>
        <Box>
          <FormControl size='small'>
            <InputLabel id='date-range-select-label'>Rango</InputLabel>
            <Select
              labelId='date-range-select-label'
              id='date-range-select'
              value={dateRange}
              onChange={handleDateRangeChange}
              label='Rango'
            >
              <MenuItem value='1m'>Último mes</MenuItem>
              <MenuItem value='3m'>Últimos 3 meses</MenuItem>
              <MenuItem value='6m'>Últimos 6 meses</MenuItem>
              <MenuItem value='1y'>Último año</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
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
      filterModel={filterModel}
      onFilterModelChange={newFilterModel => setFilterModel(newFilterModel)}
      sortModel={sortModel}
      onSortModelChange={newSortModel => setSortModel(newSortModel)}
      columnVisibilityModel={columnVisibilityModel}
      onColumnVisibilityModelChange={newColumnVisibilityModel => setColumnVisibilityModel(newColumnVisibilityModel)}
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
