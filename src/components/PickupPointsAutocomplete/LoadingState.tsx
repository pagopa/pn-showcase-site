import { Place } from "@mui/icons-material";
import { Skeleton, Stack } from "@mui/material";

const SKELETON_LENGTH = 3;

const LoadingState: React.FC = () => (
  <Stack direction="column" spacing={1} width="100%" sx={{ py: 1, px: 2 }}>
    {Array.from({ length: SKELETON_LENGTH }).map((_, index) => (
      <Stack key={`place-${index}`}>
        <Stack direction="row" display="flex" alignItems="center" spacing={1}>
          <Place sx={{ color: "text.secondary", fontSize: "16px" }} />
          <Skeleton variant="text" width="40%" height="24px" />
        </Stack>
        <Skeleton variant="text" width="50%" height="24px" sx={{ ml: 3 }} />
      </Stack>
    ))}
  </Stack>
);

export default LoadingState;
