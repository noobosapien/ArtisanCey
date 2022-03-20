import {
  Avatar,
  Badge,
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../../utils/store';
import DirectionsBoatFilledOutlinedIcon from '@mui/icons-material/DirectionsBoatFilledOutlined';
import { getProductInfo } from '../../helpers/getProductInfo';

export default function SideCart({ shipping, order }) {
  const { state, dispatch } = useContext(Store);
  const [items, setItems] = useState([]);
  const [shippingOption, setShippingOption] = useState({});

  const {
    cart: { cartItems },
  } = state;

  useEffect(() => {
    const getItemsFromServer = async () => {
      if (order && order.items) {
        if (order.shippingInfo.firstName) {
          var allItems = [];
          const parsed = order.items;
          const parsedShipping = order.shippingOption;

          if (parsed instanceof Array) {
            for (var i = 0; i < parsed.length; i++) {
              const product = await getProductInfo(parsed[i].id);
              product[0].quantity = parsed[i].quantity;
              product[0].img = product[0].images[0].url;

              allItems.push(product[0]);
            }
          }

          setItems([...allItems]);
          setShippingOption(parsedShipping);
        } else {
          var allItems = [];
          const parsed = JSON.parse(order.items);
          const parsedShipping = JSON.parse(order.shippingOption);

          if (parsed instanceof Array) {
            for (var i = 0; i < parsed.length; i++) {
              const product = await getProductInfo(parsed[i].id);
              product[0].quantity = parsed[i].quantity;
              product[0].img = product[0].images[0].url;

              allItems.push(product[0]);
            }
          }

          setItems([...allItems]);
          setShippingOption(parsedShipping);
        }
      }
    };

    getItemsFromServer();
  }, [order]);

  return (
    <>
      <Card variant="outlined" sx={{ border: 0 }}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <List
              sx={{
                width: '100%',
                bgcolor: 'background.paper',
                zIndex: 0,
              }}
            >
              {order
                ? items.map((item) => (
                    <React.Fragment key={item.id}>
                      <ListItem
                        secondaryAction={
                          <Typography sx={{ fontSize: '1.5rem' }}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </Typography>
                        }
                      >
                        <ListItemAvatar>
                          <Badge
                            badgeContent={item.quantity}
                            color="primary"
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'left',
                            }}
                          >
                            <Avatar
                              src={item.img}
                              alt={item.name}
                              sx={{ width: 100, height: 100 }}
                            ></Avatar>
                          </Badge>
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.name}
                          secondary={`Each: $${item.price.toFixed(2)}`}
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))
                : cartItems.map((item) => (
                    <React.Fragment key={`${item.id}_`}>
                      <ListItem
                        key={item.id}
                        secondaryAction={
                          <Typography sx={{ fontSize: '1.5rem' }}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </Typography>
                        }
                      >
                        <ListItemAvatar>
                          <Badge
                            badgeContent={item.quantity}
                            color="primary"
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'left',
                            }}
                          >
                            <Avatar
                              src={item.img}
                              alt={item.name}
                              sx={{ width: 100, height: 100 }}
                            ></Avatar>
                          </Badge>
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.name}
                          secondary={`Each: $${item.price.toFixed(2)}`}
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
            </List>
          </Grid>

          {order ? (
            <>
              <Grid item alignSelf="center">
                <Paper
                  variant="outlined"
                  sx={(theme) => ({
                    padding: '1rem',
                    background: shipping
                      ? theme.palette.common.white
                      : theme.palette.common.darkGray,
                  })}
                >
                  <Typography
                    variant="h5"
                    sx={(theme) => ({
                      fontFamily: 'Roboto',
                      fontSize: shipping ? '1.2rem' : '1.4rem',
                      color: shipping
                        ? theme.palette.common.black
                        : theme.palette.common.white,
                    })}
                  >
                    Subtotal: $
                    {items
                      .reduce((a, c) => a + c.quantity * c.price, 0)
                      .toFixed(2)}
                  </Typography>
                </Paper>
              </Grid>
            </>
          ) : cartItems.length ? (
            <>
              <Grid item alignSelf="center">
                <Paper
                  variant="outlined"
                  sx={(theme) => ({
                    padding: '1rem',
                    background: shipping
                      ? theme.palette.common.white
                      : theme.palette.common.darkGray,
                  })}
                >
                  <Typography
                    variant="h5"
                    sx={(theme) => ({
                      fontFamily: 'Roboto',
                      fontSize: shipping ? '1.2rem' : '1.4rem',
                      color: shipping
                        ? theme.palette.common.black
                        : theme.palette.common.white,
                    })}
                  >
                    Subtotal: $
                    {cartItems
                      .reduce((a, c) => a + c.quantity * c.price, 0)
                      .toFixed(2)}
                  </Typography>
                </Paper>
              </Grid>
            </>
          ) : (
            <></>
          )}

          {order ? (
            <>
              <Grid item alignSelf="center">
                <Grid container spacing={2}>
                  <Grid item>
                    <DirectionsBoatFilledOutlinedIcon
                      sx={(theme) => ({
                        color: theme.palette.common.black,
                      })}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">
                      Shipping:{' '}
                      {shippingOption.label === 'standard' ? '$5.00' : '$20.00'}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item alignSelf="center">
                <Paper
                  variant="outlined"
                  sx={(theme) => ({
                    padding: '1rem',
                    background: theme.palette.common.darkGray,
                  })}
                >
                  <Typography
                    variant="h5"
                    sx={(theme) => ({
                      fontFamily: 'Roboto',
                      color: theme.palette.common.white,
                    })}
                  >
                    Total: $
                    {(
                      items.reduce((a, c) => a + c.quantity * c.price, 0) +
                      (shippingOption.label === 'standard' ? 5 : 20)
                    ).toFixed(2)}
                  </Typography>
                </Paper>
              </Grid>
            </>
          ) : shipping && cartItems.length ? (
            <>
              <Grid item alignSelf="center">
                <Grid container spacing={2}>
                  <Grid item>
                    <DirectionsBoatFilledOutlinedIcon
                      sx={(theme) => ({
                        color: theme.palette.common.black,
                      })}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">
                      Shipping: {shipping === 'standard' ? '$5.00' : '$20.00'}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item alignSelf="center">
                <Paper
                  variant="outlined"
                  sx={(theme) => ({
                    padding: '1rem',
                    background: theme.palette.common.darkGray,
                  })}
                >
                  <Typography
                    variant="h5"
                    sx={(theme) => ({
                      fontFamily: 'Roboto',
                      color: theme.palette.common.white,
                    })}
                  >
                    Total: $
                    {(
                      cartItems.reduce((a, c) => a + c.quantity * c.price, 0) +
                      (shipping === 'standard' ? 5 : 20)
                    ).toFixed(2)}
                  </Typography>
                </Paper>
              </Grid>
            </>
          ) : (
            <></>
          )}
        </Grid>
      </Card>
    </>
  );
}
