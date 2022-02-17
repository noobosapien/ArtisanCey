import {
  Grid,
  Button,
  Typography,
  List,
  ListItem,
  Card,
  CardHeader,
  CardContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Paper,
} from '@mui/material';
import React, { useContext } from 'react';
import Layout from '../components/Layout';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
import { Store } from '../utils/store';
import CheckoutWizard from '../components/Checkout/CheckoutWizard';
import { useRouter } from 'next/router';
import CelebrationIcon from '@mui/icons-material/Celebration';

export default function Checkout() {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  const {
    cart: { cartItems },
  } = state;

  return (
    <Layout>
      <Grid
        container
        justifyContent="center"
        alignItems="space-evenly"
        direction="column"
        spacing={4}
      >
        <Grid item alignSelf="center">
          <Button
            size="large"
            startIcon={<ShoppingBagOutlinedIcon />}
            endIcon={<ArrowCircleDownTwoToneIcon />}
          >
            Show bagged items
          </Button>
        </Grid>

        <Grid item alignSelf="center">
          <Paper
            sx={(theme) => ({
              padding: '1rem',
              background: theme.palette.common.greenBlue,
            })}
          >
            <Typography
              variant="h5"
              sx={(theme) => ({
                fontFamily: 'Roboto',
                color: theme.palette.common.white,
              })}
            >
              Subtotal: $
              {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
              .00{' '}
            </Typography>
          </Paper>
        </Grid>

        <Grid item>
          <CheckoutWizard activeStep={1} />
        </Grid>

        <Grid
          item
          container
          justifyContent="center"
          alignItems="space-evenly"
          direction="column"
          spacing={0}
        >
          <Grid item component={Card}>
            <CardHeader
              title="Contact:"
              sx={(theme) => ({
                '& 	.MuiCardHeader-title': {
                  fontFamily: 'Roboto',
                  fontSize: '0.8rem',
                  color: theme.palette.common.greenBlue,
                },
              })}
            />

            <CardContent>
              <Grid container justifyContent="space-evenly">
                <Grid item xs={8}>
                  <Typography
                    sx={(theme) => ({
                      fontFamily: 'Roboto',
                      fontSize: '1.0rem',
                      color: theme.palette.common.black,
                    })}
                  >
                    email@email.com
                  </Typography>
                </Grid>

                <Grid item>
                  <Button variant="outlined" size="small">
                    change
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>

          <Grid item component={Card}>
            <CardHeader
              title="Ship to:"
              sx={(theme) => ({
                '& 	.MuiCardHeader-title': {
                  fontFamily: 'Roboto',
                  fontSize: '0.8rem',
                  color: theme.palette.common.greenBlue,
                },
              })}
            />

            <CardContent>
              <Grid container justifyContent="space-evenly">
                <Grid item xs={8}>
                  <Typography
                    sx={(theme) => ({
                      fontFamily: 'Roboto',
                      fontSize: '1.0rem',
                      color: theme.palette.common.black,
                    })}
                  >
                    270 S 5th St, Brooklyn, North Dakota, 11211, USA
                  </Typography>
                </Grid>

                <Grid item>
                  <Button variant="outlined" size="small">
                    change
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>

        <Grid item>
          <Typography
            sx={(theme) => ({
              fontFamily: 'Roboto',
              fontSize: '1.0rem',
              color: theme.palette.common.greenBlue,
            })}
          >
            Shipping method
          </Typography>
        </Grid>

        <Grid item>
          <Card variant="outlined">
            <CardContent>
              <Grid container justifyContent="center">
                <Grid item>
                  <RadioGroup
                    aria-labelledby="shipping selection"
                    defaultValue="standard"
                    name="shipping-group"
                  >
                    <FormControlLabel
                      value="standard"
                      control={<Radio />}
                      label="Standard worldwide (4-10 days) - $5.00"
                    />
                    <Divider />
                    <FormControlLabel
                      value="express"
                      control={<Radio />}
                      label="Express worldwide (1-2 days) - $10.00"
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item alignSelf="center">
          <Button
            endIcon={<CelebrationIcon sx={{ color: '#ffff00' }} />}
            variant="contained"
            onClick={(e) => {
              router.push('/payment');
            }}
          >
            One more step
          </Button>
        </Grid>
      </Grid>
    </Layout>
  );
}
