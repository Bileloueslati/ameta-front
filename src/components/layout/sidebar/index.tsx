import { Stack } from "@mui/material";
import useLayout from "../../../hooks/useLayout";
import Nav from "./nav";

export default function Aside() {
  const { navIsExpanded } = useLayout();

  return (
    <Stack
      component="aside"
      sx={{
        position: "fixed",
        width: navIsExpanded ? "265px" : 0,
        zIndex: 1200,
        top: 0,
        left: 0,
        py: 1.5,
        px: 2,
        height: "100%",
        backgroundColor: "#fff",
        boxShadow: "rgb(113 122 131 / 11%) 0px 7px 30px 0px",
        transition: "transform 0.3s linear",
        transform: navIsExpanded ? "translateX(0)" : "translateX(-100%)",
        ...(!navIsExpanded && { opacity: 0 }),
      }}
    >
      <img src="/img/dark-logo.png" alt="" />

      <Nav />
    </Stack>
  );
}
