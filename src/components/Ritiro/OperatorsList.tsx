import * as React from "react";

import { ListItem, Typography, List, Stack, Paper, Box } from "@mui/material";

function OperatorsList({ rows }) {
  return (
    <List>
      {rows.map((row, index: number) => (
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
            <Box mb={3}>
              <Typography variant="body2">Denominazione</Typography>
              <Typography variant="body1">{row.denomination}</Typography>
            </Box>
            <Box mb={3}>
              <Typography variant="body2">Città</Typography>
              <Typography variant="body1">{row.city}</Typography>
            </Box>
            <Box mb={3}>
              <Typography variant="body2">Indirizzo</Typography>
              <Typography variant="body1">{row.address}</Typography>
            </Box>
            <Box mb={3}>
              <Typography variant="body2">Telefono</Typography>
              <Typography variant="body1">{row.contacts}</Typography>
            </Box>
          </Stack>
        </ListItem>
      ))}
    </List>
  );
}

export default OperatorsList;
