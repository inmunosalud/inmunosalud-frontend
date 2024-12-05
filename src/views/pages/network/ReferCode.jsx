import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Card, CardHeader, Typography, Box, Grid, CardContent, Button } from '@mui/material'
import { ContentCopy } from 'mdi-material-ui'
import { Check } from 'mdi-material-ui'

export const ReferCode = () => {
  const [isCopied2, setIsCopied2] = React.useState(false)
  const { user } = useSelector(state => state.session)

  const handleCopyUrl = () => {
    const url =
      window.location.origin +
      `/landing-page/join/?id=${user?.id}` +
      `&fn=${btoa(unescape(encodeURIComponent(user?.firstName)))}` +
      `&ln=${btoa(unescape(encodeURIComponent(user?.lastName)))}`

    // Para descifrar:
    // const id2Decoded = decodeURIComponent(escape(atob(id2)))
    // const id3Decoded = decodeURIComponent(escape(atob(id3)))
    // console.log(id2Decoded, id3Decoded)

    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(url)
      setIsCopied2(true)
      setTimeout(() => setIsCopied2(false), 800)
    }
  }

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <CardHeader
        title={
          <Typography
            sx={{
              mt: '20px',
              textAlign: 'center'
            }}
            variant='h5'
            color='textPrimary'
          >
            INVITA A TUS AMIGOS Y GANA DINERO
          </Typography>
        }
        subheader={
          <Typography
            sx={{
              mt: '20px',
              textAlign: 'center'
            }}
            variant='body2'
            color='textSecondary'
          >
            Comparte el enlace de registro o copia tu código para compartirlo a tus amigos
          </Typography>
        }
      />
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                <Button
                  startIcon={isCopied2 ? <Check /> : <ContentCopy />}
                  variant='contained'
                  sx={{
                    mt: '10px',
                    width: '230px'
                  }}
                  size='large'
                  onClick={handleCopyUrl}
                >
                  {isCopied2 ? 'Copiado' : 'Copiar tu enlace'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Box>
    </Card>
  )
}
