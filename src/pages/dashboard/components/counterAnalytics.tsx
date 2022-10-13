import { Grid, Paper, Stack, Typography } from "@mui/material";
import { cloneElement, FunctionComponent, ReactElement } from "react";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import WithRoles from "../../../hoc/withRoles";
import ListIcon from "@mui/icons-material/List";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import FlagIcon from "@mui/icons-material/Flag";
import useSWR from "swr";

type Result = {
  [key in "users" | "compagnies" | "sheets" | "destinations"]: {
    msg: string;
    icon: ReactElement;
  };
};

type Req = {
  [key in keyof Result]: number;
};

const CounterAnalytics: FunctionComponent = () => {
  const { data } = useSWR<Req>("/metrics/count");

  const result: Result = {
    users: {
      msg: "Users subscribed",
      icon: <GroupOutlinedIcon />,
    },
    compagnies: {
      msg: "Compagnies added",
      icon: <MapsHomeWorkIcon />,
    },
    sheets: {
      msg: "Sheets registered",
      icon: <ListIcon />,
    },
    destinations: {
      msg: "Enabled Destinations",
      icon: <FlagIcon />,
    },
  };

  return (
    <Grid
      container
      spacing={{
        md: 3,
        xs: 1.5,
      }}
      sx={{ mb: 4 }}
    >
      {Object.entries(result).map(([key, { msg, icon }]) => (
        <Grid key={key} item md={3} xs={12}>
          <Paper sx={{ py: 2, px: 2 }}>
            <Stack
              justifyContent="center"
              alignItems="center"
              direction="row"
              spacing={2}
            >
              <Stack
                justifyContent="center"
                alignItems="center"
                sx={({ palette }) => ({
                  borderRadius: "50%",
                  background: palette.primary.main,
                  height: {
                    md: 55,
                    xs: 50,
                  },
                  width: {
                    md: 55,
                    xs: 50,
                  },
                  lineHeight: 60,
                  color: "#fff",
                  fontSize: {
                    md: 35,
                    xs: 30,
                  },
                })}
              >
                {cloneElement(icon, {
                  fontSize: "inherit",
                })}
              </Stack>
              <Stack>
                <Typography variant="h2" fontSize="2rem">
                  {data && data[key as keyof Req]}
                </Typography>
                <Typography>{msg}</Typography>
              </Stack>
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default WithRoles(CounterAnalytics, ["ROLE_SUPERADMIN"], false);
