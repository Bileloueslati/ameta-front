import {
  FunctionComponent,
  ChangeEvent,
  useState,
  startTransition,
} from "react";
import { User } from "../../../__typescript/api";
import Switch from "@mui/material/Switch";
import { http } from "../../../libs/axios/http";

type Props = {
  user: User;
};

const UserActivation: FunctionComponent<Props> = ({ user }) => {
  const { id, isActive } = user;

  const [checked, setChecked] = useState<boolean>(isActive);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      const isActive = event.target.checked;
      setChecked(isActive);
      http.put(`/users/${id}`, {
        isActive,
      });
    });
  };

  return (
    <Switch
      color={checked ? "success" : "error"}
      onChange={handleChange}
      checked={checked}
    />
  );
};

export default UserActivation;
