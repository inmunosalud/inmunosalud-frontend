import { useTheme } from '@mui/material/styles'
import { Box, List, ListItem, ListItemText } from '@mui/material'
import CustomChip from 'src/@core/components/mui/chip'

export const NetworkList = ({ users, firstLevel }) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '8px',
        overflow: 'hidden', // Mantiene el contenido dentro del borde
        height: '350px' // Tamaño fijo para garantizar consistencia
      }}
    >
      <Box
        sx={{
          padding: '5px',
          margin: '5px',
          height: '100%', // Asegura que el contenido use todo el espacio disponible
          overflowY: 'auto', // Habilita el desplazamiento si el contenido excede el espacio
          '&::-webkit-scrollbar': {
            width: '3px',
            scrollbarColor: '#e0e0e0 rgba(0, 0, 0, 0.2)'
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#555',
            borderRadius: '2px'
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#777'
          }
        }}
      >
        <List>
          {users?.map((user, index) => (
            <ListItem key={user.name} divider={index !== users.length - 1}>
              {firstLevel ? (
                <ListItemText
                  primary={`- ${user.name}`}
                  secondary={
                    <>
                      <CustomChip
                        skin='light'
                        size='small'
                        label={user?.profile}
                        color={user?.profile === 'Afiliado' ? 'success' : 'primary'}
                        sx={{
                          height: 20,
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          borderRadius: '5px',
                          textTransform: 'capitalize',
                          '& .MuiChip-label': { mt: -0.25 },
                          mb: 1
                        }}
                      />
                      <br />
                      Consumo: <br />${user.lastTotalConsume || '0'}
                    </>
                  }
                />
              ) : (
                <ListItemText
                  primary={`- ${user.name}`}
                  secondary={
                    <>
                      <CustomChip
                        skin='light'
                        size='small'
                        label={user.profile}
                        color={user?.profile === 'Afiliado' ? 'success' : 'primary'}
                        sx={{
                          height: 20,
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          borderRadius: '5px',
                          textTransform: 'capitalize',
                          '& .MuiChip-label': { mt: -0.25 },
                          mb: 1
                        }}
                      />
                      <br />
                      Recomendado por: <br />
                      {user.recommenderName || 'N/A'} <br />
                      Consumo: <br />${user.lastTotalConsume || '0'}
                    </>
                  }
                />
              )}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
}
