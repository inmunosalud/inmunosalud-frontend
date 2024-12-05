import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Box, Card, CardHeader } from '@mui/material'
import SimpleTabs from 'src/views/components/tabs/SimpleTabs.js'
import SimplePagination from 'src/views/components/pagination/SimplePagination.js'
import SimpleHeader from 'src/views/components/headers/SimpleHeader.js'
import NetworkAccordion from 'src/views/components/accordion/NetworkAccordion.js'
import { NetworkList } from 'src/views/components/list/NetworkList.js'

export const NetworkDetails = () => {
  const { network } = useSelector(state => state.users)
  const [page, setPage] = useState(1)
  const [selectedLevel, setSelectedLevel] = useState(1)
  const [expandedAccordions, setExpandedAccordions] = useState({})
  const headers = [
    { name: 'ID', xs: 1, lg: 1 },
    { name: 'Nombre', xs: 3, lg: 3 },
    { name: 'Perfil', xs: 2, lg: 2 },
    { name: 'Recomendado por', xs: 3, lg: 3 },
    { name: 'Consumo', xs: 3, lg: 3 }
  ]
  const tabs = ['Nivel 1', 'Nivel 2', 'Nivel 3', 'Nivel 4']
  const itemsPerPage = 10

  const handleTabChange = level => {
    setSelectedLevel(level)
    setPage(1)
    setExpandedAccordions({})
  }

  const handlePageChange = newPage => {
    setPage(newPage)
    setExpandedAccordions({})
  }

  const handleAccordionChange = id => {
    setExpandedAccordions(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const accordionData = network?.network?.[selectedLevel] || []
  const paginatedData = accordionData.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return (
    <Box sx={{ mt: '10px' }}>
      <Card>
        <CardHeader title='Detalles de tu red' />
        <SimpleTabs tabs={tabs} tabSelected={selectedLevel} onTabChange={handleTabChange} />
        {accordionData.length > itemsPerPage && (
          <SimplePagination
            totalItems={accordionData.length}
            itemsPerPage={itemsPerPage}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        )}
      </Card>
      <Card sx={{ mt: '5px', mb: '2px' }}>
        <SimpleHeader headers={headers} />
      </Card>
      <Box>
        <NetworkAccordion
          data={paginatedData}
          selectedLevel={selectedLevel}
          expandedAccordions={expandedAccordions}
          onAccordionChange={handleAccordionChange}
        />
      </Box>
    </Box>
  )
}
