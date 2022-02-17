import {
  Grid,
  Button,
  Typography,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Select,
  MenuItem,
  Paper,
} from '@mui/material';
import React, { useContext } from 'react';
import Layout from '../components/Layout';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
import { Store } from '../utils/store';
import CheckoutWizard from '../components/Checkout/CheckoutWizard';
import { useRouter } from 'next/router';

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
          <CheckoutWizard />
        </Grid>

        <Grid item>
          <Card variant="outlined">
            <CardHeader
              title="Contact information"
              sx={(theme) => ({
                '& 	.MuiCardHeader-title': {
                  fontFamily: 'Roboto',
                  fontSize: '1rem',
                  color: theme.palette.common.greenBlue,
                },
              })}
            />

            <CardContent>
              <TextField fullWidth size="small" required label="Email" />
            </CardContent>

            <CardHeader
              title="Shipping address"
              sx={(theme) => ({
                '& 	.MuiCardHeader-title': {
                  fontFamily: 'Roboto',
                  fontSize: '1rem',
                  color: theme.palette.common.greenBlue,
                },
              })}
            />

            <CardContent>
              <form>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Select
                      value="germany"
                      fullWidth
                      label="Country"
                      size="small"
                    >
                      <MenuItem value="germany">Germany</MenuItem>
                    </Select>
                  </Grid>

                  <Grid item>
                    <TextField
                      required
                      label="First name"
                      fullWidth
                      size="small"
                    />
                  </Grid>

                  <Grid item>
                    <TextField
                      required
                      label="Last name"
                      fullWidth
                      size="small"
                    />
                  </Grid>

                  <Grid item>
                    <TextField
                      required
                      label="Address"
                      fullWidth
                      size="small"
                    />
                  </Grid>

                  <Grid item>
                    <TextField
                      label="Apartment, suite, etc."
                      fullWidth
                      size="small"
                    />
                  </Grid>

                  <Grid item>
                    <TextField required label="City" fullWidth size="small" />
                  </Grid>

                  <Grid item>
                    <Select
                      value="germany"
                      fullWidth
                      label="Region"
                      size="small"
                    >
                      <MenuItem value="germany">Germany</MenuItem>
                    </Select>
                  </Grid>

                  <Grid item>
                    <TextField required label="Phone" fullWidth size="small" />
                  </Grid>

                  <Grid item>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      onClick={(e) => {
                        e.preventDefault();
                        router.push('/shipping');
                      }}
                    >
                      Continue to shipping
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}
