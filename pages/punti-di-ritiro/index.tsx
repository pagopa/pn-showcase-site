import type { NextPage } from "next";

import PageHead from "../../src/components/PageHead";
import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Papa from "papaparse";
import OperatorsTable from "src/components/Ritiro/OperatorsTable";
import { DarkInfoblockRitiro } from "api/data/it/common";
import OperatorsList from "src/components/Ritiro/OperatorsList";
import { useEffect, useState } from "react";
import { Point, RaddOperator } from "model";

const RitiroPage: NextPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [points, setPoints] = useState<Point[]>([]);
  const [searchValue, setSearchValue] = useState("");

  // valori filtrati
  const [filteredOperators, setFilteredOperators] = useState<RaddOperator[]>(
    []
  );

  // check la ricerca ha restituito valori
  const [isSearchFailed, setIsSearchFailed] = useState<boolean>(false);

  let hasData = false;
  useEffect(() => {
    if (!hasData) {
      hasData = true;
      const csvFilePath = "/static/documents/data-ritiro.csv";

      Papa.parse(csvFilePath, {
        download: true,
        header: true,
        dynamicTyping: false,
        complete: (result) => {
          if (result.data && result.data.length > 0) {
            setPoints(result.data as Point[]);
          }
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        },
      });
    }
  }, []);

  const initialRaddOperators: RaddOperator[] = points.map((e) => ({
    denomination: e.descrizione,
    city: e.città,
    address: e.via,
    province: e.provincia,
    cap: e.cap,
    contacts: e.telefono.replace("/", " "),
  }));

  const handleInputChange = (event: any) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    if (initialRaddOperators.length > 0 && searchValue) {
      const operators = initialRaddOperators.filter(
        (operator) => operator.city.toLowerCase() === searchValue
      );
      if (operators.length > 0) {
        setFilteredOperators(operators);
      } else {
        setIsSearchFailed(true);
        setFilteredOperators([]);
      }
    }
  };

  let rowsToSet: RaddOperator[] | null = null;

  if (filteredOperators.length > 0) {
    rowsToSet = filteredOperators;
  } else if (filteredOperators.length === 0 && isSearchFailed) {
    rowsToSet = null;
  } else {
    rowsToSet = initialRaddOperators;
  }

  return (
    <>
      <PageHead
        title="SEND - Punti di ritiro"
        description="Quando ricevi una comunicazione a valore legale tramite SEND puoi ritirare una copia stampata dei documenti notificati presso gli esercenti convenzionati. 
        Cerca i punti di ritiro più vicini a te."
      />
      <Box mt={10} mx={3}>
        <Typography align="center" variant="h2">
          Trova un punto di ritiro SEND
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          spacing={0}
          justifyContent="center"
        >
          <Typography
            mt={3}
            color="textSecondary"
            variant="body2"
            sx={{ maxWidth: 554 }}
            textAlign="center"
          >
            Quando ricevi una comunicazione a valore legale tramite SEND puoi
            ritirare una copia stampata dei documenti notificati presso gli{" "}
            <strong>esercenti convenzionati</strong>. <br />
            Cerca i punti di ritiro più vicini a te.
          </Typography>
        </Stack>
        <Stack
          mt={4}
          mb={6}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <TextField
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchClick();
              }
            }}
            helperText={isSearchFailed ?? "La ricerca non ha prodotto valori"}
            onChange={handleInputChange}
            sx={{ maxWidth: 498, width: "100%" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearchClick}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label="Cerca per città"
          />
        </Stack>
      </Box>
      {!isMobile && (
        <Box
          sx={{
            backgroundColor: "#FAFAFA",
            display: "flex",
            justifyContent: "center",
          }}
          padding={5}
        >
          {rowsToSet && (
            <Stack sx={{ maxWidth: 1092, width: "100%" }}>
              <OperatorsTable
                key={JSON.stringify(filteredOperators)}
                rows={rowsToSet}
              />
            </Stack>
          )}
          {!rowsToSet && (
            <Typography textAlign="center">Non sono presenti valori</Typography>
          )}
        </Box>
      )}
      {isMobile && (
        <Box
          py={3}
          sx={{
            backgroundColor: "#EEEEEE",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {rowsToSet && (
            <OperatorsList
              key={JSON.stringify(initialRaddOperators)}
              rows={rowsToSet}
            />
          )}
          {!rowsToSet && (
            <Typography textAlign="center">Non sono presenti valori</Typography>
          )}
        </Box>
      )}

      <DarkInfoblockRitiro></DarkInfoblockRitiro>
    </>
  );
};

export default RitiroPage;
