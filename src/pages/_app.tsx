import Header from '@/components/layout/Header'
import GlobalStyles from '@/styles/GlobalStyles'
import {
  StyledEngineProvider,
  ThemeProvider,
  useTheme
} from '@mui/material/styles'

const App = ({ Component, pageProps }): JSX.Element => {
  const theme = useTheme()
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default App
