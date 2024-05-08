import * as React from "react";

import {
  ListItem,
  Typography,
  List,
  Stack,
  Paper,
  Box,
  TablePagination,
  Pagination,
} from "@mui/material";
import { RaddOperator } from "model";
import { useEffect, useState } from "react";

type Props = {
  allRows: RaddOperator[];
  searchValue: RaddOperator | undefined;
};

function OperatorsList({ allRows, searchValue }: Readonly<Props>) {
  const [filteredRows, setFilteredRows] = useState<RaddOperator[]>(allRows);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (_event: any, page: number | null) => {
    if (page !== null) {
      setPage(page - 1);
    }
  };

  const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (!searchValue) {
      setFilteredRows(allRows);
    } else {
      setFilteredRows(allRows.filter((row) => row.city === searchValue.city));
    }
  }, [searchValue]);

  return (
    <Stack>
      <List>
        {filteredRows
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, index: number) => (
            <ListItem
              key={`${row.denomination}-${index}`}
              sx={{
                paddingBottom: 0,
                paddingTop: 0,
              }}
            >
              <Stack
                component={Paper}
                p={3}
                width="100%"
                sx={{ borderBottom: "solid 1px #E3E7EB" }}
              >
                <Box mb={1}>
                  <Typography variant="body2">Denominazione</Typography>
                  <Typography variant="subtitle1">
                    {row.denomination}
                  </Typography>
                </Box>
                <Box mb={1}>
                  <Typography variant="body2">Città</Typography>
                  <Typography variant="subtitle1">{row.city}</Typography>
                </Box>
                <Box mb={1}>
                  <Typography variant="body2">Indirizzo</Typography>
                  <Typography variant="subtitle1">{row.address}</Typography>
                </Box>
                <Box mb={1}>
                  <Typography variant="body2">Telefono</Typography>
                  <Typography variant="subtitle1">{row.contacts}</Typography>
                </Box>
              </Stack>
            </ListItem>
          ))}
      </List>
      <Stack
        alignItems="center"
        justifyContent="space-between"
        px={3}
        mt={1}
        direction="row"
      >
        <TablePagination
          id="ritiroPagination"
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 20, 30]}
        />
        <Pagination
          id="ritiroPagination_page_mobile"
          sx={{ width: 170 }}
          color="primary"
          count={Math.ceil(filteredRows.length / rowsPerPage)}
          onChange={handleChangePage}
          boundaryCount={1}
          siblingCount={1}
          hidePrevButton
          hideNextButton
        />
      </Stack>
    </Stack>
  );
}

export default OperatorsList;
