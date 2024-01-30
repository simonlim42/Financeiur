import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Metrics = ({ period, value }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%">
      <Box display="flex" justifyContent="space-between" padding="10px" marginTop="5px">
        <Box>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: colors.grey[200] }}
          >
            {period}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="h5"
            fontStyle="italic"
            sx={{ color: colors.greenAccent[500] }}
          >
            {value}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Metrics;
