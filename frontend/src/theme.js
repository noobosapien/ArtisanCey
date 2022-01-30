import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      //   main: '#3a8783',
      main: '#ffffff',
    },
    secondary: {
      main: '#ff8800',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
