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
import CloseIcon from "@mui/icons-material/Close";
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
  const [filteredOperators, setFilteredOperators] = useState<RaddOperator[]>(
    []
  );
  const [isSearchFailed, setIsSearchFailed] = useState<boolean>(false);

  let hasData = false;
  useEffect(() => {
    if (!hasData) {
      hasData = true;

      /* 
        Storelocator file is saved on showcase-site bucket s3 at /static/documents/radd-stores-registry.csv,
        however this file is not accessible by localhost.
        To test in local environment you need to download file http://www.dev.notifichedigitali.it/public/static/documents/radd-stores-registry.csv and save at the same path. The file is already referred in .gitignore.
        ---------------------------------------------------
        Sarah Donvito, 31/05/2024
        ---------------------------------------------------
      */
      const csvFilePath = "/static/documents/radd-stores-registry.csv";
      Papa.parse(csvFilePath, {
        download: true,
        header: true,
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
    contacts: e.telefono,
  }));

  const handleInputChange = (event: any) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    const operators = initialRaddOperators.filter(
      (operator) =>
        operator.city.toLowerCase().replace(/[^a-zA-Z]/g, "") ===
        searchValue.toLowerCase().replace(/[^a-zA-Z]/g, "")
    );

    if (searchValue && operators.length > 0) {
      setFilteredOperators(operators);
    } else if (searchValue && operators.length === 0) {
      setIsSearchFailed(true);
      setFilteredOperators([]);
    } else {
      setFilteredOperators(initialRaddOperators);
    }
  };

  const handleCleanField = () => {
    setSearchValue("");
    setFilteredOperators(initialRaddOperators);
  };

  let rowsToSet: RaddOperator[] | null = null;

  if (filteredOperators.length > 0) {
    rowsToSet = filteredOperators;
  } else if (filteredOperators.length === 0 && isSearchFailed) {
    rowsToSet = [];
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
            color="textPrimary"
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
            value={searchValue}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchClick();
              }
            }}
            onChange={handleInputChange}
            sx={{ maxWidth: 498, width: "100%" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ paddingRight: 0 }}>
                  {searchValue && (
                    <IconButton>
                      <CloseIcon onClick={handleCleanField} />
                    </IconButton>
                  )}
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
      {isMobile ? (
        <Box
          py={3}
          sx={{
            backgroundColor: "#EEEEEE",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {rowsToSet.length > 0 ? (
            <OperatorsList
              key={JSON.stringify(initialRaddOperators)}
              rows={rowsToSet}
            />
          ) : (
            <Stack sx={{ maxWidth: 1092, width: "100%" }}>
              <Box bgcolor="white" p={3} m={3} textAlign="center">
                <Typography>
                  Non ci sono ancora punti di ritiro SEND attivi in questa
                  città.
                </Typography>
              </Box>
            </Stack>
          )}
        </Box>
      ) : (
        <Box
          minHeight={823}
          sx={{
            backgroundColor: "#FAFAFA",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
          padding={5}
        >
          {rowsToSet.length > 0 ? (
            <Stack sx={{ maxWidth: 1092, width: "100%" }}>
              <OperatorsTable
                key={JSON.stringify(filteredOperators)}
                rows={rowsToSet}
              />
            </Stack>
          ) : (
            <Stack my={5} sx={{ maxWidth: 1092, width: "100%" }}>
              <Box
                bgcolor="white"
                height={56}
                width={1092}
                sx={{
                  margin: "auto",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <Typography>
                  Non ci sono ancora punti di ritiro SEND attivi in questa
                  città.
                </Typography>
              </Box>
            </Stack>
          )}
        </Box>
      )}

      <DarkInfoblockRitiro></DarkInfoblockRitiro>
    </>
  );
};

export default RitiroPage;
