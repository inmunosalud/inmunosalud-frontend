import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// ** MUI Imports
import Grid from '@mui/material/Grid'
import { ContentCopy, FileUpload } from 'mdi-material-ui'
import Link from 'next/link'

// ** Styled Component Import
import { useTheme } from '@mui/material/styles'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

//actions
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
  Typography
} from '@mui/material'
import CardHeader from '@mui/material/CardHeader'
import { getComissionsByUser } from 'src/store/comissions'
import { loadSession } from 'src/store/session'
import { getUserInfo } from 'src/store/users'
import TableUsers from 'src/views/dashboards/users/TableUsers'

const Users = () => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector(state => state.users)
  return !isLoading ? (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TableUsers />
      </Grid>
    </Grid>
  ) : (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <CircularProgress />
    </Box>
  )
}

export default Users
