import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

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
      greenBlue: '#3a8783',
    },
  },
});

export default theme;
