import { useState, useMemo, memo } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Divider from '@mui/material/Divider'
import { HistoryGraphic } from 'src/views/general/HistoryGraphic.jsx'

// Memoizamos el componente principal para prevenir re-renders innecesarios
const MemoizedHistoryGraphic = memo(HistoryGraphic)

// Movemos la función de transformación fuera del componente para evitar recreaciones
const transformDataForCategory = categoryData => {
  return categoryData.series.reduce((acc, curr) => {
    acc[curr.year] = curr.counts
    return acc
  }, {})
}

const GeneralHistoryCard = ({ data }) => {
  // Memoizamos la lista de entradas de datos
  const dataEntries = useMemo(() => Object.entries(data), [data])

  // Memoizamos las categorías transformadas
  const transformedCategories = useMemo(() => {
    return dataEntries.reduce((acc, [key, category]) => {
      acc[key] = transformDataForCategory(category)
      return acc
    }, {})
  }, [dataEntries])

  return (
    <Card sx={{ overflow: 'visible', position: 'relative' }}>
      <CardContent>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
            gap: 4
          }}
        >
          {dataEntries.map(([key, category], index) => (
            <Box key={`${key}-${index}`}>
              <Typography variant='h6' sx={{ mb: 2 }}>
                {category.title}
              </Typography>
              {index !== 0 && <Divider sx={{ mt: 2, mb: 2 }} />}
              <MemoizedHistoryGraphic series={transformedCategories[key]} />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}

export default memo(GeneralHistoryCard)
