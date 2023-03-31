import Header from '@/components/layout/Header'
import GlobalStyles from '@/styles/GlobalStyles'
import {
  StyledEngineProvider,
  ThemeProvider,
  useTheme
} from '@mui/material/styles'

export default function App ({ Component, pageProps }) {
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
