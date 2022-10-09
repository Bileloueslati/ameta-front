import { FunctionComponent } from "react";
import { Stack, Typography, Box } from "@mui/material";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";

const RestrictedRoute: FunctionComponent = () => (
  <Stack justifyContent="center" alignItems="center" mt={12} spacing={1.5}>
    <Box>
      <HttpsOutlinedIcon sx={{ height: 50, width: 50 }} color="primary" />
    </Box>
    <Typography variant="h5" color="primary">
      You are not allowed to access this page
    </Typography>
  </Stack>
);

export default RestrictedRoute;
