import GlobalStyles from '@mui/material/GlobalStyles'

const GlobalCustomStyle = (): JSX.Element => (
  <GlobalStyles
    styles={{
      body: { margin: 0, padding: 0 },
      img: {
        maxWidth: '100%'
      },
      '*': {
        boxSizing: 'border-box',
        fontFamily: "'Roboto', sans-serif",
        fontWeight: 400
      },
      a: {
        color: 'inherit'
      }
    }}
  />
)

export default GlobalCustomStyle
