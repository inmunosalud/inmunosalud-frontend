import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import moment from 'moment'
// ** MUI Imports
import { Box, Card, CircularProgress, TextField, Grid, Button, IconButton, Tooltip, Stack } from '@mui/material'
import CardHeader from '@mui/material/CardHeader'
import SearchIcon from '@mui/icons-material/Search'
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
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [disabled, setDisabled] = useState(true)
  const { isMobile } = useSelector(state => state.dashboard.general)

  const headers = isMobile
    ? [{ name: 'Nombre', xs: 12, lg: 1 }]
    : [
        { name: 'Nombre', xs: 1, lg: 3 },
        ...(user.profile === 'Administrador General' ? [{ name: 'Correo', xs: 3, lg: 3 }] : []),
        { name: 'Perfil', xs: 2, lg: 2 },
        ...(user.profile === 'Supervisor de Usuarios' ? [{ name: 'Recomendado por', xs: 3, lg: 3 }] : []),
        { name: 'Consumo', xs: 3, lg: 1 },
        { name: 'Commission', xs: 3, lg: 1 },
        { name: 'Estatus', xs: 3, lg: 1 },
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

  const handleFilterSubmit = () => {
    if (startDate && endDate) {
      dispatch(
        usersList({ startDate: moment(startDate).format('YYYY-MM-DD'), endDate: moment(endDate).format('YYYY-MM-DD') })
      )
    }
  }

  useEffect(() => {
    dispatch(usersList({ startDate, endDate }))
  }, [dispatch])

  useEffect(() => {
    if (startDate && endDate) {
      setDisabled(false)
    }
  }, [startDate, endDate])

  const accordionData = users || []
  const paginatedData = accordionData.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return !loading ? (
    <Box sx={{ mt: '10px' }}>
      <Card>
        <CardHeader
          title='Usuarios'
          action={
            <Stack
              direction={isMobile ? 'column' : 'row'}
              spacing={isMobile ? 2 : 0}
              sx={{
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'flex-end',
                '& > *': {
                  marginBottom: isMobile ? 1 : 0
                }
              }}
            >
              <TextField
                label='Fecha de inicio'
                type='date'
                size='small'
                sx={{ width: '200px', mr: { xs: 0, lg: 2 } }}
                InputLabelProps={{ shrink: true }}
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                inputProps={{ pattern: '\\d{2}-\\d{2}-\\d{4}' }}
              />
              <TextField
                label='Fecha final'
                type='date'
                size='small'
                sx={{ width: '200px', mr: { xs: 0, lg: 2 } }}
                InputLabelProps={{ shrink: true }}
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                inputProps={{ pattern: '\\d{2}-\\d{2}-\\d{4}' }}
              />
              <Button
                disabled={disabled}
                size={'small'}
                color='primary'
                variant='outlined'
                startIcon={<SearchIcon />}
                onClick={handleFilterSubmit}
              >
                Buscar
              </Button>
            </Stack>
          }
        />
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
