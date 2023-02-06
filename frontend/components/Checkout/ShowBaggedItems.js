import {
  Badge,
  Button,
  Card,
  Collapse,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Store } from '../../utils/store';
import DirectionsBoatFilledOutlinedIcon from '@mui/icons-material/DirectionsBoatFilledOutlined';
import { getOrder } from '../../helpers/getOrder';
import { getProductInfo } from '../../helpers/getProductInfo';

export default function ShowBaggedItems({ shipping, order, auth }) {
  const { state, dispatch } = useContext(Store);
  const [collapse, setCollapse] = useState(false);

  const [orderItems, setOrderItems] = useState([]);
  const [orderShipping, setOrderShipping] = useState('');
  const [orderSTotal, setOrderSTotal] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);

  const {
    cart: { cartItems },
  } = state;

  useEffect(() => {
    if (order) {
      const getOrderFromServer = async (order) => {
        try {
          var result = {};

          result = order;

          const items =
            typeof result.items === 'string'
              ? JSON.parse(result.items)
              : result.items;

          const shipping =
            typeof result.shippingOption === 'string'
              ? JSON.parse(result.shippingOption)
              : result.shippingOption;
          shipping && setOrderShipping(shipping.label);

          setOrderSTotal(result.subtotal);
          setOrderTotal(result.total);

          const oItems = [];

          if (items instanceof Array) {
            for (var i = 0; i < items.length; i++) {
              const prod = await getProductInfo(items[i].id);
              if (prod instanceof Array && prod.length > 0) {
                prod[0].quantity = items[i].quantity;
                prod[0].img = prod[0].images[0].url;

                oItems.push(prod[0]);
              }
            }
          }

          setOrderItems([...oItems]);
        } catch (e) {
          console.log(e);
        }
      };

      getOrderFromServer(order);
    }
  }, [order]);

  const handleColapseClicked = (e) => {
    setCollapse(!collapse);
  };

  return (
    <Grid container direction="column" justifyContent="center" spacing={4}>
      <Grid item alignSelf="center">
        <Button
          size="large"
          startIcon={<ShoppingBagOutlinedIcon />}
          endIcon={
            collapse ? (
              <ArrowCircleUpTwoToneIcon />
            ) : (
              <ArrowCircleDownTwoToneIcon />
            )
          }
          onClick={handleColapseClicked}
        >
          Show bagged items
        </Button>
      </Grid>

      <Grid item>
        <Collapse in={collapse}>
          <Card variant="outlined" sx={{ marginTop: '30px' }}>
            <List
              sx={{
                width: '100%',
                bgcolor: 'background.paper',
                zIndex: 0,
              }}
            >
              {order
                ? orderItems.map((item) => (
                    <React.Fragment key={item.id}>
                      <ListItem
                        secondaryAction={
                          <Typography sx={{ fontSize: '1.5rem' }}>
                            NZ${(item.price * item.quantity).toFixed(2)}
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
                              src={item.images[0].url}
                              alt={item.name}
                            ></Avatar>
                          </Badge>
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.name}
                          secondary={`Each: NZ$${item.price.toFixed(2)}`}
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))
                : cartItems.map((item) => (
                    <React.Fragment key={`${item.id}_`}>
                      <ListItem
                        secondaryAction={
                          <Typography sx={{ fontSize: '1.5rem' }}>
                            NZ${(item.price * item.quantity).toFixed(2)}
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
                              src={item.images[0].url}
                              alt={item.name}
                            ></Avatar>
                          </Badge>
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.name}
                          secondary={`Each: NZ$${item.price.toFixed(2)}`}
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
            </List>
          </Card>
        </Collapse>
      </Grid>

      <Grid item alignSelf="center">
        <Paper
          variant="outlined"
          sx={(theme) => ({
            padding: '1rem',
            background:
              shipping || order
                ? theme.palette.common.white
                : theme.palette.common.darkGray,
          })}
        >
          <Typography
            variant="h5"
            sx={(theme) => ({
              fontFamily: 'Montserrat',
              fontSize: shipping ? '1.2rem' : '1.4rem',
              color:
                shipping || order
                  ? theme.palette.common.black
                  : theme.palette.common.white,
            })}
          >
            Subtotal: NZ$
            {order && orderSTotal
              ? orderSTotal.toFixed(2)
              : cartItems
                  .reduce((a, c) => a + c.quantity * c.price, 0)
                  .toFixed(2)}
          </Typography>
        </Paper>
      </Grid>

      {shipping || order ? (
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
                  {order
                    ? orderShipping === 'standard'
                      ? 'NZ$5.00'
                      : orderShipping === 'express'
                      ? 'NZ$20.00'
                      : ''
                    : ''}
                  {!order && (shipping === 'standard' ? 'NZ$5.00' : 'NZ$20.00')}
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
                  fontFamily: 'Montserrat',
                  color: theme.palette.common.white,
                })}
              >
                Total: NZ$
                {order && orderTotal
                  ? orderTotal.toFixed(2)
                  : (
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
  );
}
