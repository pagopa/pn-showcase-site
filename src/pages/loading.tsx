import { Skeleton, Stack } from "@mui/material";

const Loading = () => {
  return (
    <Stack sx={{ background: 'white'}} position="absolute" zIndex={1000} height="100%" width="100%" direction="column">
      <Skeleton // Header
        sx={{ height: '20%', mb: 3, backgroundColor: "background.default", zIndex: 1000 }}
        width="100%"
        animation="wave"
        variant="rounded"
      />
      <Skeleton // Main
        sx={{ height: '50%', mb: 3, backgroundColor: "background.default", zIndex: 1000 }}
        width="100%"
        animation="wave"
        variant="rounded"
      />
      <Skeleton // Footer
        sx={{ height: '25%', backgroundColor: "background.default", zIndex: 1000 }}
        width="100%"
        animation="wave"
        variant="rounded"
      />
    </Stack>
  );
};

export default Loading;
