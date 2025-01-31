import React from 'react'
import { Grid, Card, CardHeader, Box } from '@mui/material'
import { HistoryGraphic } from './HistoryGraphic'

const GeneralHistoryCard = ({ data }) => {
  const categories = [
    { key: 'users', name: 'Usuarios' },
    { key: 'orders', name: 'Pedidos Entregados' },
    { key: 'commissions', name: 'Comisiones' },
    { key: 'sales', name: 'Ventas' },
    { key: 'products', name: 'Productos Vendidos' }
  ]

  return (
    <Grid container spacing={4}>
      {categories.map((category, index) => (
        <Grid item xs={12} md={index === categories.length - 1 ? 12 : 6} key={category.key}>
          <Card>
            <CardHeader title={category.name} />
            <Box sx={{ mt: 2 }}>
              <HistoryGraphic series={data[category.key]?.series} categoryType={category.key} />
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default GeneralHistoryCard
