import { FunctionComponent } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

const FullPageLoader: FunctionComponent = () => {
  return (
    <Stack justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
      <CircularProgress />
    </Stack>
  );
};

export default FullPageLoader;
