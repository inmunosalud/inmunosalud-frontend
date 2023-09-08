import React, { useState } from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  MenuItem,
  Grid,
  FormHelperText
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import XmlViewer from 'src/views/general/XmlViewer' // Importa pdfjs para la carga del PDF
import PdfViewer from 'src/views/general/PdfViewer'
import { getLocaleText } from 'src/configs/defaultLocaleText'

const TableBilling = ({
  invoices,
  columns,
  title,
  handleClose,
  openModal,
  modalType,
  selectedInvoice,
  BILL_STATUS_SP,
  handleChangeStatus,
  handleUpdateStatus,
  SAT_SCHEMES,
  handleSchemeChange,
  handlePdfFileChange,
  handleXmlFileChange,
  handleSubmit,
  xmlFile,
  pdfFile,
  pdfError,
  xmlError
}) => {
  const [pageSize, setPageSize] = useState(5)
  const formatFileSize = bytes => {
    if (bytes === 0) return '0 bytes'
    const k = 1024
    const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
  }

  const renderModalContent = () => {
    switch (modalType) {
      case 'pdfViewer':
        return (
          <>
            <PdfViewer PDF={selectedInvoice.pdf} onClose={handleClose} title={'PDF'} />
          </>
        )
      case 'xmlViewer':
        return (
          <>
            <XmlViewer XML={selectedInvoice.xml} onClose={handleClose} title={'XML'} />
          </>
        )
      case 'updateStatus':
        return (
          <>
            <Card>
              <CardHeader title='Actualizar estado de la factura' />
              <CardContent sx={{ justifyContent: 'flex-end', mb: 2 }}>
                <TextField select label={selectedInvoice.status} onChange={handleChangeStatus} sx={{ mt: 2 }} fullWidth>
                  {Object.entries(BILL_STATUS_SP).map(([value, label]) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </TextField>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <Button variant='contained' color='primary' onClick={handleUpdateStatus}>
                  Aceptar
                </Button>
                <Button variant='contained' color='secondary' onClick={handleClose}>
                  Cancelar
                </Button>
              </CardActions>
            </Card>
          </>
        )
      case 'uploadFiles':
        return (
          <>
            <Card component='form' onSubmit={handleSubmit} sx={{ width: 700 }}>
              <CardHeader title='Actualizar factura' />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography sx={{ mb: 2 }} variant='subtitle1'>
                      Subir archivo PDF
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Box display='flex'>
                          <label htmlFor='pdf-input'>
                            <Button variant='contained' component='span' color='secondary' size='small'>
                              Examinar
                            </Button>
                            <input
                              id='pdf-input'
                              type='file'
                              accept='application/pdf'
                              onChange={handlePdfFileChange}
                              style={{ opacity: 0 }}
                              required
                            />
                          </label>
                        </Box>
                      </Grid>
                      <Grid item xs={8} sx={{ height: 20 }}>
                        {pdfError && (
                          <FormHelperText error>Por favor, selecciona un archivo PDF válido.</FormHelperText>
                        )}
                        {pdfFile && (
                          <>
                            <Typography variant='body2'>Archivo Seleccionado:</Typography>
                            <Typography sx={{ marginLeft: '1em' }} variant='body2'>
                              {pdfFile.name} ({formatFileSize(pdfFile.size)})
                            </Typography>
                          </>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography sx={{ mb: 2 }} variant='subtitle1'>
                      Subir archivo XML
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Box display='flex'>
                          <label htmlFor='xml-input'>
                            <Button variant='contained' component='span' color='secondary' size='small'>
                              Examinar
                            </Button>
                            <input
                              id='xml-input'
                              type='file'
                              accept='text/xml'
                              onChange={handleXmlFileChange}
                              style={{ opacity: 0 }}
                              required
                            />
                          </label>
                        </Box>
                      </Grid>
                      <Grid item xs={8} sx={{ height: 20 }}>
                        {xmlError && (
                          <FormHelperText error>Por favor, selecciona un archivo XML válido.</FormHelperText>
                        )}
                        {xmlFile && (
                          <>
                            <Typography variant='body2'>Archivo Seleccionado:</Typography>
                            <Typography sx={{ marginLeft: '1em' }} variant='body2'>
                              {xmlFile.name} ({formatFileSize(xmlFile.size)})
                            </Typography>
                          </>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}></Grid>

                  <Grid item xs={12}>
                    <TextField
                      select
                      label={'Régimen'}
                      fullWidth
                      onChange={handleSchemeChange}
                      required
                      sx={{ mt: 2, mb: 2 }}
                    >
                      {SAT_SCHEMES.map(scheme => (
                        <MenuItem key={scheme.id} value={scheme.id}>
                          {scheme.scheme}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <Button variant='contained' color='primary' type='submit'>
                  Aceptar
                </Button>
                <Button variant='contained' color='secondary' onClick={handleClose}>
                  Cancelar
                </Button>
              </CardActions>
            </Card>
          </>
        )
      case 'deleteInvoice':
        return (
          <>
            <Card>
              <CardHeader title='¿Seguro que desea eliminar la factura?' />
              <CardContent sx={{ justifyContent: 'flex-end', mb: 2 }}></CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <Button variant='contained' color='primary' onClick={handleClose}>
                  Aceptar
                </Button>
                <Button variant='contained' color='secondary' onClick={handleClose}>
                  Cancelar
                </Button>
              </CardActions>
            </Card>
          </>
        )
      default:
        return <></>
    }
  }

  return (
    <Card>
      <CardHeader title={title} />
      <DataGrid
        rows={invoices}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 20]}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        localeText={getLocaleText()}
        autoHeight
      />
      <Modal
        open={openModal}
        onClose={handleClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {renderModalContent()}
      </Modal>
    </Card>
  )
}

export default TableBilling
