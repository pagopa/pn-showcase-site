import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
interface Data {
  denomination: string;
  region: string;
  city: string;
  address: string;
  contacts: string;
}

export default function BasicTable({ parsedData }) {
  function createData(
    denomination: string,
    region: string,
    city: string,
    address: string,
    contacts: string
  ) {
    return { denomination, region, city, address, contacts };
  }

  let rows: Data[] = [];
  parsedData.map(
    (e: {
      descrizione: string;
      citta: string;
      via: string;
      Telefono: string;
    }) => {
      rows.push(createData(e.descrizione, "N.D.", e.citta, e.via, e.Telefono));
    }
  );
  const keys = ["Denominazione", "Regione", "Città", "Indirizzo", "Contatti"];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "100%", maxWidth: 1092 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {keys.map((name: string) => (
              <TableCell>{name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.denomination}
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
