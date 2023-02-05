import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Image from 'next/image';

export default function InfoTable({ product }) {
  const [rows, setRows] = React.useState([
    // { name: 'Shell design', value: 'A' },
  ]);

  React.useEffect(() => {
    if (product && product.additionalInfo instanceof Array) {
      setRows([...product.additionalInfo]);
    } else {
      setRows([
        {
          name: 'Shell design',
          img: product.shelldesignimg.url,
          value: product.shelldesign,
        },
        {
          name: 'Succulent',
          img: product.succulentimg[0].url,
          value: product.succulent,
        },
        {
          name: 'Medium',
          img: product.mediumimg.url,
          value: product.medium,
        },
        {
          name: 'Base',
          img: product.baseimg.url,
          value: product.base,
        },
      ]);
    }
  }, [product]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{}} aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>

              <TableCell component="th" scope="row">
                <img
                  src={row.img ? row.img : ''}
                  style={{ maxWidth: '10vw' }}
                />
              </TableCell>

              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
