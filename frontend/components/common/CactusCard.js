import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import React from 'react';
import Example from '../../public/example.png';
import { useRouter } from 'next/router';

export default function CactusCard() {
  const router = useRouter();

  return (
    <>
      <Grid container direction="column" alignItems="center" spacing={0}>
        <Grid item>
          <Card sx={{ borderRadius: '2rem' }}>
            <CardActionArea onClick={(e) => router.push('/product/example')}>
              <CardMedia
                component="img"
                height="340"
                image={Example.src}
                alt="example"
              />
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item>
          <Typography variant="h6" sx={{ fontWeight: 300 }}>
            Name
          </Typography>
        </Grid>

        <Grid item>
          <Typography>...Description...</Typography>
        </Grid>

        <Grid item sx={{ marginTop: '1rem', marginBottom: '0.5rem' }}>
          <Typography sx={{ fontWeight: 300, fontSize: '1.6rem' }}>
            NZ$9.99
          </Typography>
        </Grid>

        <Grid item>
          <Button variant="contained" disableElevation color="secondary">
            Get it now
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
