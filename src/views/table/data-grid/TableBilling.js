import React, { useState } from 'react';
import { Card, CardContent, Button, Modal, Box, DataGrid } from '@mui/material';

const TableBilling = ({ invoices, onDelete }) => {
    const [open, setOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    const handleOpen = (invoice) => {
        setSelectedInvoice(invoice);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = (invoiceId) => {
        onDelete(invoiceId);
    };

    const columns = [
        { field: 'pdf', headerName: 'PDF', width: 100 },
        { field: 'xml', headerName: 'XML', width: 100 },
        { field: 'SatScheme', headerName: 'Sat Scheme', width: 150 },
        { field: 'isr', headerName: 'ISR', width: 100 },
        { field: 'iva', headerName: 'IVA', width: 100 },
        { field: 'amount', headerName: 'Amount', width: 120 },
        { field: 'status', headerName: 'Status', width: 120 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <Button variant="outlined" onClick={() => handleOpen(params.row)}>
                    Edit
                </Button>
            ),
        },
    ];

    return (
        <Card>
            <CardContent>
                <DataGrid
                    rows={invoices}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    autoHeight
                />
                <Modal open={open} onClose={handleClose}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}>
                        {/* Aquí puedes agregar el contenido del modal para subir factura y XML */}
                        <h2>Edit Invoice</h2>
                        <p>Invoice ID: {selectedInvoice?.id}</p>
                        <Button variant="contained" color="secondary" onClick={() => handleDelete(selectedInvoice?.id)}>
                            Delete Invoice
                        </Button>
                    </Box>
                </Modal>
            </CardContent>
        </Card>
    );
};

export default TableBilling;
