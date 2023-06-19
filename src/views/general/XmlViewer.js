import React, { useEffect, useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { nnfx } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import { nnfxDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import { useTheme, Box, Typography, Button, Card, CardContent, CardActions } from '@mui/material'

const customNnfx = {
  ...nnfx,
  'code[class*="language-"]': {
    ...nnfx['code[class*="language-"]'],
    color: '#000000' // Cambia el color del texto a negro
  }
}

const XmlViewer = ({ XML, onClose }) => {
  const theme = useTheme()
  const codeStyle = theme.palette.mode === 'dark' ? nnfxDark : customNnfx
  const customStyle =
    theme.palette.mode === 'light'
      ? { whiteSpace: 'pre-wrap', color: '#000000', backgroundColor: '#f4f5fa' }
      : { whiteSpace: 'pre-wrap' }
  const [xml, setXml] = useState('')

  useEffect(() => {
    fetch(XML)
      .then(response => response.text())
      .then(xml => {
        setXml(xml)
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
    <Card>
      <CardContent>
        <Typography variant='subtitle1'>Ver archivo XML</Typography>
        <SyntaxHighlighter language='xml' style={codeStyle} customStyle={customStyle}>
          {xml}
        </SyntaxHighlighter>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', alignItems: 'flex-end', mt: 4 }}>
        <Button variant='contained' color='primary' onClick={handleDownload}>
          Descargar
        </Button>
        <Button variant='contained' color='secondary' onClick={onClose}>
          Cerrar
        </Button>
      </CardActions>
    </Card>
  )
}

export default XmlViewer
