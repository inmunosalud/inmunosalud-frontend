import React from 'react';
import { Card, CardHeader, CardContent, CardActions, Button, Modal, Box, Typography, TextField, MenuItem, InputLabel, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'

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
    pdfFile
}) => {

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 bytes';
        const k = 1024;
        const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
    };

    const renderModalContent = () => {
        switch (modalType) {
            case 'pdfViewer':
                return (
                    <>
                        <Typography variant="h6">Ver archivo PDF</Typography>
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '80%',
                            height: '80%',
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                        }}>
                            <iframe
                                src={selectedInvoice.pdf}
                                width="100%"
                                height="100%"
                                title="PDF Viewer"
                            />                        </Box>
                    </>
                );
            case 'xmlViewer':
                return (
                    <>
                        <Typography variant="h6">Ver archivo XML</Typography>
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '80%',
                            height: '80%',
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                        }}>
                            <iframe
                                src={selectedInvoice.xml}
                                width="100%"
                                height="100%"
                                title="XML Viewer"
                            />                             </Box>
                    </>
                );
            case 'updateStatus':
                return (
                    <>
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 400,
                                bgcolor: 'background.paper',
                                boxShadow: 24,
                                p: 4,
                            }}
                        >
                            <Card>
                                <CardHeader title="Actualizar estado de la factura" />
                                <CardContent sx={{ justifyContent: 'flex-end', mb: 2 }}>
                                    <TextField
                                        select
                                        label={selectedInvoice.status}
                                        onChange={handleChangeStatus}
                                        sx={{ mt: 2 }}
                                        fullWidth
                                    >
                                        {Object.entries(BILL_STATUS_SP).map(([value, label]) => (
                                            <MenuItem key={value} value={value}>
                                                {label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                    <Button variant="contained" color="primary" onClick={handleUpdateStatus}>
                                        Aceptar
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={handleClose}>
                                        Cancelar
                                    </Button>
                                </CardActions>
                            </Card>
                        </Box>
                    </>
                );
            case 'uploadFiles':
                return (
                    <>
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 600,
                                bgcolor: 'background.paper',
                                boxShadow: 24,
                                p: 4,
                            }}
                            component="form"
                            onSubmit={handleSubmit}
                        >
                            <CardHeader title="Actualizar factura" />
                            <CardContent>
                                <Grid container spacing={2}>

                                    <Grid item xs={6}>
                                        <Typography variant="subtitle1">Subir archivo PDF</Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={4}>
                                                <Box display="flex"
                                                >
                                                    <input
                                                        id="pdf-input"
                                                        type="file"
                                                        accept="application/pdf"
                                                        onChange={handlePdfFileChange}
                                                        required
                                                    />
                                                </Box>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <Box display="flex" height="100%">
                                                    {pdfFile && <Typography variant="body2">{pdfFile.name} ({formatFileSize(pdfFile.size)})</Typography>}
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Typography variant="subtitle1">Subir archivo XML</Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={4}>
                                                <Box display="flex">
                                                    <input
                                                        id="xml-input"
                                                        type="file"
                                                        accept="text/xml"
                                                        onChange={handleXmlFileChange}
                                                        required
                                                    />
                                                </Box>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <Box display="flex" height="100%">
                                                    {xmlFile && <Typography variant="body2">{xmlFile.name} ({formatFileSize(xmlFile.size)})</Typography>}
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12}>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            select
                                            label={selectedInvoice.satScheme}
                                            fullWidth
                                            onChange={handleSchemeChange}
                                            required
                                            sx={{ mt: 2, mb: 2 }}
                                        >
                                            {SAT_SCHEMES.map((scheme) => (
                                                <MenuItem key={scheme.id} value={scheme.id}>
                                                    {scheme.scheme}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <Button variant="contained" color="primary" type="submit">
                                    Aceptar
                                </Button>
                                <Button variant="contained" color="secondary" onClick={handleClose}>
                                    Cancelar
                                </Button>
                            </CardActions>
                        </Box>

                    </>
                );
            case 'deleteInvoice':
                return (
                    <>
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 400,
                                height: 200,
                                bgcolor: 'background.paper',
                                boxShadow: 24,
                                p: 4,
                            }}
                        >
                            <Card>
                                <CardHeader title="¿Seguro que desea eliminar la factura?" />
                                <CardContent sx={{ justifyContent: 'flex-end', mb: 2 }}>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                    <Button variant="contained" color="primary" onClick={handleClose}>
                                        Aceptar
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={handleClose}>
                                        Cancelar
                                    </Button>
                                </CardActions>
                            </Card>
                        </Box>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Card>
            <CardHeader title={title} />
            <DataGrid
                rows={invoices}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                autoHeight
            />
            <Modal open={openModal} onClose={handleClose}>
                {renderModalContent()}
            </Modal>
        </Card>
    );
};

export default TableBilling;