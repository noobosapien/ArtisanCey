import { styled } from '@mui/material/styles';
import { Button, Collapse, Paper, Stack } from '@mui/material';
import React, { useState } from 'react';
import { Box } from '@mui/system';

const CustomBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('xl')]: {
    height: '5rem',
    background: theme.palette.common.black,
    marginTop: '2%',
  },
  [theme.breakpoints.down('xl')]: {
    height: '4rem',
    background: theme.palette.common.black,
    marginTop: '2%',
  },
  [theme.breakpoints.down('lg')]: {
    height: '4rem',
    background: theme.palette.common.black,
    marginTop: '2%',
  },
  [theme.breakpoints.down('md')]: {
    height: '4rem',
    background: theme.palette.common.black,
    marginTop: '2%',
  },
  [theme.breakpoints.down('sm')]: {
    height: '3rem',
    background: theme.palette.common.black,
    marginTop: '2%',
  },
  [theme.breakpoints.down('xs')]: {
    height: '3rem',
    background: theme.palette.common.black,
    marginTop: '1%',
  },
}));

const PaperDrop = styled(Paper)(({ theme }) => ({
  width: '1.5rem',
  height: '2rem',
  background: theme.palette.common.greenBlue,
  // marginTop: '2rem',
  marginLeft: '1rem',
  borderRadius: '10rem 10rem 5rem 5rem',
  cursor: 'pointer',
}));

export default function TopMenu() {
  const [openMenu, setOpenMenu] = useState(true);

  const handlePaperClick = (e) => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
      <Collapse in={openMenu} collapsedSize={10}>
        <CustomBox>
          <Stack></Stack>
        </CustomBox>
      </Collapse>

      <div
        style={{
          borderLeft: '0.1rem solid #3a8783',
          height: '1rem',
          marginLeft: '1.7rem',
        }}
      ></div>
      <PaperDrop size="small" onClick={handlePaperClick} />
    </>
  );
}
