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
      // item.slug = product.slug

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

  return (
    <Grid
      container
      justifyContent="space-evenly"
      alignItems="center"
      spacing={10}
      sx={{ marginTop: '0%' }}
    >
      <Grid item>
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
              <CardActionArea>
                <CardMedia component="img" image={slides[0].image} />
                <CardContent>
                  <CustomTyp align="center">{slides[0].name}</CustomTyp>
                  <Rating
                    name="product1"
                    size="small"
                    defaultValue={4.5}
                    precision={0.5}
                    readOnly
                    sx={{ backgroundColor: '#3a8783cc', borderRadius: '2rem' }}
                  />
                  <CustomTyp align="center">(14 ratings)</CustomTyp>
                  <CustomTyp align="center">${slides[0].price}0</CustomTyp>
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
              <CardActionArea>
                <CardMedia component="img" image={slides[1].image} />
                <CardContent>
                  <CustomTyp align="center">{slides[1].name}</CustomTyp>
                  <Rating
                    name="product2"
                    size="small"
                    defaultValue={4.5}
                    precision={0.5}
                    readOnly
                    sx={{ backgroundColor: '#3a8783cc', borderRadius: '2rem' }}
                  />
                  <CustomTyp align="center">(14 ratings)</CustomTyp>
                  <CustomTyp align="center">${slides[0].price}0</CustomTyp>
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
              <CardActionArea>
                <CardMedia component="img" image={slides[2].image} />
                <CardContent>
                  <CustomTyp align="center">{slides[2].name}</CustomTyp>
                  <Rating
                    name="product3"
                    size="small"
                    defaultValue={4.5}
                    precision={0.5}
                    readOnly
                    sx={{ backgroundColor: '#3a8783cc', borderRadius: '2rem' }}
                  />
                  <CustomTyp align="center">(14 ratings)</CustomTyp>
                  <CustomTyp align="center">${slides[0].price}0</CustomTyp>
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
  );
}
