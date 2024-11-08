import React from 'react'
import { Box, Typography, Grid, Container, Card, CardContent } from '@mui/material'

export default function CertificationsCard() {
  const certifications = [
    { src: '/images/Certificaciones/gmp2.webp', alt: 'certificación 1', maxWidth: 220 },
    { src: '/images/Certificaciones/nsf.webp', alt: 'certificación 2', maxWidth: 210 },
    { src: '/images/Certificaciones/fda2.webp', alt: 'certificación 3', maxWidth: 150 },
    { src: '/images/Certificaciones/cofepris.webp', alt: 'certificación 4', maxWidth: 160 }
  ]

  return (
    <Card>
      <CardContent>
        <Grid container spacing={4} justifyContent='center'>
          {certifications.map((cert, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              lg={3}
              key={index}
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <Box
                component='img'
                src={cert.src}
                alt={cert.alt}
                sx={{
                  width: '100%',
                  maxWidth: cert.maxWidth,
                  height: 'auto'
                }}
                loading='lazy'
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}
