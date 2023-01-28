import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const greenBlue = '#3a8783';
const lightAqua = '#bdf2ef66';
const aqua = '#bdf2ef';
const black = '#474747';
const lightGray = '#787878';
const gray = '#5c5c5c';
const darkGray = '#454545';
const lightBrown = '#B1AB7D';
const orange = '#ff7700';
const lightRed = '#ff6b6b';
// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#3a8783',
      // main: '#ffffff',
    },
    secondary: {
      main: '#303030',
    },
    error: {
      main: red.A400,
    },
    common: {
      white: '#ffffff',
      black: '#474747',
      greenBlue,
      gray,
      darkGray,
      lightGray,
      lightBrown,
      orange,
      lightAqua,
      aqua,
      lightRed,
    },
  },

  typography: {
    h1: {
      fontSize: '4.5rem',
      fontFamily: 'Montserrat',
      // fontStyle: 'italic',
      // fontWeight: 700,
      color: greenBlue,
    },
    h2: {
      fontFamily: 'Montserrat',
      fontSize: '3rem',
      // fontWeight: 500,
      color: greenBlue,
    },
    h3: {
      fontFamily: 'Montserrat',
      fontSize: '2.5rem',
    },
    h4: {
      fontFamily: 'Montserrat',
      // fontWeight: 700,
      fontSize: '3rem',
      color: black,
    },
    h5: {
      fontFamily: 'Montserrat',
      fontSize: '1.4rem',
      // fontWeight: 700,
      color: lightGray,
    },
    body1: {
      // fontFamily: 'Montserrat',
      fontSize: '0.8rem',
      color: gray,
    },
    body2: {
      fontFamily: 'Montserrat',
      fontSize: '1.0rem',
      color: black,
    },
  },
  overrides: {
    MuiChip: {
      root: {
        backgroundColor: greenBlue,
      },
      label: {
        fontFamily: 'Montserrat',
        fontSize: '1.5rem',
        color: '#fff',
        // fontWeight: 400,
      },
    },
    '.MuiTextField-root': {
      fontFamily: 'Montserrat',
    },
  },
});

export default theme;
