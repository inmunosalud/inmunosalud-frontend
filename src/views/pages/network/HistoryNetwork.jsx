import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, Tabs, Box, Tab } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import { HistoryNetworkGraphic } from 'src/views/components/graphics/HistoryNetworkGraphic'
export const HistoryNetwork = ({ network }) => {
  const theme = useTheme()
  const [selectedNetworkYear, setSelectedNetworkYear] = useState(new Date().getFullYear().toString())
  const [dataSeriesNetworkHistory, setDataSeriesNetworkHistory] = useState([
    {
      name: new Date().getFullYear(),
      data: []
    }
  ])

  const handleNetworkYearChange = (event, newValue) => {
    if (network && newValue) {
      setSelectedNetworkYear(newValue)

      const data = [
        {
          name: newValue,
          data: network[newValue]
        }
      ]
      setDataSeriesNetworkHistory(data)
    }
  }

  useEffect(() => {
    if (network) {
      const data = [
        {
          name: selectedNetworkYear,
          data: network?.[selectedNetworkYear] || []
        }
      ]
      setDataSeriesNetworkHistory(data)
    }
  }, [network])

  return (
    <>
      <CardContent>
        <Box
          sx={{
            textAlign: 'center'
          }}
        >
          <Box>
            <Tabs
              value={selectedNetworkYear}
              onChange={(event, newValue) => handleNetworkYearChange(event, newValue)}
              indicatorColor='primary'
              textColor='primary'
              centered
              sx={{
                mt: '10px'
              }}
            >
              {Object.keys(network || {}).map(year => (
                <Tab id={year} key={year} label={year} value={year} />
              ))}
            </Tabs>
          </Box>
          <Box
            sx={{
              mt: '70px'
            }}
          >
            <HistoryNetworkGraphic dataSeriesNetworkHistory={dataSeriesNetworkHistory} />
          </Box>
        </Box>
      </CardContent>
    </>
  )
}
