import { Box, List, ListItem, Paper, Skeleton, Stack } from "@mui/material";

const SKELETON_LENGTH = 5;

const Skeletons: React.FC = () => (
  <List sx={{ mt: 2 }}>
    {Array.from({ length: SKELETON_LENGTH }).map((_, index) => (
      <ListItem
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "8px",
          my: 2,
          p: 0,
        }}
        key={`skeleton-${index}`}
      >
        <Stack
          component={Paper}
          width="100%"
          sx={{ p: 3, borderRadius: "8px" }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Box mb={1} flex={1}>
              <Skeleton variant="text" width="60%" height="24px" />
              <Skeleton variant="text" width="80%" height="21px" />
            </Box>

            <Skeleton variant="text" width={40} height="24px" />
          </Box>

          <Skeleton variant="text" width="20%" height="21px" />
        </Stack>
      </ListItem>
    ))}
  </List>
);

export default Skeletons;
