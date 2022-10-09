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
    <>
      <Stack alignItems="end">
        <NewContainerModal />
      </Stack>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Sender</TableCell>
              <TableCell align="right">Consignee</TableCell>
              <TableCell align="right">Packaging</TableCell>
              <TableCell align="right">Volume (M3)</TableCell>
              <TableCell align="right">DelTerms</TableCell>
              <TableCell align="right">Weight</TableCell>
              <TableCell align="right">Delivery</TableCell>
              <TableCell align="right">Atvyl costs (€)</TableCell>
              <TableCell align="right">Atvyl incomes (€)</TableCell>
              <TableCell align="right">Lusocargo costs (€)</TableCell>
              <TableCell align="right">Lusocargo incomes (€)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sheetContainers.map(
              ({
                id,
                sender,
                consignee,
                packaging,
                volumem3,
                delTerms,
                weight,
                delivery,
                atvylIncomes,
                atvylCosts,
                lusocargoCosts,
                lusocargoIncomes,
              }) => (
                <TableRow
                  key={id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {sender}
                  </TableCell>
                  <TableCell align="right">{consignee}</TableCell>
                  <TableCell align="right">{packaging}</TableCell>
                  <TableCell align="right">{volumem3}</TableCell>
                  <TableCell align="right">{delTerms}</TableCell>
                  <TableCell align="right">{weight}</TableCell>
                  <TableCell align="right">{delTerms}</TableCell>
                  <TableCell align="right">{atvylCosts}</TableCell>
                  <TableCell align="right">{atvylIncomes}</TableCell>
                  <TableCell align="right">{lusocargoCosts}</TableCell>
                  <TableCell align="right">{lusocargoIncomes}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SheetContainers;
