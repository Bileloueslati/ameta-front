import Badge from "@mui/material/Badge";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

export default function Notifications() {
  return (
    <Badge badgeContent={4} color="primary">
      <NotificationsNoneOutlinedIcon color="action" />
    </Badge>
  );
}
