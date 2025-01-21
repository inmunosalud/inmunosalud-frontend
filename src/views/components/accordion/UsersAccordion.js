import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  Typography
} from '@mui/material'
import { AccountCancelOutline, AccountCheckOutline } from 'mdi-material-ui'
import { useEffect, useState } from 'react'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useTheme } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import CustomChip from 'src/@core/components/mui/chip'
import { getNetworkDetails } from 'src/store/users'
import { NetworkList } from 'src/views/components/list/NetworkList'
import SimpleTabs from 'src/views/components/tabs/SimpleTabs'
import { HistoryNetwork } from 'src/views/pages/network/HistoryNetwork'

// ** MUI Imports
import { usersList, setModal, setModalRow, setModalDelete, setShowConfirmModal } from 'src/store/users'
import DialogDelete from 'src/views/components/dialogs/DialogDelete'
import Modal from 'src/views/dashboards/users/Modal.js'

import { Delete, Pencil } from 'mdi-material-ui'

const UsersAccordion = ({ data, selectedLevel, expandedAccordions, onAccordionChange }) => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const { networkDetails, loadingDetails } = useSelector(state => state.users)
  const { showModal, modalRow, showDelete } = useSelector(state => state.users)

  const { user } = useSelector(state => state.session)
  const networkLevels = selectedLevel === 1 ? [1, 2, 3] : selectedLevel === 2 ? [1, 2] : [1]
  const tabs =
    selectedLevel === 4
      ? ['informacion del usuario', 'Crecimiento de su red', 'Historial de pedidos']
      : ['Informacion del usuario', 'Red', 'Crecimiento de su red', 'Historial de pedidos']
  // Estado local para controlar la pestaña seleccionada
  const [selectedTabs, setSelectedTabs] = useState({})

  const handleAccordionToggle = (isExpanded, userId) => {
    onAccordionChange(userId)

    if (isExpanded && !networkDetails[userId]) {
      dispatch(getNetworkDetails(userId))
    }
  }

  const handleTabChange = (userId, newTab) => {
    setSelectedTabs(prev => ({ ...prev, [userId]: newTab }))
  }
  const saveItemModal = row => {
    dispatch(setModalRow(row))
    dispatch(setModal(true))
  }

  const handleModal = () => {
    dispatch(setModal(false))
  }

  const setItemDeleteModal = row => {
    dispatch(setModalRow(row))
    dispatch(setModalDelete(true))
  }

  const closeDelete = () => {
    dispatch(setShowConfirmModal(false))
    dispatch(setModalDelete(false))
  }

  useEffect(() => {
    const resetTabs = {}
    data.forEach(item => {
      resetTabs[item.id] = 1
    })
    setSelectedTabs(resetTabs)
  }, [selectedLevel, data])

  return (
    <Box sx={{ minHeight: '500px' }}>
      {data.map((item, index) => {
        const selectedTab = selectedTabs[item.id] || 1
        return (
          <Accordion
            key={index}
            expanded={!!expandedAccordions[item.id]}
            onChange={(event, isExpanded) => handleAccordionToggle(isExpanded, item.id)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Grid container spacing={2}>
                <Grid item xs={1} lg={1.5}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography>{item.name}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={3} lg={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography>{item.email}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={2} lg={1}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CustomChip
                      skin='light'
                      size='small'
                      label={item.profile}
                      color={item.profile === 'Afiliado' ? 'success' : 'primary'}
                      sx={{
                        height: 20,
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        borderRadius: '5px',
                        textTransform: 'capitalize'
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={3} lg={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography>{item.recommenderName}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={3} lg={1.5}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CustomChip
                      skin='light'
                      size='small'
                      label={`$${item.overallConsumption}`}
                      color={item.overallConsumption > 0 ? 'success' : 'error'}
                      sx={{
                        height: 20,
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        borderRadius: '5px',
                        textTransform: 'capitalize'
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={3} lg={1.5}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography>{item.commission}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={3} lg={1.5}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CustomChip
                      skin='dark'
                      size='small'
                      label={item.isValid ? <AccountCheckOutline /> : <AccountCancelOutline />}
                      color={item.isValid ? 'success' : 'error'}
                      sx={{
                        height: 25,
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        borderRadius: '5px',
                        textTransform: 'capitalize'
                      }}
                    />
                  </Box>
                </Grid>
                {user.profile === 'Administrador General' && (
                  <Grid item xs={3} lg={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {item?.profile?.includes('Admin') ? (
                        <Button
                          onClick={e => {
                            e.stopPropagation()
                            saveItemModal(item)
                          }}
                          color='warning'
                          size='small'
                        >
                          <Pencil />
                        </Button>
                      ) : (
                        <Button disableRipple disabled />
                      )}
                      <Button
                        onClick={e => {
                          e.stopPropagation()
                          setItemDeleteModal(item)
                        }}
                        color='error'
                        size='small'
                      >
                        <Delete />
                      </Button>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </AccordionSummary>
            <Divider />
            <AccordionDetails sx={{ minHeight: '650px' }}>
              {loadingDetails[item.id] ? (
                <Box
                  sx={{
                    height: '60vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                >
                  <CircularProgress color='primary' size={50} />
                </Box>
              ) : (
                <>
                  {/* Tabs */}
                  <SimpleTabs
                    tabSelected={selectedTab}
                    onTabChange={newTab => handleTabChange(item.id, newTab)}
                    tabs={tabs}
                  />
                  <Grid container spacing={2}>
                    {selectedTab === 1 && (
                      <Grid item xs={12}>
                        <Box sx={{ mt: '50px' }}>
                          <CardContent>
                            <Grid container spacing={2} sx={{ mt: 4 }}>
                              <Grid item xs={12} lg={6}>
                                {/* Nombre Completo */}
                                <Typography variant='body1' sx={{ mt: 4 }}>
                                  <strong>Nombre:</strong>{' '}
                                  {`${networkDetails[item.id]?.user.firstName} ${networkDetails[item.id]?.user.lastName}`}
                                </Typography>

                                {/* Correo Electrónico */}
                                <Typography variant='body1' sx={{ mt: 4 }}>
                                  <strong>Correo Electrónico:</strong> {networkDetails[item.id]?.user.email}
                                </Typography>

                                {/* Fecha de Nacimiento */}
                                <Typography variant='body1' sx={{ mt: 4 }}>
                                  <strong>Fecha de Nacimiento:</strong> {networkDetails[item.id]?.user.birthdate}
                                </Typography>

                                {/* Teléfono */}
                                <Typography variant='body1' sx={{ mt: 4 }}>
                                  <strong>Teléfono:</strong> {networkDetails[item.id]?.user.phone}
                                </Typography>

                                {/* Género */}
                                <Typography variant='body1' sx={{ mt: 4 }}>
                                  <strong>Género:</strong> {networkDetails[item.id]?.user.gender}
                                </Typography>

                                {/* Dirección de Envío */}
                                <Typography variant='body1' sx={{ mt: 4 }}>
                                  <strong>Dirección de Envío:</strong>
                                </Typography>

                                {networkDetails[item.id]?.user.shippingAddress.street && (
                                  <Typography variant='body2'>
                                    {`${networkDetails[item.id]?.user.shippingAddress.street} ${networkDetails[item.id]?.user.shippingAddress.extNumber}, 
                                ${networkDetails[item.id]?.user.shippingAddress.neighborhood}, 
                                ${networkDetails[item.id]?.user.shippingAddress.city}, 
                                ${networkDetails[item.id]?.user.shippingAddress.federalEntity}, 
                                CP: ${networkDetails[item.id]?.user.shippingAddress.zipCode}, 
                                ${networkDetails[item.id]?.user.shippingAddress.country}`}
                                  </Typography>
                                )}

                                <Typography variant='body2' sx={{ mt: 4 }}>
                                  <strong>Referencia:</strong> {networkDetails[item.id]?.user.shippingAddress.refer}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} lg={6}>
                                <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                                  <Typography variant='h5' color='primary' sx={{ fontSize: '1.5rem' }}>
                                    <strong>Comisión Generada:</strong> ${networkDetails[item.id]?.myCommissionFromUser}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Box>
                      </Grid>
                    )}
                    {selectedLevel !== 4 && selectedTab === 2 && (
                      <Grid item xs={12}>
                        <Box sx={{ pt: '50px' }}>
                          <Typography variant='h6' color='textPrimary' textAlign={'center'} sx={{ mb: '40px' }}>
                            <strong>
                              Total de usuarios en su red:{' '}
                              <span style={{ color: theme.palette.primary.main }}>
                                {networkDetails[item.id]?.network.totalUsers || '0'}
                              </span>
                            </strong>
                          </Typography>
                          <Grid container spacing={2}>
                            {networkLevels.map(level => (
                              <Grid item xs={12} lg={4} key={level}>
                                <Typography variant='h4' color='textPrimary' textAlign='center'>
                                  Nivel {level}:{' '}
                                  <span style={{ color: theme.palette.primary.main }}>
                                    {networkDetails[item.id]?.network[level]?.length || 0}
                                  </span>
                                </Typography>
                                <NetworkList users={networkDetails[item.id]?.network[level]} />
                              </Grid>
                            ))}
                          </Grid>
                        </Box>
                      </Grid>
                    )}
                    {selectedTab === (selectedLevel === 4 ? 2 : 3) && (
                      <Grid item xs={12}>
                        <Box sx={{ pt: '50px', mb: '-400px' }}>
                          <Typography variant='h6' color='textPrimary' textAlign={'center'}>
                            <strong>Crecimiento de la red</strong>
                          </Typography>
                          <HistoryNetwork network={networkDetails[item.id]?.growingYourNetwork} />
                        </Box>
                      </Grid>
                    )}
                    {selectedTab === (selectedLevel === 4 ? 3 : 4) && (
                      <Grid item xs={12}>
                        <Box sx={{ p: '50px', maxHeight: '650px', overflowY: 'auto' }}>
                          {networkDetails[item.id]?.orders.length > 0 ? (
                            <Grid container spacing={3}>
                              {networkDetails[item.id]?.orders?.map(order => (
                                <Grid item xs={12} md={6} key={order.id}>
                                  <Card>
                                    <CardContent>
                                      {/* Descripción del pedido */}
                                      <Typography variant='h6' color='textPrimary'>
                                        {order.description}
                                      </Typography>
                                      {/* Fecha de compra */}
                                      <Typography variant='body2' color='textSecondary' sx={{ mt: 1 }}>
                                        <strong>Folio:</strong> {order.folio}
                                      </Typography>
                                      <Typography variant='body2' color='textSecondary'>
                                        <strong>Fecha de Compra:</strong> {order.purchaseDate}
                                      </Typography>
                                      {/* Total */}
                                      <Typography variant='body2' color='textSecondary'>
                                        <strong>Total:</strong> ${order.total}
                                      </Typography>
                                      {/* Estado de entrega */}
                                      <Typography variant='body2' color='textSecondary'>
                                        <strong>Estado de Entrega:</strong>
                                        <CustomChip
                                          skin='light'
                                          size='small'
                                          label={order.deliveryStatus}
                                          color={
                                            order.deliveryStatus === 'Entregado'
                                              ? 'success'
                                              : order.deliveryStatus === 'Cancelado'
                                                ? 'error'
                                                : order.deliveryStatus === 'Está en camino'
                                                  ? 'info'
                                                  : order.deliveryStatus === 'Confirmando el Pago'
                                                    ? 'warning'
                                                    : 'primary'
                                          }
                                          sx={{
                                            height: 20,
                                            fontSize: '0.875rem',
                                            fontWeight: 600,
                                            borderRadius: '5px',
                                            textTransform: 'capitalize'
                                          }}
                                        />
                                      </Typography>
                                      {/* Tipo de pedido */}
                                      <Typography variant='body2' color='textSecondary'>
                                        <strong>Tipo:</strong> {order.type === 'store' ? 'Tienda' : 'Tarjeta'}
                                      </Typography>
                                      {/* Seguimiento del envío */}
                                      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button
                                          variant='outlined'
                                          color='primary'
                                          href={order.shipmentTrackingUrl}
                                          target='_blank'
                                          disabled={!order.shipmentTrackingUrl}
                                          rel='noopener noreferrer'
                                        >
                                          Ver Seguimiento
                                        </Button>
                                      </Box>
                                    </CardContent>
                                  </Card>
                                </Grid>
                              ))}
                            </Grid>
                          ) : (
                            <Box
                              sx={{
                                height: '60vh',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                justifyContent: 'center'
                              }}
                            >
                              <Typography variant='body2' color='textSecondary' textAlign={'center'}>
                                No hay ordenes para mostrar
                              </Typography>{' '}
                            </Box>
                          )}
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                </>
              )}
            </AccordionDetails>
          </Accordion>
        )
      })}
      <DialogDelete
        item={modalRow}
        open={showDelete}
        handleClose={closeDelete}
        content='Estas seguro de eliminar al usuario?'
        buttonText='Eliminar'
      />
      <Modal
        label='Editar Administrador'
        open={showModal}
        handleModal={handleModal}
        item={modalRow}
        isAdministrator={true}
      />
    </Box>
  )
}

export default UsersAccordion
