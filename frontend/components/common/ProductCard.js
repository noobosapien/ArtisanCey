import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Fab,
  Grid,
  IconButton,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import candle from '../../public/figures.jpg';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function ProductCard() {
  const theme = useTheme();

  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesLG = useMediaQuery(theme.breakpoints.down('lg'));
  const matchesXL = useMediaQuery(theme.breakpoints.down('xl'));

  const imgWidth = matchesXS
    ? '10rem'
    : matchesSM
    ? '15rem'
    : matchesMD
    ? '20rem'
    : matchesLG
    ? '25rem'
    : matchesXL
    ? '25rem'
    : '25rem';

  const ImageButton = styled(Fab)(({ theme }) => ({
    // borderRadius: '50px',
  }));

  return (
    <Grid container justifyContent="center">
      <Grid item>
        <Card sx={{ width: imgWidth }} elevation={5}>
          <CardActionArea>
            <CardMedia component="img" image={candle.src} alt="item" />

            <CardContent>
              <Grid
                container
                justifyContent="center"
                direction="column"
                alignItems="center"
              >
                <Grid item>
                  <Typography variant="body1">Name</Typography>
                </Grid>

                <Grid item>
                  <Typography variant="subtitle">$20.00</Typography>
                </Grid>

                <Grid item>
                  <Rating disabled size="small" />
                </Grid>

                <Grid item>
                  <Typography variant="subtitle">(No reviews yet)</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>

          <CardActions>
            <ImageButton color="primary" variant="contained">
              <AddShoppingCartIcon />
            </ImageButton>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
