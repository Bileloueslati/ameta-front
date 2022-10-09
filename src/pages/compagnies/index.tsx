import useSWR from "swr";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Card,
  CardContent,
  Box,
  Stack,
  Avatar,
  Typography,
} from "@mui/material";
import * as dayjs from "dayjs";
import Compagny from "./components/company";
import { Fragment } from "react";
import { Pagination, Compagny as CompagnyT } from "../../__typescript/api";
import { FILE_PATH } from "../../consts/common";
import { HttpError } from "../../libs/axios/http";
import WithRoles from "../../hoc/withRoles";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
  },
  {
    field: "logo",
    headerName: "Logo",
    flex: 1,
    renderCell: (params) => {
      return (
        <Avatar
          variant="square"
          {...(params.value && {
            src: `${FILE_PATH}${params.value}`,
          })}
        />
      );
    },
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: "Created at",
    flex: 1,
  },
  {
    field: "updatedAt",
    headerName: "Updated at",
    flex: 1,
  },
  {
    field: "userCount",
    headerName: "Number of users",
    flex: 1,
  },
  {
    field: "country",
    headerName: "Country",
    flex: 1,
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    flex: 2,
    renderCell: (params) => <Compagny compagny={params.row} />,
  },
];

const Compagnies = () => {
  const { data: compagnies } = useSWR<Pagination<CompagnyT>, HttpError>(
    "/compagnies"
  );

  if (!compagnies) return null;

  return (
    <Fragment>
      <Stack direction="row" justifyContent="space-between" spacing={3} mb={3}>
        <Typography variant="h2">Companies</Typography>
        <Compagny />
      </Stack>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ width: "100%", height: 500 }}>
            <DataGrid
              rowHeight={50}
              density="standard"
              columns={columns}
              rows={compagnies.items.map(
                ({
                  id,
                  name,
                  createdAt,
                  updatedAt,
                  userCount,
                  logo,
                  country,
                }) => ({
                  id,
                  country,
                  name,
                  logo,
                  userCount:
                    userCount === 0
                      ? "No users"
                      : `${userCount} user${userCount > 1 ? "s" : ""}`,
                  createdAt: dayjs(createdAt).format("DD/MM/YYYY"),
                  updatedAt: dayjs(updatedAt).format("DD/MM/YYYY"),
                })
              )}
            />
          </Box>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default WithRoles(Compagnies, ["ROLE_SUPERADMIN"]);
