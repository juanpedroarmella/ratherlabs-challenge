import LoadingIndicator from '@/components/atoms/LoadingIndicator'
import RootContainer from '@/components/atoms/RootContainer'
import StudentsList from '@/components/tenant/room-id/StudentsList'
import useFetch from '@/hooks/useFetch'
import type { GetRoomByIdResponse } from '@/types/interfaces/Room'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { GetServerSideProps, NextPage } from 'next/types'

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const idRoom = parseInt(context?.params?.id as string)
  const apiUrl = process.env.API_URL as string
  return { props: { apiUrl, idRoom } }
}

interface Props {
  apiUrl: string
  idRoom: number
}

const Room: NextPage<Props> = ({ apiUrl, idRoom }) => {
  const { isLoading, data, error } = useFetch<GetRoomByIdResponse>(
    `${apiUrl}/room/${idRoom}`
  )

  if (isLoading) {
    return <LoadingIndicator />
  }

  if (error !== null) {
    return (
      <RootContainer component='main'>
        <Alert severity='error'>{error.message}</Alert>
      </RootContainer>
    )
  }

  return (
    <RootContainer component='main'>
      <Typography variant='h5'>{data?.room.name}</Typography>
      <Box display='flex' flexDirection='column' alignItems='flex-start'>
        <StudentsList students={data?.students as []} />
      </Box>
    </RootContainer>
  )
}
export default Room
