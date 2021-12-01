import { createTheme } from '@mui/material/styles/'

interface Theme {
   palette: object;
}

const theme: Theme = createTheme({
    palette: {
        primary: {
            main: '#00c2cb'
        },
        secondary: {
            main: '#7ed957'
        }
        
    }
})

export default theme