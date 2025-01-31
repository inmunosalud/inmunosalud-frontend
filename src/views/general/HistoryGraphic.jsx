import React, { useState, useEffect, useMemo, memo } from 'react'
import { CardContent, Tabs, Box, Tab, Typography } from '@mui/material'
import { HistoryLineMultipleGraphic } from 'src/views/components/graphics/HistoryLineMultipleGraphic'
import { HistoryLineDualGraphic } from 'src/views/components/graphics/HistoryLineDualGraphic'

const MemoizedHistoryLineGraphic = memo(HistoryLineMultipleGraphic)
const MemoizedHistoryDualGraphic = memo(HistoryLineDualGraphic)

export const HistoryGraphic = ({ series, categoryType }) => {
  const isDualChart = ['commissions', 'sales'].includes(categoryType)
  const [selectedNetworkYear, setSelectedNetworkYear] = useState(null)
  const availableYears = useMemo(() => {
    if (!series) return []
    return Object.keys(series).filter(year => {
      const yearData = series[year]

      if (categoryType === 'products') {
        // Validación para productos
        return yearData?.some(product => product.yearlyData?.some(d => d.counts?.some(val => val > 0)))
      }
      if (isDualChart) {
        // Validación para gráficas duales (commissions/sales)
        const hasCounts = yearData.counts?.some(val => val > 0)
        const hasAmounts = yearData.amounts?.some(val => val > 0)
        return hasCounts || hasAmounts
      }
      // Validación para gráficas normales (users/orders)
      if (categoryType === 'orders') {
        return yearData.monthly?.some(val => val > 0)
      }
      return yearData?.some(val => val > 0)
    })
  }, [series, categoryType, isDualChart])

  const dataSeriesHistory = useMemo(() => {
    if (!series || !series[selectedNetworkYear]) return []

    if (isDualChart) {
      const { counts, amounts } = series[selectedNetworkYear]
      return [[{ name: 'Cantidad', data: counts || [] }], [{ name: 'Monto', data: amounts || [] }]]
    }

    if (categoryType === 'products') {
      return series[selectedNetworkYear]
        .filter(product => product.yearlyData?.some(d => d.counts?.some(val => val > 0)))
        .map(product => ({
          name: product.product,
          data: product.yearlyData.find(d => d.year === selectedNetworkYear)?.counts || []
        }))
    }

    if (categoryType === 'orders') {
      return [
        {
          name: selectedNetworkYear,
          data: series[selectedNetworkYear].monthly
        }
      ]
    }

    return [{ name: selectedNetworkYear, data: series[selectedNetworkYear] }]
  }, [series, selectedNetworkYear, categoryType, isDualChart])

  const handleNetworkYearChange = (event, newValue) => {
    setSelectedNetworkYear(newValue)
  }

  useEffect(() => {
    if (availableYears.length > 0 && !selectedNetworkYear) {
      setSelectedNetworkYear(availableYears[0])
    }
  }, [availableYears, selectedNetworkYear])

  useEffect(() => {
    if (availableYears.length > 0 && !availableYears.includes(selectedNetworkYear)) {
      setSelectedNetworkYear(availableYears[0])
    }
  }, [availableYears])

  if (!availableYears.length || !selectedNetworkYear) {
    return (
      <Typography variant='body2' sx={{ py: 4 }}>
        No hay datos disponibles
      </Typography>
    )
  }

  return (
    <>
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
            {isDualChart ? (
              <MemoizedHistoryDualGraphic dataSeriesHistory={dataSeriesHistory} category={categoryType} />
            ) : (
              <MemoizedHistoryLineGraphic dataSeriesHistory={dataSeriesHistory} />
            )}
          </Box>
        </Box>
      </CardContent>
    </>
  )
}
