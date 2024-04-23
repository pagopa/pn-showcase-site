import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function OperatorsTable({ rows }) {
  const keys = ["Denominazione", "Regione", "Città", "Indirizzo", "Contatti"];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "100%", maxWidth: 1092 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#FAFAFA" }}>
            {keys.map((name: string) => (
              <TableCell>{name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index: number) => (
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
  );
}

export default OperatorsTable;
