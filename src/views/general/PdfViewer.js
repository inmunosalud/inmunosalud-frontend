import React from 'react';
import { Card, CardHeader, CardContent, CardActions, Button } from '@mui/material';
// import { Document, Page, pdfjs } from 'react-pdf';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = ({ PDF, onClose }) => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = PDF;
        link.download = 'archivo.pdf';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.click();
    };

    return (
        <Card>
            <CardHeader title="Ver archivo PDF" />
            <CardContent sx={{ maxHeight: '70vh', overflowY: 'auto', overflowX: 'hidden' }}>
                {PDF && (
                    <iframe src={PDF} width="100%" height="600px" frameborder="0"></iframe>
                    // <Document
                    //     file={PDF}
                    //     options={{ workerSrc: '/pdf.worker.js' }}
                    // >
                    //     <Page
                    //         pageNumber={1}
                    //         scale={1.5}
                    //         width={700}
                    //     />
                    // </Document>
                )}
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end', alignItems: 'flex-end', mt: 4 }}>
                <Button variant="contained" color="primary" onClick={handleDownload}>
                    Descargar
                </Button>
                <Button variant="contained" color="secondary" onClick={onClose}>
                    Cerrar
                </Button>
            </CardActions>
        </Card>
    );
};

export default PdfViewer;
