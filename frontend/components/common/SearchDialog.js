import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';

import { useInput } from '@mui/base';
import { styled } from '@mui/system';
import { Grid } from '@mui/material';

const StyledInputElement = styled('input')(
  ({ theme }) => `
  width: 100%;
  font-size: 1.2rem;
  font-family: Roboto;
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

      const result = await fetch(
        `https://cms.artisancey.com/products?${query}&_limit=5`
      );

      const items = await result.json();
      const updatedList = [];

      items instanceof Array &&
        items.forEach((item) => {
          const i = {};

          i.id = item.id;
          i.slug = item.slug;
          i.name = item.name;
          i.image = item.images instanceof Array ? item.images[0].url : '';
          i.price = item.price;

          updatedList.push(i);
        });

      setSearchResults(updatedList);
    }
  };

  const list = () => (
    <Box sx={{ width: 'auto' }} role="search">
      <List></List>
    </Box>
  );

  return (
    <>
      <Drawer
        anchor={'top'}
        open={openSearch}
        onClose={closeSearchHandler}
        sx={(theme) => ({
          '& .MuiDrawer-paperAnchorTop': {
            // background:
            //   'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(58,135,131,1) 50%, rgba(255,255,255,1) 100%)',
          },
        })}
      >
        <Grid container justifyContent="space-evenly" sx={{ marginTop: '4%' }}>
          <Grid item xs={10} sm={10} md={8} lg={6}>
            <CustomInput
              aria-label="Search bar"
              placeholder="Search..."
              autoFocus
            />
          </Grid>
        </Grid>
        {list()}
      </Drawer>
    </>
  );
}
