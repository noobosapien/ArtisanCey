import React, { useEffect, useState } from 'react';
import Clean from '../../public/nature.svg';
import Tree from '../../public/Tree.svg';
import Shell from '../../public/shell_bowl.jpg';
import Image from 'next/image';
import loadable from '@loadable/component';
import { styled } from '@mui/system';

import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useRouter } from 'next/router';

const Carousel = loadable(() => import('react-spring-3d-carousel'));

const CustomImg = styled(Card)(({ theme }) => ({
  [theme.breakpoints.down('xl')]: {
    // width: '187.5px',
    // height: '350px',
  },

  [theme.breakpoints.down('sm')]: {
    // width: '150px',
    // height: '200px',
  },

  backgroundColor: '#3a8783cc',
  borderRadius: '2rem',
}));

const CustomTyp = styled(Typography)(({ theme }) => ({
  backgroundColor: '#474747cc',
  color: '#fff',
  borderRadius: '2rem',
}));

export default function Carousel3D({ slides }) {
  const router = useRouter();
  const [slide, setSlide] = useState(0);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (slide === 2) {
        setSlide(0);
      } else {
        setSlide(slide + 1);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [slide]);

  useEffect(() => {
    if (slides instanceof Array) {
      const _cards = [];

      slides.forEach((sl, i) => {
        const card = (
          <CustomImg elevation={10} sx={{ margin: '0 5rem', width: '10rem' }}>
            <CardActionArea
              onClick={(e) => {
                router.push(`/product/${sl.slug}`);
              }}
            >
              <CardMedia component="img" image={sl.image} />
              <CardContent>
                <CustomTyp align="center">{sl.name}</CustomTyp>
                <Rating
                  name="product1"
                  size="small"
                  defaultValue={sl.rating}
                  precision={0.5}
                  readOnly
                  sx={{
                    backgroundColor: '#3a8783cc',
                    borderRadius: '2rem',
                  }}
                />
                <CustomTyp align="center">({sl.noofreviews}) reviews</CustomTyp>
                <CustomTyp align="center" variant="h6">
                  ${sl.price}
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
        );

        _cards.push({ key: i, content: card });
      });

      setCards([..._cards]);
    }
  }, [slides]);

  return <Carousel slides={cards} goToSlide={slide} />;
}
