import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';

import { useInput } from '@mui/base';
import { styled } from '@mui/system';
import { Button, Grid, IconButton } from '@mui/material';
import { getSearchResults } from '../../helpers/getSearchResults';
import SmallProductCard from './SmallProductCard';
import CloseIcon from '@mui/icons-material/Close';

const StyledInputElement = styled('input')(
  ({ theme }) => `
  width: 100%;
  font-size: 1.2rem;
  font-family: Montserrat;
  font-weight: 400;
  line-height: 1.5;
  color: ${theme.palette.common.black};
  background: ${theme.palette.common.white};
  border: 1px solid ${theme.palette.common.lightAqua};
  border-radius: 16px;
  padding: 12px 12px;
  transition: all 200ms ease;

  &:hover {
    background: ${theme.palette.common.white};
    border-color: ${theme.palette.common.aqua};
  }

  &:focus {
    outline: 2px solid ${theme.palette.common.greenBlue};
    outline-offset: 4px;
  }
`
);

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  const { getRootProps, getInputProps } = useInput(props, ref);

  return (
    <div {...getRootProps()}>
      <StyledInputElement {...props} {...getInputProps()} />
    </div>
  );
});

export default function SearchDialog({ openSearch, setOpenSearch }) {
  const [searchResults, setSearchResults] = useState([]);
  const closeSearchHandler = (e) => {
    setOpenSearch(false);
    setSearchResults([]);
  };

  const handleTextEnter = async (e) => {
    if (e.target && e.target.value) {
      const words = e.target.value.match(/\b(\w+)\b/g);
      let query = '';

      words instanceof Array &&
        words.forEach((word, i) => {
          if (i < words.length - 1) {
            query = query + `name_contains=${word}&`;
          } else {
            query = query + `name_contains=${word}`;
          }
        });

      const result = await getSearchResults(query);

      const items = result instanceof Array ? [...result] : [];

      // const updatedList = [];

      // items instanceof Array &&
      //   items.forEach((item) => {
      //     const i = {};

      //     i.id = item.id;
      //     i.slug = item.slug;
      //     i.name = item.name;
      //     i.image = item.images instanceof Array ? item.images[0].url : '';
      //     i.price = item.price;

      //     updatedList.push(i);
      //   });

      setSearchResults(items);
    }
  };

  return (
    <>
      <Drawer
        anchor={'top'}
        open={openSearch}
        onClose={closeSearchHandler}
        sx={(theme) => ({
          '& .MuiDrawer-papeMontserratrTop': {
            // background:
            //   'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(58,135,131,1) 50%, rgba(255,255,255,1) 100%)',
          },
        })}
      >
        <Grid
          container
          justifyContent="space-evenly"
          alignItems="center"
          sx={{ marginTop: '4%' }}
        >
          <Grid item xs={8} sm={8} md={8} lg={6}>
            <CustomInput
              onChange={handleTextEnter}
              aria-label="Search bar"
              placeholder="Search..."
              autoFocus
            />
          </Grid>
          <Grid item>
            <IconButton onClick={closeSearchHandler}>
              <CloseIcon />
            </IconButton>
          </Grid>

          <Grid
            item
            container
            xs={12}
            justifyContent="space-evenly"
            sx={{ marginTop: '4%', marginBottom: '2%' }}
          >
            {searchResults.map((product) => (
              <Grid item key={product.id}>
                <SmallProductCard product={product} noReviews />
              </Grid>
            ))}

            {searchResults.length > 0 ? (
              <>
                <Grid item xs={12} />
                {/* <Grid
                  item
                  alignSelf="center"
                  sx={{ marginTop: '4%', marginBottom: '2%' }}
                >
                  <Button variant="contained">Expand search</Button>
                </Grid> */}
              </>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </Drawer>
    </>
  );
}
