import { createTheme } from '@material-ui/core/styles'

interface Theme {
    palette: object;
}

const theme: Theme = createTheme({


    palette: {
        primary: {
            main: '#00c2cb',
        },
        secondary: {
            main: '#7ed957',
            dark: '#324b4d'
        }


    }

})

export default theme