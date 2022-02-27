import { Grid, TextField } from '@mui/material';
import React, { useReducer, useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
} from 'react-places-autocomplete';

export default function SelectAddress({
  countryCode,
  stateInfo,
  dispatchInfo,
}) {
  const [google, setGoogle] = useState('');

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

  var searchOptions = {
    componentRestrictions: { country: countryCode ? countryCode : '' },
  };

  const setAddress = (e) => {
    dispatchInfo({
      type: 'ADDRESS_CHANGE',
      payload: e,
    });
  };

  return (
    <Grid container direction="column" spacing={2}>
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
                    backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
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
    </Grid>
  );
}
