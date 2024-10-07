import { Skeleton, Stack } from "@mui/material";

const Loading = () => {
  return (
    <Stack sx={{ background: 'white'}} position="absolute" zIndex={1000} height="100%" width="100%" direction="column">
      <Skeleton // Header
        sx={{ height: '20%', mb: 1 }}
        width="100%"
        animation="wave"
        variant="rounded"
      />
      <Skeleton // Main
        sx={{ height: '55%', mb: 1 }}
        width="100%"
        animation="wave"
        variant="rounded"
      />
      <Skeleton // Footer
        sx={{ height: '25%' }}
        width="100%"
        animation="wave"
        variant="rounded"
      />
    </Stack>
  );
};

export default Loading;
