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
import { RaddOperator } from "../../model";
import { useEffect, useRef, useState } from "react";
import CustomPagination from "../CustomPagination";

type Props = {
  rows: RaddOperator[];
};

function OperatorsList({ rows }: Readonly<Props>) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const listContainerRef = useRef<HTMLUListElement | null>(null);

  const handleChangePage = (_event: any, newPage: number | null) => {
    if (newPage !== null) {
      setPage(newPage - 1);
    }
  };

  const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  const pagination = {
    size: rowsPerPage,
    totalElements: rows.length,
    numOfDisplayedPages: Math.min(Math.ceil(rows.length / rowsPerPage), 3),
    currentPage: page,
  };
  useEffect(() => {
    if (listContainerRef.current) {
      listContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [page, rowsPerPage]);

  return (
    <Stack>
      <List ref={listContainerRef}>
        {rows
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
                  <Typography variant="subtitle1">
                    {row.city} ({row.province})
                  </Typography>
                </Box>
                <Box mb={1}>
                  <Typography variant="body2">Indirizzo</Typography>
                  <Typography variant="subtitle1">
                    {row.address} - {row.cap}
                  </Typography>
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
        px={1}
        mt={1}
        direction="row"
      >
        <TablePagination
          id="ritiroPagination"
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 20, 50]}
        />
        <CustomPagination pagination={pagination} onChange={handleChangePage} />
      </Stack>
    </Stack>
  );
}

export default OperatorsList;
