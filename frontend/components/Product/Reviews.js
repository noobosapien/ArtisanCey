import {
  Avatar,
  Button,
  Card,
  Divider,
  Grid,
  Rating,
  Typography,
} from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const mdReviews = (
  <>
    <Grid container direction="column" spacing={4} alignItems="center">
      <Grid item>
        <Typography variant="h3">Reviews</Typography>
      </Grid>

      <Grid item container direction="column" spacing={10}>
        {/* info */}
        <Grid item alignSelf="center">
          <Rating />
        </Grid>

        <Grid item>
          <Divider variant="middle" />
        </Grid>

        <Grid item container alignItems="center" justifyContent="space-evenly">
          <Grid item>
            <Button color="secondary" variant="contained">
              Add your review
            </Button>
          </Grid>

          <Grid item>Latest</Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Divider variant="middle" />
      </Grid>

      <Grid item container direction="column" spacing={4}>
        <Grid item alignSelf="flex-end">
          <Typography>Time</Typography>
        </Grid>

        <Grid item container justifyContent="space-evenly">
          <Grid
            xs={2}
            item
            container
            direction="column"
            alignItems="center"
            spacing={4}
          >
            <Grid item>
              <Avatar
                sx={(theme) => ({ bgcolor: theme.palette.common.greenBlue })}
              >
                N
              </Avatar>
            </Grid>
            <Grid item>
              <Typography>Name</Typography>
            </Grid>

            <Grid item>
              <Typography>Verified</Typography>
            </Grid>
          </Grid>

          <Grid item>
            <Divider orientation="vertical" />
          </Grid>

          <Grid xs={6} item container direction="column" spacing={4}>
            <Grid item>
              <Rating />
            </Grid>

            <Grid item>
              <Typography>Heading</Typography>
            </Grid>

            <Grid item>
              <Typography>Description</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Divider variant="middle" />
        </Grid>
      </Grid>

      <Grid item>
        <Button>Show more</Button>
      </Grid>
    </Grid>
  </>
);

const xsReviews = (
  <>
    <Grid container direction="column" spacing={4} alignItems="center">
      <Grid item>
        <Divider variant="middle" />
      </Grid>
      <Grid item container justifyContent="space-evenly" alignItems="center">
        <Grid item>
          <Typography variant="h3">Reviews:</Typography>
        </Grid>

        <Grid item>
          <Rating />
        </Grid>
      </Grid>

      <Grid item container justifyContent="space-around" alignItems="center">
        <Grid item>
          <Button color="secondary" variant="contained">
            Add your review
          </Button>
        </Grid>

        <Grid item>
          <Typography>Latest</Typography>
        </Grid>
      </Grid>

      <Grid item>
        <Divider variant="middle" />
      </Grid>

      <Grid item>
        <Card variant="outlined" sx={{ padding: '1rem', width: '18rem' }}>
          <Grid container direction="column" spacing={4}>
            <Grid item alignSelf="flex-end">
              <Typography>Time</Typography>
            </Grid>

            <Grid item container spacing={4} alignItems="center">
              <Grid item>
                <Avatar
                  sx={(theme) => ({ bgcolor: theme.palette.common.greenBlue })}
                >
                  N
                </Avatar>
              </Grid>
              <Grid item>
                <Typography>Name</Typography>
              </Grid>
            </Grid>

            <Grid item>
              <Rating />
            </Grid>

            <Grid item>
              <Typography>Verified</Typography>
            </Grid>

            <Grid item alignSelf="center">
              <Typography>Description</Typography>
            </Grid>
          </Grid>
        </Card>
      </Grid>

      <Grid item>
        <Button>Show more</Button>
      </Grid>
    </Grid>
  </>
);

export default function Reviews() {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.up('sm'));
  return matchesSM ? mdReviews : xsReviews;
}
