import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const LoadingIndicator: React.FC = (): JSX.Element => {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='100%'
    >
      <CircularProgress />
    </Box>
  )
}

export default LoadingIndicator
