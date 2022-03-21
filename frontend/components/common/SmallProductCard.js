import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Rating,
  Typography,
} from '@mui/material';
import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function SmallProductCard({ product, noReviews }) {
  const router = useRouter();

  return (
    <Grid container direction="column">
      <Grid item>
        <Card sx={{ width: '120px' }}>
          <CardActionArea
            onClick={(e) => {
              router.push(`/product/${product.slug}`);
            }}
          >
            <CardMedia
              component="img"
              alt={product.name}
              image={product.images instanceof Array && product.images[0].url}
              height="140"
            />
          </CardActionArea>
        </Card>
      </Grid>

      {noReviews ? (
        <></>
      ) : (
        <Grid
          item
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Grid item>
            <Rating value={product.rating} readOnly />
          </Grid>
          <Grid item>
            <Typography>
              ({product.noofreviews ? product.noofreviews : 0} reviews)
            </Typography>
          </Grid>
        </Grid>
      )}

      <Grid item alignSelf="center">
        <Typography variant="body2">{product.name}</Typography>
      </Grid>
    </Grid>
  );
}
