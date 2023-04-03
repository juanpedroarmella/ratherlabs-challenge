import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

export default styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 2rem;
  margin: 5rem 1rem 1em 1rem;
  padding: 3rem 2rem;
  border-radius: ${({ theme }) => theme.shape.borderRadius};
  background-color: ${({ theme }) => theme.palette.background.paper};
  box-shadow: ${({ theme }) => theme.shadows[2]};
`
