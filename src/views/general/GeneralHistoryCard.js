import { useMemo, memo } from 'react'
import { Box, Card, CardContent, Typography, Divider } from '@mui/material'
import { HistoryGraphic } from 'src/views/general/HistoryGraphic'

const transformCategoryData = (categoryKey, categoryData) => {
  if (categoryKey === 'products') {
    const transformed = {}
    categoryData.series.forEach(product => {
      product.yearlyData.forEach(yearData => {
        if (!transformed[yearData.year]) {
          transformed[yearData.year] = []
        }
        transformed[yearData.year].push({
          name: product.product,
          data: yearData.counts
        })
      })
    })
    return transformed
  }

  // Para otras categorías
  return categoryData.series.reduce((acc, curr) => {
    acc[curr.year] = curr.counts
    return acc
  }, {})
}

const GeneralHistoryCard = ({ data }) => {
  const dataEntries = useMemo(() => Object.entries(data), [data])

  const transformedCategories = useMemo(() => {
    return dataEntries.reduce((acc, [key, category]) => {
      acc[key] = transformCategoryData(key, category)
      return acc
    }, {})
  }, [dataEntries])

  // Separamos el último elemento
  const regularEntries = dataEntries.slice(0, -1)
  const lastEntry = dataEntries[dataEntries.length - 1]

  return (
    <Card sx={{ overflow: 'visible' }}>
      <CardContent>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
            gap: 4,
            mb: 4
          }}
        >
          {regularEntries.map(([key, category]) => (
            <Box key={key}>
              <Typography variant='h6' sx={{ mb: 2 }}>
                {category.title}
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <HistoryGraphic series={transformedCategories[key]} categoryType={key} />
            </Box>
          ))}
        </Box>

        {/* Último elemento en ancho completo */}
        {lastEntry && (
          <Box sx={{ width: '100%' }}>
            <Typography variant='h6' sx={{ mb: 2 }}>
              {lastEntry[1].title}
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <HistoryGraphic series={transformedCategories[lastEntry[0]]} categoryType={lastEntry[0]} />
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default memo(GeneralHistoryCard)
