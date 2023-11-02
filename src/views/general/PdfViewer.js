import { Box, Button, Card, CardActions, CardContent, CardHeader, CircularProgress } from '@mui/material'
import React from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const PdfViewer = ({ PDF, onClose, title }) => {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = PDF
    link.download = 'ManualGenerarFactura.pdf'
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    link.click()
  }
  const [numPages, setNumPages] = React.useState(null)
  const [loaded, setLoaded] = React.useState(false)

  const onDocumentLoadSuccess = ({ numPages }) => {
    setLoaded(true)
    setNumPages(numPages)
  }

  return (
    <Card>
      <CardHeader title={title} />
      <CardContent sx={{ maxHeight: '70vh', overflowY: 'auto', overflowX: 'hidden' }}>
        {PDF && (
          <Document
            file={PDF}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '200px',
                  width: '700px'
                }}
              >
                <CircularProgress />
              </Box>
            }
          >
            {Array.from(new Array(numPages), (el, index) => {
              return <Page key={index + 1} pageNumber={index + 1} />
            })}
          </Document>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', alignItems: 'flex-end', mt: 4 }}>
        {loaded && (
          <Button variant='contained' color='primary' onClick={handleDownload}>
            Descargar
          </Button>
        )}
        <Button variant='contained' color='secondary' onClick={onClose}>
          Cerrar
        </Button>
      </CardActions>
    </Card>
  )
}

export default PdfViewer
