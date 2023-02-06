import { Card, CardActionArea, CardMedia, Grid } from '@mui/material';
import Example from '../../public/example.png';
import React, { useEffect, useState } from 'react';

export default function ProductCarousel({ product }) {
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    product && product.images instanceof Array
      ? setMainImage(product.images[0].url)
      : undefined;
  }, [product]);

  const imageClicked = (url) => (e) => {
    setMainImage(url);
  };

  return (
    <>
      <Grid container direction="column" spacing={6} alignItems={'center'}>
        <Grid item>
          <Card sx={{ borderRadius: '1rem', maxWidth: '25rem' }}>
            <CardMedia
              component="img"
              height="auto"
              image={mainImage}
              alt="example"
            />
          </Card>
        </Grid>

        <Grid item>
          <Grid container justifyContent="space-evenly" spacing={6}>
            {product && product.images instanceof Array ? (
              product.images.map((image) => (
                <Grid item xs={3}>
                  <Card sx={{ borderRadius: '0rem', maxWidth: '5rem' }}>
                    <CardActionArea onClick={imageClicked(image.url)}>
                      <CardMedia
                        component="img"
                        height="auto"
                        image={image.url}
                        alt="example"
                      />
                    </CardActionArea>
                  </Card>
                </Grid>
              ))
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
