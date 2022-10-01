import Menu from "@mui/material/Menu";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { Fragment, useRef } from "react";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Person4OutlinedIcon from "@mui/icons-material/Person4Outlined";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { PopupState as PopupStateT } from "material-ui-popup-state/core";

export default function UserDropDown() {
  const { logout, firstName } = useAuth();

  const navigate = useNavigate();

  const ref = useRef<PopupStateT | null>(null);

  const redirect = (path: string) => {
    ref.current!.close();
    navigate(path);
  };

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => {
        ref.current = popupState;
        return (
          <Fragment>
            <Button
              variant="text"
              color="secondary"
              {...bindTrigger(popupState)}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar alt="" src="/img/avatar.jfif" />
                <Typography>Hi, {firstName}</Typography>
              </Stack>
            </Button>
            <Menu {...bindMenu(popupState)}>
              <MenuItem
                onClick={() => {
                  redirect("profile");
                }}
              >
                <Person4OutlinedIcon />
                <Typography>My account</Typography>
              </MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </Fragment>
        );
      }}
    </PopupState>
  );
}
