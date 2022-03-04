import React, { useReducer } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Rating, Typography } from '@mui/material';

export default function AddReview() {
  const [open, setOpen] = React.useState(false);

  function reducer(state, action) {
    switch (action.type) {
      case 'EMAIL_CHANGED': {
        const valid =
          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
            action.payload
          );

        return {
          ...state,
          email: { error: false, value: action.payload, valid },
        };
      }

      case 'RATING_CHANGED': {
        const valid =
          action.payload !== '' &&
          Number(action.payload) > 0 &&
          Number(action.payload) <= 5;

        return {
          ...state,
          rating: { error: false, value: Number(action.payload), valid },
        };
      }

      case 'FIRST_NAME_CHANGED': {
        const valid = action.payload !== '';

        return {
          ...state,
          firstName: { error: false, value: action.payload, valid },
        };
      }

      case 'LAST_NAME_CHANGED': {
        const valid = action.payload !== '';

        return {
          ...state,
          lastName: { error: false, value: action.payload, valid },
        };
      }

      case 'HEADING_CHANGED': {
        const valid = action.payload !== '';

        return {
          ...state,
          heading: { error: false, value: action.payload, valid },
        };
      }

      case 'REVIEW_CHANGED': {
        const valid = action.payload !== '';

        return {
          ...state,
          review: { error: false, value: action.payload, valid },
        };
      }

      case 'EMAIL_INVALID': {
        return {
          ...state,
          email: { ...state.email, error: true },
        };
      }

      case 'RATING_INVALID': {
        return {
          ...state,
          rating: { ...state.rating, error: true },
        };
      }

      case 'FIRST_NAME_INVALID': {
        return {
          ...state,
          firstName: { ...state.firstName, error: true },
        };
      }

      case 'LAST_NAME_INVALID': {
        return {
          ...state,
          lastName: { ...state.lastName, error: true },
        };
      }

      case 'HEADING_INVALID': {
        return {
          ...state,
          heading: { ...state.heading, error: true },
        };
      }

      case 'REVIEW_INVALID': {
        return {
          ...state,
          review: { ...state.review, error: true },
        };
      }

      default:
        return state;
    }
  }

  const [stateInfo, dispatchInfo] = useReducer(reducer, {
    email: { error: false, value: '', valid: false },
    rating: { error: false, value: 0, valid: false },
    firstName: { error: false, value: '', valid: false },
    lastName: { error: false, value: '', valid: false },
    heading: { error: false, value: '', valid: false },
    review: { error: false, value: '', valid: false },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var errors = false;

    const keys = Object.keys(stateInfo);

    for (var i = 0; i < keys.length; i++) {
      if (!stateInfo[keys[i]].valid) {
        errors = true;
        break;
      }
    }

    if (!errors) {
      setOpen(false);
    }

    if (!stateInfo.email.valid) {
      dispatchInfo({ type: 'EMAIL_INVALID' });
    }

    if (!stateInfo.rating.valid) {
      dispatchInfo({ type: 'RATING_INVALID' });
    }

    if (!stateInfo.firstName.valid) {
      dispatchInfo({ type: 'FIRST_NAME_INVALID' });
    }

    if (!stateInfo.lastName.valid) {
      dispatchInfo({ type: 'LAST_NAME_INVALID' });
    }

    if (!stateInfo.heading.valid) {
      dispatchInfo({ type: 'HEADING_INVALID' });
    }

    if (!stateInfo.review.valid) {
      dispatchInfo({ type: 'REVIEW_INVALID' });
    }
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Add your review
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add your review</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the email you used to order this item with.
            <Typography
              sx={(theme) => ({
                color: theme.palette.common.orange,
              })}
            >
              It will only be used for verification purposes and not shown in
              the final review.
            </Typography>
          </DialogContentText>

          <Grid container direction="column" spacing={4}>
            <Grid item>
              <TextField
                required
                value={stateInfo.email.value}
                onChange={(e) => {
                  dispatchInfo({
                    type: 'EMAIL_CHANGED',
                    payload: e.target.value,
                  });
                }}
                error={stateInfo.email.error}
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
              />
            </Grid>

            <Grid
              item
              container
              alignItems="center"
              spacing={4}
              justifyContent="space-evenly"
            >
              <Grid item>
                <Typography
                  sx={(theme) => ({
                    color: stateInfo.rating.error
                      ? 'red'
                      : theme.palette.common.black,
                  })}
                  variant="h6"
                >
                  Rating:
                </Typography>
              </Grid>

              <Grid item>
                <Rating
                  value={stateInfo.rating.value}
                  onChange={(e) => {
                    dispatchInfo({
                      type: 'RATING_CHANGED',
                      payload: e.target.value,
                    });
                  }}
                  error={stateInfo.rating.error}
                  size="large"
                  precision={0.5}
                  emptyLabelText="Rating"
                />
              </Grid>
            </Grid>

            <Grid item container spacing={4}>
              <Grid item>
                <TextField
                  required
                  value={stateInfo.firstName.value}
                  onChange={(e) => {
                    dispatchInfo({
                      type: 'FIRST_NAME_CHANGED',
                      payload: e.target.value,
                    });
                  }}
                  error={stateInfo.firstName.error}
                  margin="dense"
                  id="firstName"
                  label="First Name"
                  variant="standard"
                />
              </Grid>

              <Grid item>
                <TextField
                  required
                  value={stateInfo.lastName.value}
                  onChange={(e) => {
                    dispatchInfo({
                      type: 'LAST_NAME_CHANGED',
                      payload: e.target.value,
                    });
                  }}
                  error={stateInfo.lastName.error}
                  margin="dense"
                  id="lastName"
                  label="Last Name"
                  variant="standard"
                />
              </Grid>
            </Grid>

            <Grid item>
              <TextField
                required
                value={stateInfo.heading.value}
                onChange={(e) => {
                  dispatchInfo({
                    type: 'HEADING_CHANGED',
                    payload: e.target.value,
                  });
                }}
                error={stateInfo.heading.error}
                margin="dense"
                id="heading"
                label="Heading"
                variant="standard"
              />
            </Grid>

            <Grid item>
              <TextField
                id="review"
                value={stateInfo.review.value}
                onChange={(e) => {
                  dispatchInfo({
                    type: 'REVIEW_CHANGED',
                    payload: e.target.value,
                  });
                }}
                error={stateInfo.review.error}
                label="Review"
                multiline
                minRows={4}
                required
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleSubmit}>
            Submit
          </Button>

          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
