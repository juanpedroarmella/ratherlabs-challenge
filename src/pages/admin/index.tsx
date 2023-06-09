import RootContainer from '@/components/atoms/RootContainer'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import type { NextPage } from 'next/types'
import React from 'react'

const SectionLinks = styled(Box)`
  display: flex;
  gap: 1rem;
  a {
    text-decoration: none;
  }
`

const Admin: NextPage = (): JSX.Element => {
  return (
    <RootContainer component='main'>
      <Typography variant='h4'>Admin Panel</Typography>

      <Box>
        <Typography variant='h5' mb={2}>
          Room Settings
        </Typography>
        <SectionLinks>
          <Link href='/admin/room/new'>
            <Button variant='contained' color='success'>
              Create New Room
            </Button>
          </Link>
          <Link href='/admin/room/edit'>
            <Button variant='contained' color='info'>
              Edit Rooms
            </Button>
          </Link>
          <Link href='/admin/room/delete'>
            <Button variant='contained' color='error'>
              Delete Rooms
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
            <Button variant='contained' color='success'>
              Create New Student
            </Button>
          </Link>
          <Link href='/admin/student/edit'>
            <Button variant='contained' color='info'>
              Edit Students
            </Button>
          </Link>
          <Link href='/admin/student/delete'>
            <Button variant='contained' color='error'>
              Delete Students
            </Button>
          </Link>
        </SectionLinks>
      </Box>
    </RootContainer>
  )
}

export default Admin
