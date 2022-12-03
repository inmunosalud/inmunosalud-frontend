// ** React Import
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CustomSnackbar from 'src/views/components/snackbar/CustomSnackbar'
import { DataGrid } from '@mui/x-data-grid'
import { getLocaleText } from '../../../configs/defaultLocaleText'

import { Pencil, Delete } from 'mdi-material-ui'

import Modal from './Modal'

import { usersList, setModal, setModalRow, deleteUser } from 'src/store/users'
import { closeSnackBar } from 'src/store/notifications'
import { columns } from './configTable'

const TableUsers = () => {
  const dispatch = useDispatch()
  const [pageSize, setPageSize] = React.useState(5)

  const { showModal, modalRow } = useSelector(state => state.users)
  const { open, message, severity } = useSelector(state => state.notifications)
  const { users, loading } = useSelector(state => state.users)

  React.useEffect(() => {
    dispatch(usersList())
  }, [dispatch])

  const saveItemModal = row => {
    dispatch(setModalRow(row))
    dispatch(setModal(true))
  }

  const handleModal = () => {
    dispatch(setModal(false))
  }

  const deleteItem = row => {
    dispatch(deleteUser(row))
  }

  const config = [
    ...columns,
    /* edit only by Admin and rules admin and product admin */
    {
      flex: 0.125,
      minWidth: 100,
      field: 'actions',
      headerName: 'Acciones',
      renderCell: params => {
        const row = params?.row
        return (
          <Typography variant='body2' sx={{ color: '#6495ED', cursor: 'pointer' }}>
            <Pencil sx={{ margin: '5px' }} onClick={() => saveItemModal(row)} />
            <Delete sx={{ margin: '5px' }} onClick={() => deleteItem(row)} />
          </Typography>
        )
      }
    }
  ]

  return (
    <>
      <Card>
        <CardHeader title='Usuarios' />
        <DataGrid
          autoHeight
          rows={users}
          getRowId={row => `${row.id}${row.firstName}`}
          columns={config}
          pageSize={pageSize}
          rowsPerPageOptions={[7, 10, 25, 50]}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          localeText={getLocaleText()}
          loading={loading}
        />
      </Card>
      <Modal label='Editar usuario' open={showModal} handleModal={handleModal} item={modalRow} />
      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
    </>
  )
}

export default TableUsers
