import { Box, CircularProgress } from "@mui/material";

export default function LoadingBox({ size = 48, mt = 12 }) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={mt}>
      <CircularProgress size={size} />
    </Box>
  );
}
