import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function Message({ text, severity, open, setOpen }) {
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        sx={{ bottom: { xs: 150, sm: 100 } }}
        anchorOrigin={
          matchesMD
            ? { vertical: 'bottom', horizontal: 'center' }
            : { vertical: 'bottom', horizontal: 'left' }
        }
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert severity={severity}>{text}</Alert>
      </Snackbar>
    </div>
  );
}
