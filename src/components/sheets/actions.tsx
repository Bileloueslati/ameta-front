import { Button } from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { Sheet } from "../../__typescript/sheet";
import { useNavigate } from "react-router-dom";

type Props = {
  params: {
    row: Sheet;
  };
};

const View = ({ sheet: { id } }: { sheet: Sheet }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/sheets/${id}`);
  };

  return (
    <Button onClick={handleClick} startIcon={<RemoveRedEyeOutlinedIcon />} />
  );
};

export default function Actions({ params: { row } }: Props) {
  return <View sheet={row} />;
}
