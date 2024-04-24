import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Pagination,
  TablePagination,
  PaginationItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function OperatorsTable({ rows }) {
  const keys = ["Denominazione", "Regione", "Città", "Indirizzo", "Contatti"];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    _event: any,
    page: React.SetStateAction<number>
  ) => {
    page = page - 1;
    setPage(page);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%", maxWidth: 1092 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#FAFAFA" }}>
              {keys.map((name: string) => (
                <TableCell key={name}>{name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index: number) => (
                <TableRow
                  key={`${row.denomination}-${index}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.denomination}
                  </TableCell>
                  <TableCell>{row.region}</TableCell>
                  <TableCell>{row.city}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.contacts}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={3}>
        <Pagination
          count={Math.ceil(rows.length / rowsPerPage)}
          color="primary"
          onChange={handleChangePage}
          renderItem={(item) => (
            <PaginationItem
              slots={{
                previous: ArrowBackIcon,
                next: ArrowForwardIcon,
                first: ArrowBackIcon,
              }}
              {...item}
            />
          )}
        />
      </Box>
      <TablePagination
        color="primary"
        page={page}
        rowsPerPageOptions={[10, 20, 50]}
        count={rows.length}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default OperatorsTable;
