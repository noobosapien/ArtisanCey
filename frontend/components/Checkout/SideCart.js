import {
  Avatar,
  Badge,
  Card,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import React, { useContext } from 'react';
import { Store } from '../../utils/store';

export default function SideCart() {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

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
                </>
              ))}
            </List>
          </Grid>

          <Grid item alignSelf="center">
            <Paper
              sx={(theme) => ({
                padding: '1rem',
                background: theme.palette.common.greenBlue,
              })}
            >
              <Typography
                variant="h5"
                sx={(theme) => ({
                  fontFamily: 'Roboto',
                  color: theme.palette.common.white,
                })}
              >
                Subtotal: $
                {cartItems
                  .reduce((a, c) => a + c.quantity * c.price, 0)
                  .toFixed(2)}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
