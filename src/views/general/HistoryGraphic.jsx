import React, { useState, useEffect, useMemo, memo } from 'react'
import { CardContent, Tabs, Box, Tab } from '@mui/material'
import { HistoryLineGraphic } from 'src/views/components/graphics/HistoryLineGraphic'

// Memoizamos el componente gráfico para evitar re-renders innecesarios
const MemoizedHistoryLineGraphic = memo(HistoryLineGraphic)

export const HistoryGraphic = ({ series }) => {
  const currentYear = new Date().getFullYear().toString()
  const [selectedNetworkYear, setSelectedNetworkYear] = useState(currentYear)

  // Memoizamos los años disponibles para evitar recálculos
  const availableYears = useMemo(() => Object.keys(series || {}), [series])

  // Memoizamos la transformación de datos
  const dataSeriesNetworkHistory = useMemo(() => {
    if (!series || !series[selectedNetworkYear]) return []
    return [{ name: selectedNetworkYear, data: series[selectedNetworkYear] }]
  }, [series, selectedNetworkYear])

  // Memoizamos las pestañas para prevenir re-renders
  const yearTabs = useMemo(
    () => availableYears.map(year => <Tab key={year} label={year} value={year} />),
    [availableYears]
  )

  const handleNetworkYearChange = (event, newValue) => {
    if (newValue) setSelectedNetworkYear(newValue)
  }

  return (
    <CardContent>
      <Box sx={{ textAlign: 'center' }}>
        <Box>
          <Tabs
            value={selectedNetworkYear}
            onChange={handleNetworkYearChange}
            indicatorColor='primary'
            textColor='primary'
            centered
            variant='scrollable'
            scrollButtons='auto'
          >
            {yearTabs}
          </Tabs>
        </Box>
        <Box sx={{ mt: '20px' }}>
          <MemoizedHistoryLineGraphic dataSeriesHistory={dataSeriesNetworkHistory} />
        </Box>
      </Box>
    </CardContent>
  )
}
