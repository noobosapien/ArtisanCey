import React, { useContext, useEffect, useReducer, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Collapse, Grid, Radio, TextField, Typography } from '@mui/material';
import PlacesAutocomplete, {
  geocodeByAddress,
} from 'react-places-autocomplete';
import { Store } from '../../utils/store';
import SelectCountry from '../Checkout/SelectCountry';

export default function BillingAddress({ diff, setDiff }) {
  const [countryCode, setCountryCode] = useState('');
  const [countryValid, setCountryValid] = useState(true);
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    dispatch({
      type: 'SAVE_BILLING_COUNTRY',
      payload: { value: countryCode },
    });
  }, [countryCode]);

  var searchOptions = {
    componentRestrictions: { country: countryCode ? countryCode : '' },
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'FIRSTNAME_CHANGE': {
        const valid = action.payload !== '';

        dispatch({
          type: 'SAVE_BILLING_ADDRESS',
          payload: {
            ...state,
            firstName: { error: false, value: action.payload, valid },
          },
        });

        return {
          ...state,
          firstName: { error: false, value: action.payload, valid },
        };
      }

      case 'LASTNAME_CHANGE': {
        const valid = action.payload !== '';

        dispatch({
          type: 'SAVE_BILLING_ADDRESS',
          payload: {
            ...state,
            lastName: { error: false, value: action.payload, valid },
          },
        });

        return {
          ...state,
          lastName: { error: false, value: action.payload, valid },
        };
      }

      case 'ADDRESS_CHANGE': {
        const valid = action.payload !== '';

        dispatch({
          type: 'SAVE_BILLING_ADDRESS',
          payload: {
            ...state,
            address: { error: false, value: action.payload, valid },
          },
        });

        return {
          ...state,
          address: { error: false, value: action.payload, valid },
        };
      }

      case 'APARTMENT_CHANGE': {
        const valid = action.payload !== '';

        dispatch({
          type: 'SAVE_BILLING_ADDRESS',
          payload: {
            ...state,
            apartment: { error: false, value: action.payload, valid },
          },
        });

        return {
          ...state,
          apartment: { error: false, value: action.payload, valid },
        };
      }

      case 'REGION_CHANGE': {
        const valid = action.payload !== '';

        dispatch({
          type: 'SAVE_BILLING_ADDRESS',
          payload: {
            ...state,
            region: { error: false, value: action.payload, valid },
          },
        });

        return {
          ...state,
          region: { error: false, value: action.payload, valid },
        };
      }

      case 'CITY_CHANGE': {
        const valid = action.payload !== '';

        dispatch({
          type: 'SAVE_BILLING_ADDRESS',
          payload: {
            ...state,
            city: { error: false, value: action.payload, valid },
          },
        });

        return {
          ...state,
          city: { error: false, value: action.payload, valid },
        };
      }

      case 'ZIPCODE_CHANGE': {
        const valid = action.payload !== '';

        dispatch({
          type: 'SAVE_BILLING_ADDRESS',
          payload: {
            ...state,
            zipCode: { error: false, value: action.payload, valid },
          },
        });

        return {
          ...state,
          zipCode: { error: false, value: action.payload, valid },
        };
      }

      case 'PHONE_CHANGE': {
        const valid = action.payload !== '';

        dispatch({
          type: 'SAVE_BILLING_ADDRESS',
          payload: {
            ...state,
            phone: { error: false, value: action.payload, valid },
          },
        });

        return {
          ...state,
          phone: { error: false, value: action.payload, valid },
        };
      }

      case 'FIRSTNAME_INVALID': {
        return {
          ...state,
          firstName: { ...state.firstName, error: true },
        };
      }

      case 'LASTNAME_INVALID': {
        return {
          ...state,
          lastName: { ...state.lastName, error: true },
        };
      }

      case 'ADDRESS_INVALID': {
        return {
          ...state,
          address: { ...state.address, error: true },
        };
      }

      case 'APARTMENT_INVALID': {
        return {
          ...state,
          apartment: { ...state.apartment, error: true },
        };
      }

      case 'REGION_INVALID': {
        return {
          ...state,
          region: { ...state.region, error: true },
        };
      }

      case 'CITY_INVALID': {
        return {
          ...state,
          city: { ...state.city, error: true },
        };
      }

      case 'ZIPCODE_INVALID': {
        return {
          ...state,
          zipCode: { ...state.zipCode, error: true },
        };
      }

      case 'PHONE_INVALID': {
        return {
          ...state,
          phone: { ...state.phone, error: true },
        };
      }

      default:
        return state;
    }
  }

  const [stateInfo, dispatchInfo] = useReducer(reducer, {
    firstName: state.cart.billingAddress
      ? state.cart.billingAddress.firstName
      : '',
    lastName: state.cart.billingAddress
      ? state.cart.billingAddress.lastName
      : '',
    address: state.cart.billingAddress ? state.cart.billingAddress.address : '',
    apartment: state.cart.billingAddress
      ? state.cart.billingAddress.apartment
      : '',
    city: state.cart.billingAddress ? state.cart.billingAddress.city : '',
    region: state.cart.billingAddress ? state.cart.billingAddress.region : '',
    zipCode: state.cart.billingAddress ? state.cart.billingAddress.zipCode : '',
    phone: state.cart.billingAddress ? state.cart.billingAddress.phone : '',
  });

  const setAddress = (e) => {
    dispatchInfo({
      type: 'ADDRESS_CHANGE',
      payload: e,
    });
  };

  const handleSelect = async (value) => {
    const result = await geocodeByAddress(value);

    // optional parameter
    const addressNameFormat = {
      street_number: 'short_name',
      route: 'long_name',
      political: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'long_name',
      administrative_area_level_2: 'long_name',
      country: 'long_name',
      postal_code: 'short_name',
    };

    const getAddressComp = function (type) {
      for (const component of result[0].address_components) {
        if (component.types[0] === type) {
          return component[addressNameFormat[type]];
        }
      }
      return '';
    };

    dispatchInfo({
      type: 'ADDRESS_CHANGE',
      payload: `${getAddressComp('street_number')} ${getAddressComp('route')} `,
    });
    dispatchInfo({
      type: 'APARTMENT_CHANGE',
      // payload: getAddressComp('political'),
      payload:
        getAddressComp('political') === ''
          ? getAddressComp('locality')
          : getAddressComp('political'),
    });
    dispatchInfo({
      type: 'CITY_CHANGE',
      payload:
        getAddressComp('administrative_area_level_2') === ''
          ? getAddressComp('administrative_area_level_1')
          : getAddressComp('administrative_area_level_2'),
    });
    dispatchInfo({
      type: 'REGION_CHANGE',
      payload: getAddressComp('administrative_area_level_1'),
    });
    dispatchInfo({
      type: 'ZIPCODE_CHANGE',
      payload: getAddressComp('postal_code'),
    });
  };

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <ListItem disablePadding>
        <ListItemButton role={undefined} onClick={(e) => setDiff(false)} dense>
          <ListItemIcon>
            <Radio checked={!diff} />
          </ListItemIcon>
          <ListItemText id={'shipping'} primary={`Same as shpping address`} />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton role={undefined} onClick={(e) => setDiff(true)} dense>
          <ListItemIcon>
            <Radio checked={diff} />
          </ListItemIcon>
          <ListItemText
            id={'different'}
            primary={`Enter a different address`}
          />
        </ListItemButton>
      </ListItem>

      <ListItem>
        <Collapse in={diff} sx={{ width: '100%' }}>
          <Typography>Enter the billing address</Typography>

          <Grid container direction="column" spacing={2}>
            <Grid item>
              {!countryValid ? (
                <Typography sx={{ color: 'red' }}>Country*</Typography>
              ) : (
                <Typography>Country*</Typography>
              )}{' '}
              {'  '}
              <SelectCountry
                setCountryValid={setCountryValid}
                setCountry={(country) => {
                  setCountryCode(country);
                  dispatch({
                    type: 'SAVE_BILLING_COUNTRY',
                    payload: { value: countryCode },
                  });
                }}
                countryCode={countryCode}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                required
                label="First name"
                fullWidth
                size="small"
                error={stateInfo.firstName.error}
                value={stateInfo.firstName.value}
                onChange={(e) => {
                  dispatchInfo({
                    type: 'FIRSTNAME_CHANGE',
                    payload: e.target.value,
                  });
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                required
                label="Last name"
                fullWidth
                size="small"
                error={stateInfo.lastName.error}
                value={stateInfo.lastName.value}
                onChange={(e) => {
                  dispatchInfo({
                    type: 'LASTNAME_CHANGE',
                    payload: e.target.value,
                  });
                }}
              />
            </Grid>

            <Grid item>
              <PlacesAutocomplete
                searchOptions={searchOptions}
                value={stateInfo.address.value}
                onChange={setAddress}
                onSelect={handleSelect}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <>
                    <TextField
                      size="small"
                      inputProps={{ ...getInputProps({}) }}
                      margin="normal"
                      fullWidth
                      error={stateInfo.address.error}
                      label="Address"
                      variant="outlined"
                      value={stateInfo.address.value}
                    />
                    <div>
                      {loading ? <div>loading</div> : null}
                      {suggestions.map((suggestion) => {
                        const style = {
                          backgroundColor: suggestion.active
                            ? '#41b6e6'
                            : '#fff',
                          marginBottom: '10px',
                          fontFamily: 'Roboto',
                        };
                        return (
                          <div
                            key={suggestion.placeId}
                            {...getSuggestionItemProps(suggestion, {
                              style,
                            })}
                          >
                            {suggestion.description}
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </PlacesAutocomplete>
            </Grid>

            <Grid item>
              <TextField
                label="Apartment, suite, etc."
                onChange={(e) => {
                  dispatchInfo({
                    type: 'APARTMENT_CHANGE',
                    payload: e.target.value,
                  });
                }}
                value={stateInfo.apartment.value}
                fullWidth
                size="small"
              />
            </Grid>

            <Grid item>
              <TextField
                required
                label="City"
                error={stateInfo.city.error}
                onChange={(e) => {
                  dispatchInfo({
                    type: 'CITY_CHANGE',
                    payload: e.target.value,
                  });
                }}
                value={stateInfo.city.value}
                fullWidth
                size="small"
              />
            </Grid>

            <Grid item>
              <TextField
                label="Region, state, province, etc."
                error={stateInfo.region.error}
                onChange={(e) => {
                  dispatchInfo({
                    type: 'REGION_CHANGE',
                    payload: e.target.value,
                  });
                }}
                value={stateInfo.region.value}
                fullWidth
                size="small"
                required
              />
            </Grid>

            <Grid item>
              <TextField
                label="Postal code / Zip code"
                error={stateInfo.zipCode.error}
                onChange={(e) => {
                  dispatchInfo({
                    type: 'ZIPCODE_CHANGE',
                    payload: e.target.value,
                  });
                }}
                value={stateInfo.zipCode.value}
                fullWidth
                size="small"
                required
              />
            </Grid>

            <Grid item>
              <TextField
                required
                label="Phone"
                error={stateInfo.phone.error}
                value={stateInfo.phone.value}
                onChange={(e) => {
                  dispatchInfo({
                    type: 'PHONE_CHANGE',
                    payload: e.target.value,
                  });
                }}
                fullWidth
                size="small"
              />
            </Grid>
          </Grid>
        </Collapse>
      </ListItem>
    </List>
  );
}
