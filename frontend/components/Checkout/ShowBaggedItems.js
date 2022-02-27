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
import React, { useContext, useState } from 'react';
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

export default function ShowBaggedItems({ shipping }) {
  const { state, dispatch } = useContext(Store);
  const [collapse, setCollapse] = useState(false);

  const {
    cart: { cartItems },
  } = state;

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
              {cartItems.map((item) => (
                <>
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
                        <Avatar src={item.img} alt={item.name}></Avatar>
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.name}
                      secondary={`Each: $${item.price.toFixed(2)}`}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
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
            {cartItems.reduce((a, c) => a + c.quantity * c.price, 0).toFixed(2)}
          </Typography>
        </Paper>
      </Grid>

      {shipping ? (
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
                  Shipping: {shipping === 'standard' ? '$10.00' : '$20.00'}
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
                  (shipping === 'standard' ? 10 : 20)
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
