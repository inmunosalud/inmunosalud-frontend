import Link from 'next/link'
import Button from '@mui/material/Button'

const RedirectButton = ({ path, text }) => {
  return (
    <Link href={path} passHref>
      <Button variant='outlined'>{text}</Button>
    </Link>
  )
}
export default RedirectButton
