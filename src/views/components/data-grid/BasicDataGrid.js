import React, { useEffect } from 'react'
import Link from 'next/link'
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  gridClasses,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport
} from '@mui/x-data-grid'
import { useSelector } from 'react-redux'

import { Typography, Box, Button } from '@mui/material'
import { esES } from '@mui/x-data-grid/locales'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
export const BasicDataGrid = ({ isLoading, data, columns, title = '' }) => {
  const storageKey = 'datagrid-settings'
  const { user } = useSelector(state => state.session)
  // Función para cargar configuración específica de la tabla
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

  // Función para guardar configuración específica de la tabla
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

  useEffect(() => {
    saveSettings(title, {
      filters: filterModel,
      sort: sortModel,
      columnVisibility: columnVisibilityModel
    })
  }, [filterModel, sortModel, columnVisibilityModel])

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
          <GridToolbarExport
            csvOptions={{
              utf8WithBom: true
            }}
          />

          {user.profile === 'Administrador General' && title === 'Usuarios en el Sistema' ? (
            <Link href='/admin/users/new-user'>
              <Button size='small' startIcon={<PersonAddIcon />}>
                Crear administrador
              </Button>
            </Link>
          ) : null}
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
