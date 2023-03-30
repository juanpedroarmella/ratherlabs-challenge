import Link from 'next/link'
import type { NextPage, GetServerSideProps } from 'next/types'
import axios from 'axios'
import { Grid, List, ListItem, ListItemText, Paper, Alert } from '@mui/material'

interface Room {
  id: number
  name: string
  updatedAt: string
  createdAt: string
}

interface Props {
  rooms?: Room[]
  error?: string
}

const Home: NextPage<Props> = ({ rooms, error }) => {
  if (error) {
    return (
      <Grid container justifyContent='center' mt={3}>
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Alert severity='error'>{error}</Alert>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container justifyContent='center' mt={3}>
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Paper elevation={3}>
          <List>
            {rooms.map((room) => (
              <ListItem
                key={room.id}
                component={Link}
                href={`/room/${room.id}`}
              >
                <ListItemText primary={room.name} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const apiUrl = process.env.API_URL
    const res = await axios.get(`${apiUrl}/room`)
    const rooms: Room[] = res.data

    return { props: { rooms } }
  } catch (e) {
    return { props: { error: 'Error al cargar las habitaciones.' } }
  }
}

export default Home
