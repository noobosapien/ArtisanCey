import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function InfoTable({ product }) {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    if (product.additionalInfo instanceof Array) {
      setRows([...product.additionalInfo]);
    } else {
      setRows([]);
    }
    console.log(product.additionalInfo);
  }, [product]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{}} aria-label="simple table">
        <TableBody>
          <TableRow
            key="prod width"
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Width
            </TableCell>
            <TableCell align="right">{product.width} cm</TableCell>
          </TableRow>
          <TableRow
            key="prod height"
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              Height
            </TableCell>
            <TableCell align="right">{product.height} cm</TableCell>
          </TableRow>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
