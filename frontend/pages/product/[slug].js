import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Collapse,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Rating,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
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
import SmallProductCard from '../../components/common/SmallProductCard';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Reviews from '../../components/Product/Reviews';
import InfoTable from '../../components/Product/InfoTable';
import { Store } from '../../utils/store';
import { getProductInfo } from '../../helpers/getProductInfo';
import Message from '../../components/common/Message';

export default function ProductPage(props) {
  const { product } = props;

  const { state, dispatch } = useContext(Store);

  const [openMessage, setOpenMessage] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);
  const [amount, setAmount] = useState(1);

  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  const [showRelated, setShowRelated] = useState(true);
  const [update, setUpdate] = useState(1);

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

  useEffect(() => {
    const updateReviews = async () => {
      try {
        const info = await getProductInfo(product[0]?.id);
        prodInfo.noofreviews =
          info instanceof Array && info[0].noofreviews
            ? info[0].noofreviews
            : 0;
        prodInfo.rating =
          info instanceof Array && info[0].rating ? info[0].rating : 0;
        setUpdate(update + 1);
      } catch (e) {
        console.log(e);
      }
    };
    updateReviews();
  }, []);

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

  const handleNumberChange = (e) => {
    const value = e.target.value.replace(/[e\+\-]/gi, '1');
    console.log(value);
    setAmount(value);
  };

  const handleAddAmount = (e) => {
    setAmount(Number(amount) + 1);
  };

  const handleDownAmount = (e) => {
    if (Number(amount) > 1) setAmount(Number(amount) - 1);
  };

  const handleAddToCart = (e) => {
    if (amount === '') {
      dispatch({
        type: 'CART_ADD_ITEM',
        payload: {
          ...product[0],
          img:
            product[0].images &&
            product[0].images[0] &&
            product[0].images[0].url,
          quantity: 1,
        },
      });
    } else {
      dispatch({
        type: 'CART_ADD_ITEM',
        payload: {
          ...product[0],
          img:
            product[0].images &&
            product[0].images[0] &&
            product[0].images[0].url,
          quantity: amount,
        },
      });
    }

    setOpenMessage(true);
  };

  return (
    <Layout title={prodInfo.name} description={prodInfo.description}>
      <Grid
        container
        direction="column"
        sx={{ marginTop: '0rem' }}
        spacing={10}
      >
        <Grid item>
          <Message
            text={`Added ${prodInfo.name} to the bag!`}
            severity="success"
            open={openMessage}
            setOpen={setOpenMessage}
          />
        </Grid>
        <Grid item>
          {/* Product */}
          <Grid container justifyContent="space-evenly" spacing={3}>
            <Grid item>
              <ImageGallery
                items={images}
                showFullscreenButton={false}
                showPlayButton={false}
                thumbnailPosition={'left'}
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
                    <Typography>
                      ({prodInfo.noofreviews ? prodInfo.noofreviews : 0}{' '}
                      reviews)
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item>
                  <Typography
                    variant="h5"
                    sx={(theme) => ({
                      color: theme.palette.common.black,
                      fontSize: '2.0rem',
                      fontFamily: 'Roboto',
                      fontWeight: '600',
                    })}
                  >
                    ${prodInfo.price ? prodInfo.price.toFixed(2) : '0.00'}
                  </Typography>
                </Grid>

                {matchesMD ? (
                  <></>
                ) : (
                  <>
                    <Grid item container alignItems="center" spacing={3}>
                      <Grid item>
                        <Typography
                          sx={{ fontSize: '1rem', fontWeight: '700' }}
                        >
                          Qty:
                        </Typography>
                      </Grid>

                      <Grid item>
                        <Grid container alignItems="center">
                          <Grid item>
                            <IconButton
                              onClick={handleDownAmount}
                              color="primary"
                              aria-label="increase quantity"
                              component="span"
                            >
                              <ArrowCircleDownTwoToneIcon
                                sx={(theme) => ({
                                  color: theme.palette.common.lightRed,
                                  fontSize: '2rem',
                                })}
                              />
                            </IconButton>
                          </Grid>

                          <Grid item>
                            <TextField
                              onChange={handleNumberChange}
                              value={amount}
                              variant="outlined"
                              type="number"
                              size="small"
                              sx={{
                                width: '11ch',
                                'input::-webkit-inner-spin-button': {
                                  '-webkit-appearance': 'none',
                                  margin: 0,
                                },

                                'input[type=number]': {
                                  '-moz-appearance': 'textfield',
                                  'font-size': '1.2rem',
                                  'text-align': 'center',
                                  color: '#3a8783',
                                },
                              }}
                            />
                          </Grid>

                          <Grid item>
                            <IconButton
                              onClick={handleAddAmount}
                              color="primary"
                              aria-label="decrease quantity"
                              component="span"
                            >
                              <ArrowCircleUpTwoToneIcon
                                sx={(theme) => ({
                                  fontSize: '2rem',
                                })}
                              />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item>
                        <Button
                          onClick={handleAddToCart}
                          startIcon={<LocalMallTwoToneIcon />}
                          variant="contained"
                        >
                          Add to bag
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                )}

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

                <Grid item>
                  {product instanceof Array ? (
                    <InfoTable product={product[0]} />
                  ) : (
                    <></>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={10}
        >
          <Grid item>
            <Button
              sx={{ fontSize: '1.2rem', fontFamily: 'Rancho' }}
              endIcon={
                showRelated ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
              }
              onClick={(e) => {
                setShowRelated(!showRelated);
              }}
            >
              {showRelated ? 'Hide' : 'Show'} Related products
            </Button>
          </Grid>

          <Grid item>
            <Collapse in={showRelated}>
              <Grid container justifyContent="space-evenly" spacing={10}>
                {prodInfo.products instanceof Array &&
                  prodInfo.products.map((prod) => {
                    return (
                      <Grid item key={prod.id}>
                        <SmallProductCard product={prod} />
                      </Grid>
                    );
                  })}
              </Grid>
            </Collapse>
          </Grid>
        </Grid>

        <Grid item>
          <Reviews product={prodInfo} page={page} setPage={setPage} />
        </Grid>
      </Grid>

      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <AppBar
          position="fixed"
          color="primary"
          sx={{ top: 'auto', bottom: 0 }}
        >
          <Toolbar>
            <Grid
              container
              spacing={2}
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <IconButton
                      onClick={handleDownAmount}
                      color="secondary"
                      aria-label="increase quantity"
                      component="span"
                    >
                      <ArrowCircleDownTwoToneIcon />
                    </IconButton>
                  </Grid>

                  <Grid item>
                    <TextField
                      onChange={handleNumberChange}
                      value={amount}
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
                          'font-size': '1.2rem',
                          color: '#fff',
                          'text-align': 'center',
                        },
                      }}
                    />
                  </Grid>

                  <Grid item>
                    <IconButton
                      onClick={handleAddAmount}
                      color="secondary"
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
                  onClick={handleAddToCart}
                  startIcon={<LocalMallTwoToneIcon />}
                  variant="contained"
                  color="secondary"
                >
                  Add to bag
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
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
