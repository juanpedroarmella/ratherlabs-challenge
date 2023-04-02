import { useState } from 'react'
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar'
import MuiAlert, { AlertColor } from '@mui/material/Alert'

interface SnackbarProps {
  Snackbar: JSX.Element
  openSnackbar: (severity: AlertColor, text: string) => void
}

const useSnackBar = (): SnackbarProps => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
  const [severity, setSeverity] = useState<AlertColor>('success')
  const [text, setText] = useState('')

  const openSnackbar = (severity: AlertColor, text: string): void => {
    setSeverity(severity)
    setText(text)
    setIsSnackbarOpen(true)
  }

  const handleSnackbarClose = (
    event: Event,
    reason: SnackbarCloseReason
  ): void => {
    if (reason === 'clickaway') return
    setIsSnackbarOpen(false)
  }

  const SnackbarComponent = (
    <Snackbar
      open={isSnackbarOpen}
      autoHideDuration={3000}
      onClose={handleSnackbarClose}
    >
      <MuiAlert severity={severity} sx={{ width: '100%' }}>
        {text}
      </MuiAlert>
    </Snackbar>
  )

  return { Snackbar: SnackbarComponent, openSnackbar }
}

export default useSnackBar
