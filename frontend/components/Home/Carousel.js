import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Typography,
  IconButton,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { getTopRated } from '../../helpers/getTopRated';
import SmallProductCard from '../common/SmallProductCard';
import { useRouter } from 'next/router';
import OTP from '../../public/OTP.png';

const CustomImg = styled(Card)(({ theme }) => ({
  [theme.breakpoints.down('xl')]: {
    width: '187.5px',
    // height: '350px',
  },

  [theme.breakpoints.down('lg')]: {
    width: '187.5px',
    // height: '350px',
  },

  [theme.breakpoints.down('md')]: {
    width: '187.5px',
    // height: '350px',
  },

  [theme.breakpoints.down('sm')]: {
    width: '150px',
    // height: '200px',
  },

  [theme.breakpoints.down('xs')]: {
    width: '150px',
    // height: '200px',
  },

  position: 'absolute',
  backgroundColor: '#3a8783cc',
  borderRadius: '2rem',
  left: '10px',
  top: '10px',
  transition: 'transform 1s ease',
}));

const CustomTyp = styled(Typography)(({ theme }) => ({
  backgroundColor: '#474747cc',
  color: '#fff',
  borderRadius: '2rem',
}));

export default function Carousel({ products }) {
  const theme = useTheme();
  const router = useRouter();

  const [rotation1, setRotation1] = useState(0);
  const [rotation2, setRotation2] = useState(120);
  const [rotation3, setRotation3] = useState(240);

  const [z1, setZ1] = useState(100);
  const [z2, setZ2] = useState(90);
  const [z3, setZ3] = useState(90);

  const [zTranslate, setZTranslate] = useState(100);

  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesLG = useMediaQuery(theme.breakpoints.down('lg'));
  const matchesXL = useMediaQuery(theme.breakpoints.down('xl'));

  const slides = [];

  if (products instanceof Array && products.length > 0) {
    products.forEach((product) => {
      var item = {};

      item.image = product.images[0].url;
      item.name = product.name;
      item.height = product.images[0].height;
      item.price = product.price;
      item.slug = product.slug;
      item.noofreviews = product.noofreviews ? product.noofreviews : 0;
      item.rating = product.rating ? product.rating : 0;

      slides.push(item);
    });
  }

  useEffect(() => {
    matchesXS
      ? setZTranslate(100)
      : matchesSM
      ? setZTranslate(100)
      : matchesMD
      ? setZTranslate(100)
      : matchesLG
      ? setZTranslate(100)
      : matchesXL
      ? setZTranslate(100)
      : setZTranslate(100);
  }, [matchesXS, matchesSM, matchesMD, matchesLG, matchesXL]);

  useEffect(() => {
    const interval = setInterval(() => {
      let rot1 = rotation1 + 120;
      let rot2 = rotation2 + 120;
      let rot3 = rotation3 + 120;

      if (rot1 >= 360) {
        rot1 = 0;
        setZ1(100);
        setZ2(90);
        setZ3(90);
      }

      if (rot2 >= 360) {
        rot2 = 0;
        setZ1(90);
        setZ2(100);
        setZ3(90);
      }

      if (rot3 >= 360) {
        rot3 = 0;
        setZ1(90);
        setZ2(90);
        setZ3(100);
      }

      setRotation1(rot1);
      setRotation2(rot2);
      setRotation3(rot3);
    }, 10000);

    return () => clearInterval(interval);
  }, [rotation1, rotation2, rotation3]);

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
        sx={{ marginBottom: '60vh' }}
      >
        <Grid item alignSelf="center">
          <Typography variant="h3">Most viewed items</Typography>
        </Grid>

        <Grid item>
          <div
            style={{
              marginLeft: '10%',
              marginTop: '10%',
              width: '210px',
              height: '140px',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
              }}
            >
              <CustomImg
                elevation={10}
                style={{
                  transform: `perspective(1000px) rotateY(${rotation1}deg) translateZ(${zTranslate}px)`,
                  zIndex: z1,
                }}
              >
                <CardActionArea
                  onClick={(e) => {
                    router.push(`/product/${slides[0].slug}`);
                  }}
                >
                  <CardMedia component="img" image={slides[0].image} />
                  <CardContent>
                    <CustomTyp align="center">{slides[0].name}</CustomTyp>
                    <Rating
                      name="product1"
                      size="small"
                      defaultValue={slides[0].rating}
                      precision={0.5}
                      readOnly
                      sx={{
                        backgroundColor: '#3a8783cc',
                        borderRadius: '2rem',
                      }}
                    />
                    <CustomTyp align="center">
                      ({slides[0].noofreviews}) reviews
                    </CustomTyp>
                    <CustomTyp align="center" variant="h6">
                      ${slides[0].price}
                    </CustomTyp>
                  </CardContent>
                </CardActionArea>

                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    sx={{ borderRadius: '2rem' }}
                  >
                    <AddShoppingCartIcon />
                  </Button>
                </CardActions>
              </CustomImg>

              <CustomImg
                elevation={10}
                style={{
                  transform: `perspective(1000px) rotateY(${rotation2}deg) translateZ(${zTranslate}px)`,
                  zIndex: z2,
                }}
              >
                <CardActionArea
                  onClick={(e) => {
                    router.push(`/product/${slides[1].slug}`);
                  }}
                >
                  <CardMedia component="img" image={slides[1].image} />
                  <CardContent>
                    <CustomTyp align="center">{slides[1].name}</CustomTyp>
                    <Rating
                      name="product2"
                      size="small"
                      defaultValue={slides[1].rating}
                      precision={0.5}
                      readOnly
                      sx={{
                        backgroundColor: '#3a8783cc',
                        borderRadius: '2rem',
                      }}
                    />
                    <CustomTyp align="center">
                      ({slides[1].noofreviews}) reviews
                    </CustomTyp>
                    <CustomTyp align="center" variant="h6">
                      ${slides[1].price}
                    </CustomTyp>
                  </CardContent>
                </CardActionArea>

                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    sx={{ borderRadius: '2rem' }}
                  >
                    <AddShoppingCartIcon />
                  </Button>
                </CardActions>
              </CustomImg>

              <CustomImg
                elevation={10}
                style={{
                  transform: `perspective(1000px) rotateY(${rotation3}deg) translateZ(${zTranslate}px)`,
                  zIndex: z3,
                }}
              >
                <CardActionArea
                  onClick={(e) => {
                    router.push(`/product/${slides[2].slug}`);
                  }}
                >
                  <CardMedia component="img" image={slides[2].image} />
                  <CardContent>
                    <CustomTyp align="center">{slides[2].name}</CustomTyp>
                    <Rating
                      name="product3"
                      size="small"
                      defaultValue={slides[2].rating}
                      precision={0.5}
                      readOnly
                      sx={{
                        backgroundColor: '#3a8783cc',
                        borderRadius: '2rem',
                      }}
                    />
                    <CustomTyp align="center">
                      ({slides[2].noofreviews}) reviews
                    </CustomTyp>
                    <CustomTyp align="center" variant="h6">
                      ${slides[2].price}
                    </CustomTyp>
                  </CardContent>
                </CardActionArea>

                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    sx={{ borderRadius: '2rem' }}
                  >
                    <AddShoppingCartIcon />
                  </Button>
                </CardActions>
              </CustomImg>
            </div>
          </div>
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
