import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Button } from "@mui/material";
import useLayout from "../../../hooks/useLayout";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect } from "react";

export default function NavExpander() {
  const { expandNav, navIsExpanded } = useLayout();

  const isSmall = useMediaQuery("(max-width:1024px)");

  useEffect(() => {
    if (isSmall) {
      expandNav(false);
    }
  }, []);

  const handleClick = () => {
    expandNav(!navIsExpanded);
  };

  return (
    <Button variant="text" onClick={handleClick}>
      <MenuOutlinedIcon />
    </Button>
  );
}
