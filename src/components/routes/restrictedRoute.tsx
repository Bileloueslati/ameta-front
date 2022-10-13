import { FunctionComponent } from "react";
import { Stack, Typography, Box } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const RestrictedRoute: FunctionComponent = () => (
  <Stack justifyContent="center" alignItems="center" mt={12} spacing={1.5}>
    <Box>
      <SentimentVeryDissatisfiedIcon
        sx={{ height: 50, width: 50 }}
        color="primary"
      />
    </Box>
    <Typography variant="h2" fontSize="1.6rem" color="primary">
      You are not allowed to access this page
    </Typography>
  </Stack>
);

export default RestrictedRoute;
