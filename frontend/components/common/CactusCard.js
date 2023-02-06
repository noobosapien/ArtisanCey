import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import Example from '../../public/example.png';
import { useRouter } from 'next/router';
import { Store } from '../../utils/store';
import Message from './Message';

export default function CactusCard({ product }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const [openMessage, setOpenMessage] = useState(false);

  const handleAddToCart = async (e) => {
    const existItem = state.cart.cartItems.find((x) => x.id === product.id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });

    setOpenMessage(true);
  };

  return (
    <>
      <Grid container direction="column" alignItems="center" spacing={0}>
        <Grid item>
          <Card sx={{ borderRadius: '2rem' }}>
            <CardActionArea
              onClick={(e) => router.push(`/product/${product.slug}`)}
            >
              <CardMedia
                component="img"
                height="340"
                image={Example.src}
                alt="example"
              />
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item>
          <Typography variant="h6" sx={{ fontWeight: 300 }}>
            {product.name}
          </Typography>
        </Grid>

        <Grid item>
          <Typography textAlign="center" sx={{ padding: '1rem' }}>
            {product.shortdescription}
          </Typography>
        </Grid>

        <Grid item sx={{ marginTop: '1rem', marginBottom: '0.5rem' }}>
          <Typography sx={{ fontWeight: 300, fontSize: '1.6rem' }}>
            NZ${product.price}
          </Typography>
        </Grid>

        <Grid item>
          <Button
            onClick={handleAddToCart}
            variant="contained"
            disableElevation
            color="secondary"
          >
            Get it now
          </Button>
        </Grid>

        <Grid item>
          <Message
            text={`Added ${product.name} to the bag!`}
            severity="success"
            open={openMessage}
            setOpen={setOpenMessage}
          />
        </Grid>
      </Grid>
    </>
  );
}
