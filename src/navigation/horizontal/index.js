import ChartDonut from 'mdi-material-ui/ChartDonut'
import HomeOutline from 'mdi-material-ui/HomeOutline'

const navigation = () => {
  return [
    {
      icon: HomeOutline,
      title: 'Clientes',
      children: [
        {
          icon: ChartDonut,
          title: 'Usuiarios',
          path: '/dashboards/users'
        }
      ]
    }
  ]
}

export default navigation
