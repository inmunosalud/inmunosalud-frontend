import React, { useState, useEffect } from 'react'
import { CardContent, Tabs, Box, Tab } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { HistoryCommissionGraphic } from 'src/views/components/graphics/HistoryCommissionsGraphic'

export const HistoryCommission = ({ commissions }) => {
  // Eliminamos cutoffDay de las props
  const theme = useTheme()
  const currentYear = new Date().getFullYear().toString() // Obtenemos directamente el año actual

  const [selectedCommissionsYear, setSelectedCommissionsYear] = useState(currentYear)
  const [dataSeriesCommissionsHistory, setDataSeriesCommissionsHistory] = useState([
    {
      name: currentYear,
      data: []
    }
  ])

  const handleCommissionsYearChange = (event, newValue) => {
    if (commissions && newValue) {
      setSelectedCommissionsYear(newValue)
      const data = [{ name: newValue, data: commissions[newValue] }]
      setDataSeriesCommissionsHistory(data)
    }
  }

  useEffect(() => {
    if (commissions) {
      const data = [
        {
          name: selectedCommissionsYear,
          data: commissions?.[selectedCommissionsYear] || []
        }
      ]
      setDataSeriesCommissionsHistory(data)
    }
  }, [commissions, selectedCommissionsYear])

  return (
    <CardContent sx={{ textAlign: 'center' }}>
      <Box>
        <Box>
          <Tabs
            value={selectedCommissionsYear}
            onChange={handleCommissionsYearChange}
            indicatorColor='primary'
            textColor='primary'
            centered
          >
            {Object.keys(commissions || {}).map(year => (
              <Tab key={year} label={year} value={year} />
            ))}
          </Tabs>
        </Box>
        <Box>
          <HistoryCommissionGraphic dataSeriesCommissionsHistory={dataSeriesCommissionsHistory} />
        </Box>
      </Box>
    </CardContent>
  )
}
