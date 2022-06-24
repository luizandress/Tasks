import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#5957B7',
            contrastText: '#9999D4',
            light: '#EEEEFC',
       },
        secondary: {
            main: '#FFFFFF',
            light: '#9999D4',
            contrastText:'#232959',
        },
        background: {
            default: '#FAFAFA'
        },
        error: {
            main: '#BC0E2D',
            contrastText: '#ffffff',
            light: '#FFEAED',
        },
        text: {
            primary: '#232959',
            secondary: '#FFFFFF'
        },
        divider: '#DFE0E7',
    },
    typography: {
        fontSize: 10,
        htmlFontSize: 10,
        fontFamily: 'Fira Sans'
    },
})

export default theme;