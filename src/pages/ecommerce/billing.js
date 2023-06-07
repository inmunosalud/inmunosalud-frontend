import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Container, Tab, Tabs, Typography } from '@mui/material';
import { getUserInfo } from 'src/store/users'
import VideoCard from 'src/views/general/VideoCard'
import TableBilling from 'src/views/table/data-grid/TableBilling'

import { getInvoices } from 'src/store/invoices'





export const BILL_STATUS_SP = {
  confirming: 'Confirmando factura',
  liquidate: 'Factura liquidada',
  cancelled: 'Factura cancelada',
  malformed: 'Factura mal formada',
  withoutFiles: 'Factura sin archivos',
  withoutPDF: 'Factura sin pdf',
  withoutXML: 'Factura sin xml',
};

export const SAT_SCHEMES = [
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

const BillingPage = () => {
  const dispatch = useDispatch()
  const [tabValue, setTabValue] = useState(0);
  const { userInfo } = useSelector(state => state.users)
  const [isLoaded, setIsLoaded] = React.useState(false)
  const { user } = useSelector(state => state.dashboard.general)
  // const { invoices } = useSelector(state => state.invoices)

  React.useEffect(() => {
    if (userInfo != '') setIsLoaded(true)
  })

  React.useEffect(() => {
    dispatch(getUserInfo(user?.id))
    dispatch(getInvoices())
  }, [dispatch])

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  if (userInfo.profile === 'Afiliado') {
    return (
      <Container maxWidth="md">
        <Box mt={4} mb={2}>
          <Typography variant="h4" component="h1" align="center">
            Facturación - Afiliado
          </Typography>
        </Box>
        <Tabs value={tabValue} onChange={handleChangeTab} centered>
          <Tab label="Facturas" />
          <Tab label="¿Cómo genero una factura?" />
        </Tabs>
        <Box mt={2}>
          {/* {tabValue === 0 && <TableBilling />} */}
          {tabValue === 1 && <VideoCard videoId="aQx-cc3Jd48" pdfUrl="https://bills-9fe5.s3.amazonaws.com/Manual+SAT+-+INMUNOSALUD.pdf" />}
        </Box>
      </Container>
    );
  } else if (userInfo.profile === 'Administrador General') {
    return (
      <Container maxWidth="md">
        <Box mt={4} mb={2}>
          <Typography variant="h4" component="h1" align="center">
            Facturación - Administrador General
          </Typography>
        </Box>
        <Tabs value={tabValue} onChange={handleChangeTab} centered>
          <Tab label="Facturas de Afiliados" />
        </Tabs>
        <Box mt={2}>
          {/* {tabValue === 0 && <AdminInvoiceTable />}
          {tabValue === 1 && <UpdateTemplate />} */}
        </Box>
      </Container>
    );
  }
};

export default BillingPage;
