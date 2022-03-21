import React, { useEffect, useState } from 'react';
import loadable from '@loadable/component';
import { styled } from '@mui/system';

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';

const Carousel = loadable(() => import('react-spring-3d-carousel'));

const CustomImg = styled(Card)(({ theme }) => ({
  backgroundColor: '#3a8783',
  borderRadius: '2rem',
}));

const CustomTyp = styled(Typography)(({ theme }) => ({
  color: '#fff',
  fontFamily: 'Rancho',
  fontSize: '1.0rem',
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
    }, 10000);

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

                <CustomTyp align="center" variant="h6">
                  ${sl.price}
                </CustomTyp>
              </CardContent>
            </CardActionArea>
          </CustomImg>
        );

        _cards.push({ key: i, content: card });
      });

      setCards([..._cards]);
    }
  }, [slides]);

  return <Carousel slides={cards} goToSlide={slide} />;
}
