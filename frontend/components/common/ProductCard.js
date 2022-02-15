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
import { useRouter } from 'next/router';
import { Store } from '../../utils/store';

export default function ProductCard({ product }) {
  const prod = {
    img: candle.src,
    name: 'Name',
    price: '20',
    slug: '',
    noOfReviews: 0,
    rating: 0,
    // reviews: [],
  };
  const router = useRouter();

  if (product) {
    prod.img =
      product.images && product.images[0] ? product.images[0].url : candle.src;
    prod.name = product.name ? product.name : 'Name';
    prod.price = product.price ? product.price : '20';
    prod.slug = product.slug ? product.slug : '';
    prod.noOfReviews = product.noofreviews ? product.noofreviews : 0;
    prod.rating = product.rating ? product.rating : 0;
    // prod.reviews = product.reviews ? product.reviews : [];
  }

  console.log(prod);
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

  const handleGotoProduct = (slug) => (e) => {
    router.push(`/product/${slug}`);
  };

  const handleAddToCart = async (e) => {};

  return (
    <Grid container justifyContent="center">
      <Grid item>
        <Card sx={{ width: imgWidth }} elevation={5}>
          <CardActionArea onClick={handleGotoProduct(prod.slug)}>
            <CardMedia component="img" image={prod.img} alt="item" />

            <CardContent>
              <Grid
                container
                justifyContent="center"
                direction="column"
                alignItems="center"
              >
                <Grid item>
                  <Typography variant="body1">{prod.name}</Typography>
                </Grid>

                <Grid item>
                  <Typography
                    variant="subtitle"
                    sx={(theme) => ({
                      fontSize: '2rem',
                      color: theme.palette.common.greenBlue,
                      fontWeight: '600',
                    })}
                  >
                    ${prod.price}.00
                  </Typography>
                </Grid>

                <Grid item>
                  <Rating
                    precision={0.5}
                    disabled={prod.rating === 0}
                    readOnly
                    size="small"
                    value={prod.rating}
                  />
                </Grid>

                <Grid item>
                  <Typography variant="subtitle">
                    {prod.noOfReviews
                      ? `(${prod.noOfReviews} reviews)`
                      : '(No reviews yet)'}
                  </Typography>
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
