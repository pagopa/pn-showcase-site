import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Pagination,
  TablePagination,
  Stack,
  TableSortLabel,
} from "@mui/material";

function OperatorsTable({ rows }) {
  const keys = ["denomination", "region", "city", "address", "contacts"];
  const columnNames = {
    denomination: "Denominazione",
    region: "Regione",
    city: "Città",
    address: "Indirizzo",
    contacts: "Contatti",
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // stato per gestire ordinamento in base ad una chiave e se è ascendente o discendente
  const [orderBy, setOrderBy] = React.useState("");
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");

  const handleChangePage = (_event: any, page: number | null) => {
    if (page !== null) {
      setPage(page - 1);
    }
  };

  const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // funzione di gestione del cambio di ordinamento
  const handleRequestSort = (property: string) => {
    // se orderBy è uguale a property, quindi è già ordinata in base a property, bisogna cambiare direzione ordinamento in discendente
    // se orderBy NON è uguale a property, quindi NON è già ordinata in base a property, bisogna ordinare in direzione ascendente (default)
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedRows = stableSort(rows, getComparator(order, orderBy));

  function stableSort(array: any[], comparator: (a: any, b: any) => number) {
    const stabilizedThis = array.map(
      (el, index) => [el, index] as [any, number]
    );
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order: "asc" | "desc", orderBy: string) {
    return order === "desc"
      ? (a: any, b: any) => descendingComparator(a, b, orderBy)
      : (a: any, b: any) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a: any, b: any, orderBy: string) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%", maxWidth: 1092 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#FAFAFA" }}>
              {keys.map((key) => (
                <TableCell key={key}>
                  <TableSortLabel
                    active={orderBy === key}
                    direction={orderBy === key ? order : "asc"}
                    onClick={() => handleRequestSort(key)}
                  >
                    {columnNames[key]}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows
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
      <Stack
        mt={3}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <TablePagination
          id="ritiroPagination"
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 20, 30]} // Rimuovi le opzioni per il selettore delle righe per pagina
        />
        <Pagination
          variant="outlined"
          color="primary"
          count={Math.ceil(rows.length / rowsPerPage)}
          onChange={handleChangePage}
          boundaryCount={1}
          siblingCount={1}
          hidePrevButton
          hideNextButton
        />
      </Stack>
    </>
  );
}

export default OperatorsTable;
