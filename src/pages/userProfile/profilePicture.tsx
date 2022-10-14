import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { Box, IconButton, Alert, Stack } from "@mui/material";
import Image from "../../components/img";
import { grey } from "@mui/material/colors";
import CreateIcon from "@mui/icons-material/Create";

type Props = {
  onChange: (e: any) => void;
  onBlur?: (e: any) => void;
};

type Error = {
  type: string;
  msg: string;
} | null;

const ProfilePicture: FC<Props> = ({ onChange, onBlur }) => {
  const ref = useRef<HTMLInputElement>(null);

  const [picture, setPicture] = useState<null | string>(null);

  const [file, setFile] = useState<File | null>(null);

  const maxSize = 1;

  const [error, setError] = useState<Error>(null);

  const handleClick = () => {
    ref.current && ref.current.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      const MbSize = file.size / 1024 / 1024;

      if (MbSize > maxSize) {
        setError({
          type: "size",
          msg: `File size exceeds maximum limit ${maxSize} MB`,
        });

        return;
      }

      if (file.type.includes("image")) {
        setError(null);
        setFile(file);
        onChange(file);
      }
    }
  };

  useEffect(() => {
    let isCancel = false;

    let fileReader: FileReader | boolean = false;

    if (file) {
      fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader instanceof FileReader && !isCancel) {
          setPicture(fileReader.result as string);
        }
      };
      fileReader.readAsDataURL(file);
    }

    return () => {
      isCancel = true;
      if (fileReader instanceof FileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  return (
    <Stack spacing={2} alignItems="flex-start">
      <Box
        onClick={handleClick}
        sx={({ palette }) => ({
          height: 170,
          width: 170,
          borderRadius: "50%",
          border: `1px dashed ${!!error ? palette.error.main : grey[700]}`,
          position: "relative",
          cursor: "pointer",
        })}
      >
        <Image
          src={picture || "/img/avatar-dark.png"}
          sx={{
            width: "100%",
            height: "100%",
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            p: 0.5,
            objectFit: "cover",
          }}
        />

        <IconButton sx={{ position: "absolute", top: 5, right: 30 }}>
          <CreateIcon fontSize="small" color="primary" />
        </IconButton>

        <Box
          component="input"
          type="file"
          accept="image/*"
          sx={{ visibility: "hidden" }}
          onChange={handleChange}
          onBlur={onBlur}
          ref={ref}
          hidden
        />
      </Box>
      {!!error && <Alert severity="error">{error.msg}</Alert>}
    </Stack>
  );
};

export default ProfilePicture;
