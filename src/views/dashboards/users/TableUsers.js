// ** React Import
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CustomSnackbar from 'src/views/components/snackbar/CustomSnackbar'
import DialogDelete from 'src/views/components/dialogs/DialogDelete'
import { DataGrid } from '@mui/x-data-grid'
import { getLocaleText } from '../../../configs/defaultLocaleText'
import { Button } from '@mui/material'


import { Pencil, Delete } from 'mdi-material-ui'

import Modal from './Modal'

import { usersList, setModal, setModalRow, setModalDelete, setShowConfirmModal } from 'src/store/users'
import { closeSnackBar } from 'src/store/notifications'
import { columns } from './configTable'

const TableUsers = () => {
  const dispatch = useDispatch()
  const [pageSize, setPageSize] = React.useState(10)

  const { showModal, modalRow, showDelete, users, loading } = useSelector(state => state.users)
  const { open, message, severity } = useSelector(state => state.notifications)

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

  const setItemDeleteModal = row => {
    dispatch(setModalRow(row))
    dispatch(setModalDelete(true))
  }

  const closeDelete = () => {
    dispatch(setShowConfirmModal(false))
    dispatch(setModalDelete(false))
  }

  const config = [
    ...columns,
    {
      flex: 0.125,
      minWidth: 150,
      field: 'actions',
      headerName: 'Acciones',
      renderCell: params => {
        const row = params?.row
        return (
          <>
            {row.profile.includes('Admin') ? (
              <Button onClick={() => saveItemModal(row)} color='warning' size='small'>
                <Pencil />
              </Button>
            ) : <Button disableRipple disabled />}
            <Button onClick={() => setItemDeleteModal(row)} color='error' size='small'>
              <Delete />
            </Button>
          </>
        )
      }
    }
  ]

  return (
    <>
      <Card>
        <CardHeader title='Usuarios en el Sistema' />
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
      <DialogDelete
        item={modalRow}
        open={showDelete}
        handleClose={closeDelete}
        content='Estas seguro de eliminar al usuario?'
        buttonText='Eliminar'
      />
      <Modal label='Editar Administrador' open={showModal} handleModal={handleModal} item={modalRow} />
      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
    </>
  )
}

export default TableUsers
