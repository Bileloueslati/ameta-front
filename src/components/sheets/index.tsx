import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridToolbarExport } from "@mui/x-data-grid";
import { Card, CardContent, Typography, Stack } from "@mui/material";
import useSWR from "swr";
import { Sheet } from "../../__typescript/sheet";
import Actions from "./actions";
import * as dayjs from "dayjs";
import NewSheet from "./newSheet";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
  },
  {
    field: "updatedAt",
    headerName: "Last update on",
    flex: 1,
  },
  {
    field: "atvylRef",
    headerName: "Atvyl Reference",
    flex: 1,
  },
  {
    field: "shipementDate",
    headerName: "Date of shipement",
    flex: 1,
  },
  {
    field: "from",
    headerName: "From",
    flex: 1,
  },
  {
    field: "to",
    headerName: "To",
    flex: 1,
  },
  {
    field: "way",
    headerName: "Way",
    width: 80,
  },
  {
    field: "plate",
    headerName: "Plate",
    flex: 1,
  },
  {
    field: "creator",
    headerName: "Creator",
    flex: 1,
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    renderCell: (params) => <Actions params={params} />,
  },
];

export default function Sheets() {
  const { data: sheets } = useSWR<Sheet[]>("/sheets");

  if (!sheets) return null;

  return (
    <>
      <Stack direction="row" justifyContent="space-between" spacing={3} mb={2}>
        <Typography variant="h2">
          Sheets
        </Typography>

        <Box>
          <NewSheet />
        </Box>
      </Stack>

      <Card>
        <CardContent>
          <Box sx={{ width: "100%", height: 500 }}>
            <DataGrid
              sx={{
                "& .MuiDataGrid-cellContent": {
                  fontSize: 15,
                },
              }}
              rowHeight={50}
              density="standard"
              components={{ Toolbar: GridToolbarExport }}
              rows={sheets.map(
                ({
                  id,
                  atvylRef,
                  from,
                  to,
                  shipementDate,
                  way,
                  plate,
                  user,
                  updatedAt,
                }) => ({
                  id,
                  atvylRef,
                  way,
                  plate,
                  updatedAt: dayjs(updatedAt).format("DD/MM/YYYY"),
                  shipementDate: dayjs(shipementDate).format("DD/MM/YYYY"),
                  from,
                  to,
                  creator: `${user.firstName} ${user.lastName}`,
                })
              )}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
            />
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
