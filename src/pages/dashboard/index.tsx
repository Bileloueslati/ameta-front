import { Stack, Typography } from "@mui/material";
import Sheets from "../../components/sheets";
import CounterAnalytics from "./components/counterAnalytics";

export default function Dashboard() {
  return (
    <Stack>
      <CounterAnalytics />
      <Sheets />
    </Stack>
  );
}
