// ** React Import
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CustomSnackbar from 'src/views/components/snackbar/CustomSnackbar'
import DialogDelete from 'src/views/components/dialogs/DialogDelete'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { getLocaleText } from '../../../configs/defaultLocaleText'
import { Button } from '@mui/material'
import { BasicDataGrid } from 'src/views/components/data-grid/BasicDataGrid'

import { Pencil, Delete } from 'mdi-material-ui'

import Modal from './Modal'

import { usersList, setModal, setModalRow, setModalDelete, setShowConfirmModal } from 'src/store/users'
import { closeSnackBar } from 'src/store/notifications'
import { columns } from './configTable'

const TableUsers = () => {
  const dispatch = useDispatch()
  const [pageSize, setPageSize] = React.useState(50)

  const { showModal, modalRow, showDelete, users, loading } = useSelector(state => state.users)
  const { open, message, severity } = useSelector(state => state.notifications)
  const { user } = useSelector(state => state.session)

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
    {
      flex: 0.125,
      minWidth: 150,
      field: 'actions',
      headerName: 'Acciones',
      renderCell: params => {
        const row = params?.row
        return (
          <>
            {row?.profile?.includes('Admin') ? (
              <Button onClick={() => saveItemModal(row)} color='warning' size='small'>
                <Pencil />
              </Button>
            ) : (
              <Button disableRipple disabled />
            )}
            <Button onClick={() => setItemDeleteModal(row)} color='error' size='small'>
              <Delete />
            </Button>
          </>
        )
      }
    },
    ...columns
  ]

  return (
    <>
      <Card>
        <BasicDataGrid
          data={users}
          columns={user.profile === 'Administrador General' ? config : columns}
          loading={loading}
          title='Usuarios en el Sistema'
        />
      </Card>
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
      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
    </>
  )
}

export default TableUsers
