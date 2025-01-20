import React, { useState, useEffect } from 'react'
import { CardContent, Tabs, Box, Tab } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { HistoryCommissionGraphic } from 'src/views/components/graphics/HistoryCommissionsGraphic'

export const HistoryCommission = ({ commissions, cutoffDay }) => {
  const theme = useTheme()
  const today = new Date()

  const calculateDefaultYearMonth = () => {
    if (today.getDate() < cutoffDay) {
      const previousMonth = new Date(today.getFullYear(), today.getMonth() - 1)
      return previousMonth.getFullYear().toString()
    }
    return today.getFullYear().toString()
  }

  const defaultYear = calculateDefaultYearMonth()

  const [selectedCommissionsYear, setSelectedCommissionsYear] = useState(defaultYear)
  const [dataSeriesCommissionsHistory, setDataSeriesCommissionsHistory] = useState([
    {
      name: defaultYear,
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
      const data = [{ name: selectedCommissionsYear, data: commissions?.[selectedCommissionsYear] || [] }]
      setDataSeriesCommissionsHistory(data)
    }
  }, [commissions, selectedCommissionsYear])

  return (
    <CardContent sx={{ textAlign: 'center' }}>
      <Box>
        <Box>
          <Tabs
            value={selectedCommissionsYear}
            onChange={(event, newValue) => handleCommissionsYearChange(event, newValue)}
            indicatorColor='primary'
            textColor='primary'
            centered
          >
            {Object.keys(commissions || {}).map(year => (
              <Tab id={year} key={year} label={year} value={year} />
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
