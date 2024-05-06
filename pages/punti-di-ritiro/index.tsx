import type { NextPage } from "next";

import PageHead from "../../src/components/PageHead";
import {
  Autocomplete,
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

  // elenco punti di ritiro dal csv
  const [points, setPoints] = useState<Point[]>([]);
  // valore del campo di ricerca
  const [searchValue, setSearchValue] = useState("");
  // valore da passare a OperatorsTable
  const [valueToPass, setValueToPass] = useState<RaddOperator>();

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
  const rows: RaddOperator[] = points.map((e) => ({
    denomination: e.descrizione,
    city: e.città,
    address: e.via,
    province: e.provincia,
    cap: e.cap,
    contacts: e.telefono,
  }));

  function handleSelectChange(value: RaddOperator | null) {
    if (value) setValueToPass(value);
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
          id="operatorList"
        >
          <Autocomplete
            blurOnSelect
            sx={{
              width: "100%",
              maxWidth: 736,
            }}
            options={rows}
            getOptionLabel={(option: RaddOperator) =>
              `${option.city} (${option.province}) - ${option.address}`
            }
            inputValue={searchValue}
            onInputChange={(event, newValue) => setSearchValue(newValue)}
            onChange={(event, value) => handleSelectChange(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Cerca per città o indirizzo"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
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
          <Stack sx={{ maxWidth: 1092, width: "100%" }}>
            <OperatorsTable
              searchValue={valueToPass}
              rows={rows.slice(0, rows.length - 1)}
            />
          </Stack>
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
          <OperatorsList rows={rows.slice(0, rows.length - 1)} />
        </Box>
      )}

      <DarkInfoblockRitiro></DarkInfoblockRitiro>
    </>
  );
};

export default RitiroPage;
