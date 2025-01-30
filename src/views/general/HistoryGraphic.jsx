import React, { useState, useMemo, memo } from 'react'
import { CardContent, Tabs, Box, Tab, Typography } from '@mui/material'
import { HistoryLineMultipleGraphic } from 'src/views/components/graphics/HistoryLineMultipleGraphic'

const MemoizedHistoryLineGraphic = memo(HistoryLineMultipleGraphic)

export const HistoryGraphic = ({ series, categoryType }) => {
  const [selectedNetworkYear, setSelectedNetworkYear] = useState(() => {
    const availableYears = Object.keys(series || {})
    return availableYears.length > 0 ? availableYears[0] : ''
  })

  const availableYears = useMemo(() => {
    if (!series) return []
    return Object.keys(series).filter(year => {
      if (categoryType === 'products') {
        return series[year]?.some(product => product.data.some(val => val > 0))
      }
      return true
    })
  }, [series, categoryType])

  const dataSeriesNetworkHistory = useMemo(() => {
    if (!series || !series[selectedNetworkYear]) return []

    if (categoryType === 'products') {
      // Manejo de productos (múltiples series)
      return Array.isArray(series[selectedNetworkYear])
        ? series[selectedNetworkYear].filter(serie => serie.data?.some(val => val > 0))
        : []
    } else {
      // Manejo de otras categorías (single series)
      const categoryData = series[selectedNetworkYear]
      const hasData = Array.isArray(categoryData) ? categoryData.some(val => val > 0) : false

      return hasData ? [{ name: selectedNetworkYear, data: categoryData }] : []
    }
  }, [series, selectedNetworkYear, categoryType])

  const handleNetworkYearChange = (event, newValue) => {
    setSelectedNetworkYear(newValue)
  }

  if (!availableYears.length) {
    return (
      <Typography variant='body2' sx={{ py: 4 }}>
        No hay datos disponibles
      </Typography>
    )
  }

  return (
    <CardContent>
      <Box sx={{ textAlign: 'center' }}>
        <Tabs
          value={selectedNetworkYear}
          onChange={handleNetworkYearChange}
          variant='scrollable'
          scrollButtons='auto'
          allowScrollButtonsMobile
        >
          {availableYears.map(year => (
            <Tab key={year} label={year} value={year} sx={{ minWidth: 80, py: 1.5 }} />
          ))}
        </Tabs>

        <Box sx={{ mt: 3 }}>
          <MemoizedHistoryLineGraphic dataSeriesHistory={dataSeriesNetworkHistory} />
        </Box>
      </Box>
    </CardContent>
  )
}
