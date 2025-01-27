import React, { useState, useEffect } from 'react'
import { Card, CardContent, Tabs, Box, Tab } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { HistoryNetworkGraphic } from 'src/views/components/graphics/HistoryNetworkGraphic'

export const HistoryNetwork = ({ users }) => {
  const theme = useTheme()
  const currentYear = new Date().getFullYear().toString()

  const [selectedNetworkYear, setSelectedNetworkYear] = useState(currentYear)
  const [dataSeriesNetworkHistory, setDataSeriesNetworkHistory] = useState([
    {
      name: currentYear,
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
            onChange={handleNetworkYearChange}
            indicatorColor='primary'
            textColor='primary'
            centered
          >
            {Object.keys(users || {}).map(year => (
              <Tab key={year} label={year} value={year} />
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
