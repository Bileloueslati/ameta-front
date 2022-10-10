import { FunctionComponent } from "react";
import { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import useThemeMode from "../../hooks/useThemeMode";

type Props = {
  sx: SxProps;
};

const Logo: FunctionComponent<Props> = (props) => {
  const { mode } = useThemeMode();

  return (
    <Box
      component="img"
      src={`/img/${mode == "dark" ? "light" : "dark"}-logo.png`}
      {...props}
    />
  );
};

export default Logo;
