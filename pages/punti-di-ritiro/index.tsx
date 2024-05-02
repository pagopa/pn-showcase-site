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

interface RaddOperator {
  denomination: string;
  region: string;
  city: string;
  address: string;
  contacts: string;
}

interface Point {
  descrizione: string;
  citta: string;
  via: string;
  Telefono: string;
}

const RitiroPage: NextPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [points, setPoints] = useState<Point[]>([]);
  useEffect(() => {
    const csvFilePath = "/static/documents/data-ritiro.csv";

    Papa.parse(csvFilePath, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        if (result.data && result.data.length > 0) {
          setPoints(result.data as Point[]);
        }
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
      },
    });
  }, []);

  const rows: RaddOperator[] = points.map((e) => ({
    denomination: e.descrizione,
    region: "N.D.",
    city: e.citta,
    address: e.via,
    contacts: e.Telefono,
  }));

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
          <Autocomplete
            sx={{ width: "100%", maxWidth: 736 }}
            disableClearable
            options={rows}
            getOptionLabel={(option: RaddOperator) =>
              `${option.city} - ${option.address}`
            }
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
            <OperatorsTable rows={rows.slice(0, rows.length - 1)} />
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
