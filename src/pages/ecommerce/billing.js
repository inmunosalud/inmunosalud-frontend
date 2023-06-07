import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Container, Tab, Tabs, Typography } from '@mui/material';
// import InvoiceTable from '../components/InvoiceTable';
// import UploadInvoice from '../components/UploadInvoice';
// import DownloadTemplate from '../components/DownloadTemplate';
// import AdminInvoiceTable from '../components/AdminInvoiceTable';
// import UpdateTemplate from '../components/UpdateTemplate';

const BillingPage = () => {
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  // Función de simulación para determinar el tipo de usuario (afiliado o administrador general)
  const getUserType = () => {
    return 'afiliado'; // Reemplaza esto con la lógica real para determinar el tipo de usuario
  };

  const userType = getUserType();

  if (userType === 'afiliado') {
    return (
      <Container maxWidth="md">
        <Box mt={4} mb={2}>
          <Typography variant="h4" component="h1" align="center">
            Facturación - Afiliado
          </Typography>
        </Box>
        <Tabs value={tabValue} onChange={handleChangeTab} centered>
          <Tab label="Facturas" />
          <Tab label="Subir Factura" />
          <Tab label="Descargar Template" />
        </Tabs>
        <Box mt={2}>
          {/* {tabValue === 0 && <InvoiceTable />}
          {tabValue === 1 && <UploadInvoice />}
          {tabValue === 2 && <DownloadTemplate />} */}
        </Box>
      </Container>
    );
  } else {
    return (
      <Container maxWidth="md">
        <Box mt={4} mb={2}>
          <Typography variant="h4" component="h1" align="center">
            Facturación - Administrador General
          </Typography>
        </Box>
        <Tabs value={tabValue} onChange={handleChangeTab} centered>
          <Tab label="Facturas de Afiliados" />
          <Tab label="Actualizar Template" />
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
