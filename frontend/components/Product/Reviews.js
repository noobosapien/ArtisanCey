import {
  Avatar,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  Rating,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getReviewsForProduct } from '../../helpers/getReviewsForProduct';
import moment from 'moment';
import ReviewSort from './ReviewSort';
import AddReview from './AddReview';
import { getProductInfo } from '../../helpers/getProductInfo';

const mdReviews = (
  product,
  sort,
  setSort,
  noOfReviews,
  rating,
  reviews,
  handleAddPage
) => {
  return (
    <>
      <Grid container direction="column" spacing={4} alignItems="center">
        <Grid item>
          <Typography variant="h3">Reviews</Typography>
        </Grid>

        <Grid item container direction="column" spacing={4}>
          {/* info */}
          <Grid item alignSelf="center">
            <Rating value={rating} readOnly precision={0.5} />
          </Grid>

          <Grid item alignSelf="center">
            <Typography variant="h6">
              {rating} from {noOfReviews} customers
            </Typography>
          </Grid>

          <Grid item>
            <Divider variant="middle" />
          </Grid>

          <Grid
            item
            container
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Grid item>
              <AddReview product={product} />
            </Grid>

            <Grid item>
              <ReviewSort sort={sort} setSort={setSort} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Divider variant="middle" />
        </Grid>

        {reviews.map((review) => (
          <Grid item container direction="column" spacing={4} key={review.id}>
            <Grid item alignSelf="flex-end">
              <Typography>
                {moment.duration(moment().diff(review.createdAt)).humanize() +
                  ' ago'}
              </Typography>
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
                    sx={(theme) => ({
                      bgcolor: theme.palette.common.greenBlue,
                      width: 64,
                      height: 64,
                    })}
                  >
                    {review.user.slice(0, 1).toUpperCase()}
                  </Avatar>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '1.5rem',
                    }}
                  >
                    {review.user.slice(0, 1).toUpperCase()}
                    {review.user.slice(1).toLowerCase()}
                  </Typography>
                </Grid>

                <Grid item>
                  <Chip
                    label={review.verified ? 'Verified buyer' : 'Not verified'}
                    sx={(theme) => ({
                      fontSize: '1.0rem',
                      color: '#fff',
                      background: review.verified
                        ? theme.palette.common.greenBlue
                        : theme.palette.common.orange,
                    })}
                  />
                </Grid>
              </Grid>

              <Grid item>
                <Divider orientation="vertical" />
              </Grid>

              <Grid xs={6} item container direction="column" spacing={4}>
                <Grid item>
                  <Rating
                    size="large"
                    value={review.rating}
                    readOnly
                    precision={0.5}
                  />
                </Grid>

                <Grid item>
                  <Typography
                    variant="body2"
                    sx={(theme) => ({
                      fontSize: '2.0rem',
                      color: theme.palette.common.lightGray,
                    })}
                  >
                    {review.heading ? review.heading : ''}
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography
                    variant="body1"
                    sx={(theme) => ({
                      fontSize: '1.2rem',
                      color: theme.palette.common.black,
                      fontFamily: 'Roboto',
                    })}
                  >
                    {review.text ? review.text : ''}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Divider variant="middle" />
            </Grid>
          </Grid>
        ))}

        <Grid item>
          <Button onClick={handleAddPage}>Show more</Button>
        </Grid>
      </Grid>
    </>
  );
};

const xsReviews = (
  product,
  sort,
  setSort,
  noOfReviews,
  rating,
  reviews,
  handleAddPage
) => {
  return (
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
            <Rating value={rating} readOnly precision={0.5} />
          </Grid>

          <Typography variant="h6">
            {rating} from {noOfReviews} customers
          </Typography>
        </Grid>

        <Grid item container justifyContent="space-around" alignItems="center">
          <Grid item>
            <AddReview product={product} />
          </Grid>

          <Grid item>
            <ReviewSort sort={sort} setSort={setSort} />
          </Grid>
        </Grid>

        <Grid item>
          <Divider variant="middle" />
        </Grid>

        {reviews.map((review) => (
          <Grid item key={`${review.id}-xs`}>
            <Card variant="outlined" sx={{ padding: '1rem', width: '18rem' }}>
              <Grid container direction="column" spacing={4}>
                <Grid item alignSelf="flex-end">
                  <Typography>
                    {moment
                      .duration(moment().diff(review.updatedAt))
                      .humanize() + ' ago'}
                  </Typography>
                </Grid>

                <Grid item container spacing={4} alignItems="center">
                  <Grid item>
                    <Avatar
                      sx={(theme) => ({
                        bgcolor: theme.palette.common.greenBlue,
                      })}
                    >
                      {review.user.slice(0, 1).toUpperCase()}
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Typography
                      sx={(theme) => ({
                        fontFamily: 'Rancho',
                        fontSize: '2rem',
                      })}
                    >
                      {review.user.slice(0, 1).toUpperCase()}
                      {review.user.slice(1).toLowerCase()}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item>
                  <Rating
                    size="large"
                    value={review.rating}
                    readOnly
                    precision={0.5}
                  />
                </Grid>

                <Grid item>
                  <Chip
                    label={review.verified ? 'Verified buyer' : 'Not verified'}
                    sx={(theme) => ({
                      fontSize: '1.0rem',
                      color: '#fff',
                      background: review.verified
                        ? theme.palette.common.greenBlue
                        : theme.palette.common.orange,
                    })}
                  />
                </Grid>

                <Grid item alignSelf="center">
                  <Typography
                    sx={(theme) => ({
                      fontSize: '1.4rem',
                      color: theme.palette.common.lightGray,
                      fontFamily: 'Rancho',
                    })}
                  >
                    {review.heading ? review.heading : ''}
                  </Typography>
                </Grid>

                <Grid item alignSelf="center">
                  <Typography
                    sx={(theme) => ({
                      fontSize: '1.0rem',
                      color: theme.palette.common.black,
                      fontFamily: 'Roboto',
                    })}
                  >
                    {review.text ? review.text : ''}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}

        <Grid item>
          <Button onClick={handleAddPage}>Show more</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default function Reviews({ product, page, setPage }) {
  const theme = useTheme();
  const [reviews, setReviews] = useState([]);
  const [sort, setSort] = useState('latest');
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    const getReviews = async () => {
      const result = await getReviewsForProduct(product.id, page, sort);
      result instanceof Array ? setReviews([...reviews, ...result]) : undefined;
    };

    const updateProductRating = async () => {
      const result = await getProductInfo(product.id);
      result instanceof Array ? (product.rating = result[0].rating) : undefined;
      result instanceof Array
        ? (product.noofreviews = result[0].noofreviews)
        : undefined;
    };

    updateProductRating();

    getReviews();
  }, [page, product, update]);

  useEffect(() => {
    setPage(1);
    setUpdate(update + 1);
    setReviews([]);
  }, [sort]);

  const handleAddPage = (e) => {
    setPage(page + 1);
  };

  //get reviews here
  const matchesSM = useMediaQuery(theme.breakpoints.up('sm'));
  return matchesSM
    ? mdReviews(
        product,
        sort,
        setSort,
        product.noofreviews,
        product.rating,
        reviews,
        handleAddPage,
        setUpdate,
        update
      )
    : xsReviews(
        product,
        sort,
        setSort,
        product.noofreviews,
        product.rating,
        reviews,
        handleAddPage,
        setUpdate,
        update
      );
}
