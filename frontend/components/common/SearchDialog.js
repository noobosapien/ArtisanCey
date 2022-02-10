import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import Image from 'next/image';

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

  return (
    <Dialog
      open={openSearch}
      onClose={closeSearchHandler}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Search</DialogTitle>
      <DialogContent sx={{}}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            marginBottom: '5%',
          }}
        >
          <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            fullWidth
            id="searchField"
            label="Search..."
            variant="standard"
            autoFocus
            onChange={handleTextEnter}
          />
        </Box>

        <Divider />

        <List
          sx={{ width: '100%', bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              View all products
            </ListSubheader>
          }
        >
          {searchResults.map((result) => {
            return (
              <ListItemButton key={result.id}>
                <ListItemIcon>
                  <Image
                    src={result.image}
                    alt={result.name}
                    width={50}
                    height={50}
                  />
                </ListItemIcon>
                <ListItemText primary={result.name} />
                <ListItemText primary={`$${result.price}`} />
              </ListItemButton>
            );
          })}
        </List>
      </DialogContent>
    </Dialog>
  );
}
