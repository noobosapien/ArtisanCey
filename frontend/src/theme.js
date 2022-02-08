import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const greenBlue = '#3a8783';
const black = '#474747';
const lightGray = '#787878';
const gray = '#5c5c5c';
const darkGray = '#454545';
const lightBrown = '#B1AB7D';
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
    },
  },

  typography: {
    h1: {
      fontSize: '4.5rem',
      fontFamily: 'Ranga',
      fontStyle: 'italic',
      // fontWeight: 700,
      color: greenBlue,
    },
    h2: {
      fontFamily: 'Rancho',
      fontSize: '3rem',
      // fontWeight: 500,
      color: black,
    },
    h3: {
      fontFamily: 'Rancho',
      fontSize: '2rem',
      // fontWeight: 300,
      color: black,
    },
    h4: {
      fontFamily: 'Ranga',
      fontStyle: 'italic',
      // fontWeight: 700,
      fontSize: '3rem',
      color: black,
    },
    h5: {
      fontFamily: 'Ranga',
      fontSize: '1.4rem',
      // fontWeight: 700,
      fontStyle: 'italic',
      color: lightGray,
    },
    body1: {
      fontFamily: 'Ranga',
      fontSize: '1.0rem',
      color: darkGray,
    },
    body2: {
      fontFamily: 'Rancho',
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
        fontFamily: 'Rancho',
        fontSize: '1.5rem',
        color: '#fff',
        // fontWeight: 400,
      },
    },
  },
});

export default theme;
