import {
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  Rating,
  TextField,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Controller, useForm } from 'react-hook-form';
import { setReview } from '../../helpers/setReview';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
import LocalMallTwoToneIcon from '@mui/icons-material/LocalMallTwoTone';

export default function ProductPage(props) {
  const { product } = props;

  const [showForm, setShowForm] = useState(false);

  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ rating, name, email, text }) => {
    try {
      setShowForm(false);
      const abortController = new AbortController();
      const signal = abortController.signal;
      await setReview(product[0]._id, rating, name, email, text, signal);
    } catch (e) {
      console.log(e);
    }
  };

  const prodInfo = product instanceof Array && product.length ? product[0] : {};

  const images = [];

  if (prodInfo.images instanceof Array) {
    prodInfo.images.forEach((image) => {
      const item = {
        original: image.url,
        thumbnail: image.url,
      };

      images.push(item);
    });
  }

  return (
    <Layout title={prodInfo.name} description={prodInfo.description}>
      <Grid container direction="column" sx={{ marginTop: '4rem' }}>
        <Grid item>
          {/* Product */}
          <Grid container justifyContent="space-evenly" spacing={3}>
            <Grid item>
              <ImageGallery
                items={images}
                showFullscreenButton={false}
                showPlayButton={false}
                thumbnailPosition={matchesMD ? 'bottom' : 'left'}
              />
            </Grid>

            <Grid item xs={10} lg={5}>
              <Grid container direction="column" spacing={3}>
                <Grid item>
                  <Typography variant="h4">{prodInfo.name}</Typography>
                </Grid>

                <Grid item container alignItems="center" spacing={3}>
                  <Grid item>
                    <Rating precision={0.5} value={prodInfo.rating} readOnly />
                  </Grid>
                  <Grid item>
                    <Typography>({prodInfo.reviews.length} reviews)</Typography>
                  </Grid>
                </Grid>

                <Grid item>
                  <Typography
                    variant="h5"
                    sx={(theme) => ({
                      color: theme.palette.common.black,
                      fontSize: '2.0rem',
                    })}
                  >
                    ${prodInfo.price.toFixed(2)}
                  </Typography>
                </Grid>

                <Grid item container alignItems="center" spacing={3}>
                  <Grid item>
                    <Typography sx={{ fontSize: '1rem', fontWeight: '700' }}>
                      Qty:
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Grid container>
                      <Grid item>
                        <IconButton
                          color="primary"
                          aria-label="increase quantity"
                          component="span"
                        >
                          <ArrowCircleDownTwoToneIcon
                            sx={(theme) => ({
                              color: theme.palette.common.lightRed,
                            })}
                          />
                        </IconButton>
                      </Grid>

                      <Grid item>
                        <TextField
                          variant="outlined"
                          type="number"
                          size="small"
                          sx={{
                            width: '7ch',
                            'input::-webkit-inner-spin-button': {
                              '-webkit-appearance': 'none',
                              margin: 0,
                            },

                            'input[type=number]': {
                              '-moz-appearance': 'textfield',
                            },
                          }}
                        />
                      </Grid>

                      <Grid item>
                        <IconButton
                          color="primary"
                          aria-label="decrease quantity"
                          component="span"
                        >
                          <ArrowCircleUpTwoToneIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Button
                      startIcon={<LocalMallTwoToneIcon />}
                      variant="contained"
                    >
                      Add to bag
                    </Button>
                  </Grid>
                </Grid>

                <Grid item>
                  <Typography
                    align="center"
                    paragraph
                    variant="body2"
                    sx={(theme) => ({
                      fontSize: '1.3rem',
                      color: theme.palette.common.lightGray,
                    })}
                  >
                    {prodInfo.description}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>{/* Similar */}</Grid>

        <Grid item>{/* Reviews */}</Grid>

        <Grid item container direction="column">
          <Grid item>
            {showForm ? (
              <form onSubmit={handleSubmit(submitHandler)}>
                <List>
                  <ListItem>
                    <Controller
                      name="rating"
                      control={control}
                      defaultValue={0}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => {
                        return (
                          <Rating precision={0.5} id="rating" {...field} />
                        );
                      }}
                    ></Controller>
                  </ListItem>

                  <ListItem>
                    <Controller
                      name="name"
                      control={control}
                      defaultValue={''}
                      rules={{
                        required: true,
                        minLength: 2,
                      }}
                      render={({ field }) => {
                        return (
                          <>
                            <TextField
                              variant="outlined"
                              fullWidth
                              id="name"
                              label="Name"
                              inputProps={{ type: 'text' }}
                              error={Boolean(errors.name)}
                              helperText={
                                errors.name
                                  ? errors.name.type === 'minLength'
                                    ? 'Name is not valid'
                                    : 'Name is required'
                                  : ''
                              }
                              {...field}
                            />
                          </>
                        );
                      }}
                    />
                  </ListItem>

                  <ListItem>
                    <Controller
                      name="email"
                      control={control}
                      defaultValue={''}
                      rules={{
                        required: true,
                        pattern:
                          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                      }}
                      render={({ field }) => {
                        return (
                          <>
                            <Typography>
                              Email will only be used for verifying purposes and
                              won't be shown in the review!
                            </Typography>
                            <TextField
                              variant="outlined"
                              fullWidth
                              id="email"
                              label="Email"
                              inputProps={{ type: 'email' }}
                              error={Boolean(errors.email)}
                              helperText={
                                errors.email
                                  ? errors.email.type === 'pattern'
                                    ? 'Email is not valid'
                                    : 'Email is required'
                                  : ''
                              }
                              {...field}
                            />{' '}
                          </>
                        );
                      }}
                    />
                  </ListItem>

                  <ListItem>
                    <Controller
                      name="text"
                      control={control}
                      defaultValue={''}
                      rules={{}}
                      render={({ field }) => {
                        return (
                          <TextField
                            variant="outlined"
                            multiline
                            fullWidth
                            id="text"
                            label="Review"
                            inputProps={{ type: 'text' }}
                            error={Boolean(errors.text)}
                            helperText={
                              errors.text
                                ? errors.text.type === 'minLength'
                                  ? 'Please enter your review'
                                  : 'Please enter your review'
                                : ''
                            }
                            {...field}
                          />
                        );
                      }}
                    ></Controller>
                  </ListItem>

                  <ListItem>
                    <Button type="submit" variant="contained">
                      Submit
                    </Button>
                  </ListItem>
                </List>
              </form>
            ) : (
              <Button variant="outlined" onClick={(e) => setShowForm(true)}>
                Add a review
              </Button>
            )}
          </Grid>
          {prodInfo.reviews instanceof Array
            ? prodInfo.reviews.map((review) => {
                return (
                  <Grid item container key={review._id}>
                    <Grid item>
                      <Typography>{review.user}</Typography>
                    </Grid>

                    <Grid item>
                      <Rating readOnly value={review.rating} precision={0.5} />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography>{review.text}</Typography>
                    </Grid>
                  </Grid>
                );
              })
            : undefined}
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    const res = await fetch(process.env.STRAPI_BASE + `products`);
    const products = await res.json();

    const names = [];
    products.forEach((prod) => {
      names.push('/product/' + prod.slug); //This has the first letter capital
    });

    return {
      paths: names,
      fallback: true,
    };
  } catch (e) {}
}

export async function getStaticProps(context) {
  try {
    const { params } = context;
    const { slug } = params;

    var param = slug.toLowerCase();

    const res = await fetch(process.env.STRAPI_BASE + `products?slug=${param}`);
    const product = await res.json();

    return {
      props: {
        product,
      },
    };
  } catch (e) {
    console.log(e);
  }
}
