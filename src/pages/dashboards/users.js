import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

// ** MUI Imports
import { Box, Card, CircularProgress } from '@mui/material'
import CardHeader from '@mui/material/CardHeader'
// ** Styled Component Import

//actions
import { usersList, setModal, setModalRow, setModalDelete, setShowConfirmModal } from 'src/store/users'

//Components
import UsersAccordion from 'src/views/components/accordion/UsersAccordion.js'
import SimpleHeader from 'src/views/components/headers/SimpleHeader.js'
import SimplePagination from 'src/views/components/pagination/SimplePagination.js'
import SimpleTabs from 'src/views/components/tabs/SimpleTabs.js'

const Users = () => {
  const dispatch = useDispatch()
  const { showModal, modalRow, showDelete, users, loading } = useSelector(state => state.users)
  const { user } = useSelector(state => state.session)
  const [page, setPage] = useState(1)
  const [selectedLevel, setSelectedLevel] = useState(1)
  const [expandedAccordions, setExpandedAccordions] = useState({})
  const headers = [
    { name: 'Nombre', xs: 1, lg: 1.5 },
    { name: 'Correo', xs: 3, lg: 2 },
    { name: 'Perfil', xs: 2, lg: 1 },
    { name: 'Recomendado por', xs: 3, lg: 2 },
    { name: 'Consumo', xs: 3, lg: 1.5 },
    { name: 'Commission', xs: 3, lg: 1.5 },
    { name: 'Estatus', xs: 3, lg: 1.5 },
    ...(user.profile === 'Administrador General' ? [{ name: 'Acciones', xs: 3, lg: 1 }] : [])
  ]
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

  useEffect(() => {
    dispatch(usersList())
  }, [dispatch])

  const accordionData = users || []
  const paginatedData = accordionData.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return !loading ? (
    <Box sx={{ mt: '10px' }}>
      <Card>
        <CardHeader title='Usuarios' />
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
        <UsersAccordion
          data={paginatedData}
          selectedLevel={selectedLevel}
          expandedAccordions={expandedAccordions}
          onAccordionChange={handleAccordionChange}
        />
      </Box>
    </Box>
  ) : (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <CircularProgress />
    </Box>
  )
}

export default Users
