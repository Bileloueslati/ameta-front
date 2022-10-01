import { FunctionComponent } from "react";
import { useSheetContext } from "../../../../../contexts/sheet";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import NewContainerModal from "./newContainer";

const SheetContainers: FunctionComponent = () => {
  const { sheetContainers } = useSheetContext();

  return (
    <Stack>
      <NewContainerModal />
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sender</TableCell>
              <TableCell align="right">consignee</TableCell>
              <TableCell align="right">packaging</TableCell>
              <TableCell align="right">volumem3</TableCell>
              <TableCell align="right">delTerms</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sheetContainers.map(
              ({ id, consignee, packaging, volumem3, delTerms }) => (
                <TableRow
                  key={id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {consignee}
                  </TableCell>
                  <TableCell align="right">{packaging}</TableCell>
                  <TableCell align="right">{volumem3}</TableCell>
                  <TableCell align="right">{delTerms}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default SheetContainers;
