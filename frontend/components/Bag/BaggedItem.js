import {
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function BaggedItem({ item, removeItemHandler }) {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card variant="outlined" sx={{ width: matchesSM ? '18rem' : '30rem' }}>
      <Grid container direction="column" spacing={2}>
        <Grid item container justifyContent="space-between">
          <Grid item>
            {/* <CardActionArea> */}
            <Grid container spacing={2}>
              <Grid item>
                <CardMedia
                  component="img"
                  height="138rem"
                  image={item.images[0].url}
                  alt={item.name}
                />
              </Grid>

              <Grid item alignSelf="center">
                <Grid container direction="column" alignItems="center">
                  <Grid item>
                    <Typography variant="body2">{item.name}</Typography>
                  </Grid>

                  <Grid item>
                    <Typography>Each: NZ${item.price.toFixed(2)}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* </CardActionArea> */}
          </Grid>

          <Grid item>
            <IconButton onClick={removeItemHandler}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>

        <Grid item container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="body2">Quantity: {item.quantity}</Typography>
          </Grid>

          <Grid item>
            <Typography variant="body2" sx={{ fontSize: '2rem' }}>
              NZ$ {(item.price * item.quantity).toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
