import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { Box, Button, CardMedia, Card, CardActions, Tab, Tabs, Modal } from '@mui/material';
import { Pencil, Delete, Magnify, CloudUpload } from 'mdi-material-ui'
import { CircularProgress } from '@mui/material';
import PdfViewer from 'src/views/general/PdfViewer'

import TableBilling from 'src/views/table/data-grid/TableBilling'
import SnackbarAlert from 'src/views/components/snackbar/SnackbarAlert'
import { closeSnackBar } from 'src/store/notifications'


import { getInvoices, getInvoicesByUser, updateStatus, uploadFiles } from 'src/store/billing'

const BillingPage = () => {
  const dispatch = useDispatch()
  const [tabValue, setTabValue] = useState(0);
  const { user } = useSelector(state => state.dashboard.general)
  const { invoicesAll } = useSelector(state => state.billing)
  const { invoices } = useSelector(state => state.billing)
  const { open, message, severity } = useSelector(state => state.notifications)
  const [openModal, setOpenModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedScheme, setSelectedScheme] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [xmlFile, setXmlFile] = useState(null);
  const [pdfFile64, setPdfFile64] = useState(null);
  const [xmlFile64, setXmlFile64] = useState(null);
  const { loading } = useSelector(state => state.billing)

  const handleSchemeChange = (event) => {
    setSelectedScheme(event.target.value);
  };

  const handlePdfFileChange = (event) => {
    setPdfFile(event.target.files[0])
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Data = reader.result;
      setPdfFile64(base64Data);
    };

    reader.readAsDataURL(file);
  };

  const handleXmlFileChange = (event) => {
    setXmlFile(event.target.files[0])
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Data = reader.result;
      setXmlFile64(base64Data);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      pdf: pdfFile64,
      xml: xmlFile64,
      satScheme: selectedScheme,
      idUser: user.id,
      idInvoice: selectedInvoice.id,
    };

    dispatch(uploadFiles(formData))
      .then(() => {
        dispatch(getInvoicesByUser(user.id));
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeStatus = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleUpdateStatus = () => {
    dispatch(updateStatus({ status: selectedStatus, invoiceId: selectedInvoice.id }))
      .then(() => {
        dispatch(getInvoices());
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOpenViewPdf = (invoice) => {
    setModalType("pdfViewer")
    setSelectedInvoice(invoice);
    setOpenModal(true);
  };

  const handleOpenViewXml = (invoice) => {
    setModalType("xmlViewer")
    setSelectedInvoice(invoice);
    setOpenModal(true);
  };

  const handleOpenEdit = (invoice) => {
    if (user.profile === 'Administrador General') setModalType("updateStatus")
    if (user.profile === 'Afiliado') setModalType("uploadFiles")
    setSelectedInvoice(invoice);
    setOpenModal(true);
  };

  const handleOpenDelete = (invoice) => {
    setModalType("deleteInvoice")
    setSelectedInvoice(invoice);
    setOpenModal(true);
  };

  const handleClose = () => {
    setModalType(null)
    setOpenModal(false);
    setSelectedStatus("")
    setSelectedScheme('');
    setXmlFile(null);
    setPdfFile(null);
    setXmlFile64(null);
    setPdfFile64(null);
  };

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleDelete = (invoiceId) => {
    onDelete(invoiceId);
  };

  const BILL_STATUS_SP = {
    'Confirmando factura': 'Confirmando factura',
    'Factura liquidada': 'Factura liquidada',
    'Factura cancelada': 'Factura cancelada',
    'Factura mal formada': 'Factura mal formada',
    'Factura sin archivos': 'Factura sin archivos',
    'Factura sin pdf': 'Factura sin pdf',
    'Factura sin xml': 'Factura sin xml',
  };

  const SAT_SCHEMES = [
    {
      id: 0,
      scheme: 'Persona Física con Actividad Empresarial (PFAE)',
      iva: 0.1067,
      isr: 0,
    },
    {
      id: 1,
      scheme: 'Régimen Simplificado de Confianza',
      iva: 0.1067,
      isr: 0.0125,
    },
    {
      id: 2,
      scheme: 'Régimen de Incorporación Física',
      iva: 0.1067,
      isr: 0,
    },
  ];

  const columns = [
    { field: 'status', headerName: 'Estatus', width: 180 },
    {
      field: 'pdf', headerName: 'PDF', width: 55, align: 'center',
      renderCell: (params) => (
        <>
          <Button onClick={() => handleOpenViewPdf(params.row)} color="info" disabled={params.row.pdf === ""} sx={{ width: '100%' }}>
            <Magnify />
          </Button>
        </>
      )
    },
    {
      field: 'xml', headerName: 'XML', width: 55, align: 'center',
      renderCell: (params) => (
        <>
          <Button onClick={() => handleOpenViewXml(params.row)} color="info" disabled={params.row.xml === ""} sx={{ width: '100%' }}>
            <Magnify />
          </Button>
        </>
      )
    },
    { field: 'satScheme', headerName: 'Esquema SAT', width: 360 },
    {
      field: 'isr',
      headerName: 'ISR',
      width: 80,
      valueGetter: (params) => {
        const isr = params.row.isr;
        return isr.toLocaleString('es-MX', {
          style: 'currency',
          currency: 'MXN',
        });
      },
    },
    {
      field: 'iva',
      headerName: 'IVA',
      width: 100,
      valueGetter: (params) => {
        const iva = params.row.iva;
        return iva.toLocaleString('es-MX', {
          style: 'currency',
          currency: 'MXN',
        });
      },
    },
    {
      field: 'amount', headerName: 'SubTotal', width: 120,
      valueGetter: (params) => {
        const amount = params.row.amount;
        return amount.toLocaleString('es-MX', {
          style: 'currency',
          currency: 'MXN',
        });
      },
    },
    {
      field: 'commissionAmount', headerName: 'Total', width: 110,
      valueGetter: (params) => {
        const amount = params.row.amount;
        return amount.toLocaleString('es-MX', {
          style: 'currency',
          currency: 'MXN',
        });
      },
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 90,
      align: 'center',
      renderCell: (params) => (
        <Button onClick={() => handleOpenEdit(params.row)} color="warning" sx={{ width: '100%' }} >
          <CloudUpload style={{ fontSize: '2rem' }}/>
        </Button>
      ),
    },
  ];

  const columnsAll = [
    { field: 'userEmail', headerName: 'Correo Electrónico', width: 200 },
    { field: 'status', headerName: 'Estatus', width: 180 },
    {
      field: 'pdf', headerName: 'PDF', width: 60, align: 'center',
      renderCell: (params) => (
        <>
          <Button onClick={() => handleOpenViewPdf(params.row)} color="info" disabled={params.row.pdf === ""} sx={{ width: '100%' }}>
            <Magnify  />
          </Button>
        </>
      )
    },
    {
      field: 'xml', headerName: 'XML', width: 60, align: 'center',
      renderCell: (params) => (
        <>
          <Button onClick={() => handleOpenViewXml(params.row)} color="info" disabled={params.row.xml === ""} sx={{ width: '100%' }}>
            <Magnify  />
          </Button>
        </>
      )
    },
    { field: 'satScheme', headerName: 'Esquema SAT', width: 360 },
    {
      field: 'isr',
      headerName: 'ISR',
      width: 80,
      valueGetter: (params) => {
        const isr = params.row.isr;
        return isr.toLocaleString('es-MX', {
          style: 'currency',
          currency: 'MXN',
        });
      },
    },
    {
      field: 'iva',
      headerName: 'IVA',
      width: 100,
      valueGetter: (params) => {
        const iva = params.row.iva;
        return iva.toLocaleString('es-MX', {
          style: 'currency',
          currency: 'MXN',
        });
      },
    },
    {
      field: 'amount',
      headerName: 'SubTotal',
      width: 120,
      valueGetter: (params) => {
        const amount = params.row.amount;
        return amount.toLocaleString('es-MX', {
          style: 'currency',
          currency: 'MXN',
        });
      },
    },
    {
      field: 'commissionAmount',
      headerName: 'Total',
      width: 110,
      valueGetter: (params) => {
        const commissionAmount = params.row.commissionAmount;
        return commissionAmount.toLocaleString('es-MX', {
          style: 'currency',
          currency: 'MXN',
        });
      },
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 120,
      align: 'center',
      renderCell: (params) => (
        <>
          <Button onClick={() => handleOpenEdit(params.row)} color="warning" sx={{ width: '100%' }}>
            <Pencil />
          </Button>
          <Button onClick={() => handleOpenDelete(params.row)} color="error" sx={{ width: '100%' }}>
            <Delete />
          </Button>
        </>
      ),
    },
  ];

  React.useEffect(() => {
    setSelectedStatus(selectedInvoice?.status || '');
  }, [selectedInvoice]);

  React.useEffect(() => {
    if (user.profile === 'Administrador General') {
      dispatch(getInvoices());
    }
    if (user.profile === 'Afiliado') {
      dispatch(getInvoicesByUser(user.id))
    }
  }, [dispatch, user])

  if (user.profile === 'Afiliado') {
    return (loading ? (
      <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <CircularProgress />
      </Box>
    ) : (
      <>
        <Tabs value={tabValue} onChange={handleChangeTab} centered>
          <Tab label="Facturas" />
          <Tab label="¿Cómo genero una factura?" />
        </Tabs>
        <Box mt={2}>
          {tabValue === 0 && (
            <Box sx={{ maxWidth: '1150px', margin: '0 auto' }}>
              <TableBilling
                {...{
                  invoices,
                  columns,
                  title: "Tus Facturas",
                  openModal,
                  modalType,
                  handleClose,
                  SAT_SCHEMES,
                  selectedInvoice,
                  handleSchemeChange,
                  handlePdfFileChange,
                  handleXmlFileChange,
                  handleSubmit,
                  xmlFile,
                  pdfFile
                }}
              />
            </Box>
          )}
          {tabValue === 1 && (
            <>
              <Card style={{ maxWidth: '720px', margin: '0 auto' }}>
                <CardMedia
                  component="iframe"
                  width="600"
                  height="400"
                  src={`https://www.youtube.com/embed/aQx-cc3Jd48`}
                  title="YouTube video player"
                />
                <CardActions sx={{ justifyContent: 'flex-end', alignItems: 'flex-end', mt: 2 }}>
                  <Button variant="contained" onClick={handleOpen}>Ver PDF</Button>
                </CardActions>
              </Card>
              <Modal
                open={openModal}
                onClose={handleClose}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <PdfViewer PDF="https://bills-9fe5.s3.amazonaws.com/Manual+SAT+-+INMUNOSALUD.pdf" onClose={handleClose}/>
              </Modal>
            </>
          )}
        </Box>
        <SnackbarAlert isOpen={open} message={message} severity={severity} />

      </>
    ));
  } else if (user.profile === 'Administrador General') {
    return (loading ? (
      <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <CircularProgress />
      </Box>
    ) : (
      <>
        <Box>
          <TableBilling
            {...{
              invoices: invoicesAll,
              columns: columnsAll,
              title: "Facturas de Afiliados",
              openModal,
              modalType,
              handleClose,
              BILL_STATUS_SP,
              selectedInvoice,
              handleUpdateStatus,
              handleChangeStatus,
            }}
          />
        </Box>
        <SnackbarAlert message={message} isOpen={open} severity={severity} />
      </>
    )
    );
  }
};

export default BillingPage;
