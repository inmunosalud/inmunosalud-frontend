import React from 'react'
import { Tabs, Tab } from '@mui/material'

const SimpleTabs = ({ tabSelected, onTabChange, tabs }) => {
  const handleChange = (event, newValue) => {
    onTabChange(newValue + 1)
  }

  return (
    <Tabs
      value={tabSelected - 1}
      onChange={handleChange}
      aria-label='tabs'
      variant='scrollable'
      scrollButtons
      allowScrollButtonsMobile
    >
      {tabs.map((tab, index) => (
        <Tab key={index} label={tab} />
      ))}
    </Tabs>
  )
}

export default SimpleTabs
