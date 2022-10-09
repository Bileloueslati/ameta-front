import { useParams } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import useSWR from "swr";
import { useState, SyntheticEvent } from "react";
import { Sheet as SheetT } from "../../__typescript/sheet";
import SheetContainers from "./components/containers";
import { SheetContextProvider } from "../../contexts/sheet";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function Sheet() {
  const { id } = useParams();

  const { data: sheet } = useSWR<SheetT>(`/sheets/${id}`);

  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (!sheet) return null;

  return (
    <SheetContextProvider sheet={sheet}>
      <Stack direction="row" justifyContent="space-between" spacing={3} mb={2}>
        <Typography variant="h2">Sheet</Typography>
        <Stack
          direction="row"
          spacing={2}
          component="ul"
          sx={{ listStyle: "none" }}
        >
          <Box component="li">
            <Typography>Sheet ID : {sheet.id}</Typography>
          </Box>
          <Box component="li">
            <Typography>ATVYL Ref : {sheet.atvylRef}</Typography>
          </Box>
          <Box component="li">
            <Typography>lusocargo Ref : 44458TF</Typography>
          </Box>
        </Stack>
      </Stack>

      <Card>
        <CardContent>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Containers" {...a11yProps(0)} />
                <Tab label="Atvyl general charges" {...a11yProps(1)} />
                <Tab label="Lusocargo general charges" {...a11yProps(2)} />
                <Tab label="Total" {...a11yProps(2)} />
                <Tab label="History logs" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <SheetContainers />
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel>
          </Box>
        </CardContent>
      </Card>
    </SheetContextProvider>
  );
}
