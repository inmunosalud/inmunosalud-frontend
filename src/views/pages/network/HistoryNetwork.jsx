import React, { useState, useEffect } from 'react'
import { Card, CardContent, Tabs, Box, Tab } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { HistoryNetworkGraphic } from 'src/views/components/graphics/HistoryNetworkGraphic'

export const HistoryNetwork = ({ users, cutoffDay }) => {
  const theme = useTheme()
  const today = new Date()

  // Determine the selected year and month based on the cutoff date
  const calculateDefaultYearMonth = () => {
    if (today.getDate() < cutoffDay) {
      const previousMonth = new Date(today.getFullYear(), today.getMonth() - 1)
      return {
        year: previousMonth.getFullYear().toString(),
        month: (previousMonth.getMonth() + 1).toString().padStart(2, '0')
      }
    }
    return {
      year: today.getFullYear().toString(),
      month: (today.getMonth() + 1).toString().padStart(2, '0')
    }
  }

  const { year: defaultYear } = calculateDefaultYearMonth()
  const [selectedNetworkYear, setSelectedNetworkYear] = useState(defaultYear)
  const [dataSeriesNetworkHistory, setDataSeriesNetworkHistory] = useState([
    {
      name: defaultYear,
      data: []
    }
  ])

  const handleNetworkYearChange = (event, newValue) => {
    if (users && newValue) {
      setSelectedNetworkYear(newValue)

      const data = [
        {
          name: newValue,
          data: users[newValue]
        }
      ]
      setDataSeriesNetworkHistory(data)
    }
  }

  useEffect(() => {
    if (users) {
      const data = [
        {
          name: selectedNetworkYear,
          data: users?.[selectedNetworkYear] || []
        }
      ]
      setDataSeriesNetworkHistory(data)
    }
  }, [users, selectedNetworkYear])

  return (
    <CardContent>
      <Box sx={{ textAlign: 'center' }}>
        <Box>
          <Tabs
            value={selectedNetworkYear}
            onChange={(event, newValue) => handleNetworkYearChange(event, newValue)}
            indicatorColor='primary'
            textColor='primary'
            centered
          >
            {Object.keys(users || {}).map(year => (
              <Tab id={year} key={year} label={year} value={year} />
            ))}
          </Tabs>
        </Box>
        <Box sx={{ mt: '20px' }}>
          <HistoryNetworkGraphic dataSeriesNetworkHistory={dataSeriesNetworkHistory} />
        </Box>
      </Box>
    </CardContent>
  )
}
