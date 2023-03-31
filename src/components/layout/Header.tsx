import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

export default function Header () {
  return (
    <AppBar position='fixed'>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant='h6'
          component={Link}
          href='/'
          sx={{ textDecoration: 'none', color: 'inherit' }}
        >
          Ratherlabs Challenge
        </Typography>
        <nav>
          <Button color='inherit' component={Link} href='/'>
            Rooms
          </Button>
          <Button color='inherit' component={Link} href='/admin'>
            Admin
          </Button>
        </nav>
      </Toolbar>
    </AppBar>
  )
}
