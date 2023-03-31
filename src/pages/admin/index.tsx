import RootContainer from '@/atoms/RootContainer'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import React from 'react'

const SectionLinks = styled(Box)`
  display: flex;
  gap: 1rem;
  a {
    text-decoration: none;
  }
`

export default function Admin () {
  return (
    <RootContainer component='main'>
      <Typography variant='h4'>Admin Panel</Typography>

      <Box>
        <Typography variant='h5' mb={2}>
          Room Settings
        </Typography>
        <SectionLinks>
          <Link href='/admin/room/new'>
            <Button variant='contained' color='primary'>
              Create New Room
            </Button>
          </Link>
          <Link href='/admin/room/edit'>
            <Button variant='contained' color='secondary'>
              Edit Rooms
            </Button>
          </Link>
        </SectionLinks>
      </Box>

      <Box>
        <Typography variant='h5' mb={2}>
          Student Settings
        </Typography>
        <SectionLinks>
          <Link href='/admin/student/new'>
            <Button variant='contained' color='primary'>
              Create New Student
            </Button>
          </Link>
          <Link href='/admin/student/edit'>
            <Button variant='contained' color='secondary'>
              Edit Students
            </Button>
          </Link>
        </SectionLinks>
      </Box>
    </RootContainer>
  )
}
