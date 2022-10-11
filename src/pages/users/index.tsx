import useSWR from "swr";
import { User as UserT, Pagination } from "../../__typescript/api";
import { Card, CardContent, Box, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import * as dayjs from "dayjs";
import User from "./user";
import { useState, startTransition, Fragment } from "react";
import WithRoles from "../../hoc/withRoles";
import UserActivation from "./components/activation";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: "Created at",
    flex: 1,
  },
  {
    field: "fullName",
    headerName: "Full name",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
  {
    field: "compagnyName",
    headerName: "Company name",
    flex: 1,
  },

  {
    field: "user_activation",
    type: "actions",
    headerName: "Activation",
    flex: 1,
    renderCell: (params) => <UserActivation user={params.row} />,
  },

  {
    field: "actions",
    type: "actions",
    flex: 1,
    renderCell: (params) => <User user={params.row} />,
  },
];

type Offset = 25 | 50 | 75 | 100;

const Accounts = () => {
  const [page, setPage] = useState<number>(1);

  const [offset, setOffset] = useState<Offset>(25);

  const offsets: Offset[] = [25, 50, 75, 100];

  const handlePage = (page: number) => {
    startTransition(() => {
      setPage(page);
    });
  };

  const { data: users } = useSWR<Pagination<UserT>>(
    `/users?page=${page}&offset=${offset}`
  );

  if (!users) return null;

  return (
    <Fragment>
      <Stack direction="row" justifyContent="space-between" spacing={3} mb={3}>
        <Typography variant="h2">Users</Typography>
        <User />
      </Stack>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ width: "100%", height: 500 }}>
            <DataGrid
              paginationMode="server"
              rowsPerPageOptions={offsets}
              rowCount={users.totalItems}
              pageSize={users.itemCount}
              page={page - 1}
              onPageChange={(page) => {
                handlePage(page + 1);
              }}
              onPageSizeChange={(offset) => {
                setOffset(offset as Offset);
              }}
              rowHeight={50}
              density="standard"
              columns={columns}
              rows={users.items.map(
                ({
                  id,
                  firstName,
                  lastName,
                  createdAt,
                  email,
                  isActive,
                  compagny,
                }) => ({
                  id,
                  createdAt: dayjs(createdAt).format("DD/MM/YYYY"),
                  fullName: `${firstName} ${lastName}`,
                  firstName,
                  lastName,
                  email,
                  compagny,
                  isActive,
                  compagnyName: compagny.name,
                })
              )}
            ></DataGrid>
          </Box>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default WithRoles(Accounts, ["ROLE_ADMIN", "ROLE_SUPERADMIN"]);
