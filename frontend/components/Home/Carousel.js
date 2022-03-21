import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getTopRated } from '../../helpers/getTopRated';
import SmallProductCard from '../common/SmallProductCard';
import { useRouter } from 'next/router';
import OTP from '../../public/OTP.png';
import Carousel3D from './Carousel3D';

export default function Carousel({ products }) {
  const theme = useTheme();
  const router = useRouter();

  const [slides, setSlides] = useState([]);

  useEffect(() => {
    if (products instanceof Array && products.length > 0) {
      const _slides = [];
      products.forEach((product) => {
        var item = {};

        item.image = product.images[0].url;
        item.name = product.name;
        item.height = product.images[0].height;
        item.price = product.price;
        item.slug = product.slug;
        item.noofreviews = product.noofreviews ? product.noofreviews : 0;
        item.rating = product.rating ? product.rating : 0;

        _slides.push(item);
      });

      setSlides([..._slides]);
    }
  }, [products]);

  const [RatedCL, setRatedCL] = useState([]);
  const [RatedAC, setRatedAC] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const result = await getTopRated('62108e8587e59b6047859e53', 3);
      if (result instanceof Array) setRatedCL([...result]);

      const result2 = await getTopRated('622d249f6c49bb3c9664a51d', 3);
      if (result2 instanceof Array) setRatedAC([...result2]);
    };

    getProducts();
  }, []);

  return (
    <Grid
      container
      justifyContent="space-evenly"
      alignItems="center"
      spacing={10}
      sx={{ marginTop: '10%' }}
    >
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        xs={12}
        lg={4}
        sx={{ marginBottom: '30vh' }}
      >
        <Grid item alignSelf="center">
          <Typography variant="h3">Most viewed items</Typography>
        </Grid>

        <Grid
          item
          sx={(theme) => ({
            [theme.breakpoints.up('sm')]: {
              marginTop: '40vh',
            },
            [theme.breakpoints.down('sm')]: {
              marginTop: '30vh',
            },
          })}
        >
          <Carousel3D slides={slides} />
        </Grid>
      </Grid>

      <Grid item xs={12} lg={4} container direction="column" spacing={10}>
        <Grid item container alignItems="center" direction="column" spacing={6}>
          <Grid item>
            <Typography
              sx={(theme) => ({
                fontFamily: 'Ranga',
                fontSize: '1.5rem',
              })}
            >
              Top rated from
            </Typography>
            <Typography
              sx={(theme) => ({
                fontFamily: 'Monoton',
                fontSize: '1.0rem',
              })}
            >
              Clean Living
            </Typography>
          </Grid>
          <Grid item container justifyContent="space-evenly" spacing={4}>
            {RatedCL.map((cl) => (
              <Grid item key={cl.id}>
                <SmallProductCard product={cl} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item>
          <Card elevation={10}>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <CardContent>
                  <Typography
                    align="center"
                    variant="body2"
                    sx={{ fontSize: '2rem' }}
                  >
                    We donate 20% of our earnings to the cause
                  </Typography>
                </CardContent>
              </Grid>

              <Grid item>
                <Image height="50" width={215} src={OTP.src} alt="OTP" />
              </Grid>

              <Grid item>
                <CardContent>
                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    spacing={4}
                  >
                    <Grid item>
                      <Typography
                        align="center"
                        variant="body2"
                        sx={{ fontSize: '2rem' }}
                      >
                        every month
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Button
                        variant="outlined"
                        onClick={(e) => router.push('/about')}
                      >
                        Learn more
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid item container alignItems="center" direction="column" spacing={6}>
          <Grid item>
            <Typography
              sx={(theme) => ({
                fontFamily: 'Ranga',
                fontSize: '1.5rem',
              })}
            >
              Top rated from
            </Typography>
            <Typography
              sx={(theme) => ({
                fontFamily: 'Monoton',
                fontSize: '1.0rem',
              })}
            >
              Artisan's corner
            </Typography>
          </Grid>
          <Grid item container justifyContent="space-evenly" spacing={4}>
            {RatedAC.map((cl) => (
              <Grid item key={`${cl.id}_AC`}>
                <SmallProductCard product={cl} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
