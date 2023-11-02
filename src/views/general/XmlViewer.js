import { Box, Button, Card, CardActions, CardContent, CardHeader, CircularProgress, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { nnfx, nnfxDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import xmlFormat from 'xml-formatter'

const customNnfx = {
  ...nnfx,
  'code[class*="language-"]': {
    ...nnfx['code[class*="language-"]'],
    color: '#000000' // Cambia el color del texto a negro
  }
}

const XmlViewer = ({ XML, onClose, title }) => {
  const theme = useTheme()
  const codeStyle = theme.palette.mode === 'dark' ? nnfxDark : customNnfx
  const customStyle =
    theme.palette.mode === 'light'
      ? { whiteSpace: 'pre-wrap', color: '#000000', backgroundColor: '#f4f5fa' }
      : { whiteSpace: 'pre-wrap' }
  const [formattedXml, setFormattedXml] = useState('')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch(XML)
      .then(response => response.text())
      .then(xml => {
        const formattedXmlText = xmlFormat(xml, {
          whiteSpaceAtEndOfSelfclosingTag: true
        })
        setFormattedXml(formattedXmlText)
        setLoaded(true)
      })
      .catch(error => {
        console.error('Error al cargar el XML:', error)
      })
  }, [XML])

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = XML
    link.download = 'archivo.xml'
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    link.click()
  }

  return (
    <Card sx={{ width: '700px' }}>
      <CardHeader title={title} />
      <CardContent>
        {loaded ? (
          <div style={{ width: '100%', maxHeight: '400px', overflowY: 'auto' }}>
            <SyntaxHighlighter language='xml' style={{ ...codeStyle, width: '100%' }} customStyle={customStyle}>
              {formattedXml}
            </SyntaxHighlighter>
          </div>
        ) : (
          <Box
            sx={{
              mt: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
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

export default XmlViewer
