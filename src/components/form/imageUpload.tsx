import { Box, Stack, IconButton, Typography, Grid } from "@mui/material";
import { ChangeEvent, forwardRef, useState, InputHTMLAttributes } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";

type Props = Partial<InputHTMLAttributes<HTMLInputElement>> & {
  maxItems?: number;
  defaultImages?: string[];
  label?: string;
  onChange: (arg: any) => void;
};

const ImageUpload = forwardRef<HTMLInputElement, Props>(
  ({ label, maxItems = 1, defaultImages = [], onChange, ...rest }, ref) => {
    const [images, setImages] = useState<string[]>(defaultImages);

    const noImages = images.length === 0;

    const addImage = (image: string) => {
      setImages([...images, image]);
    };

    const removeImage = (imageToRemove: string) => {
      setImages((images) => images.filter((image) => image !== imageToRemove));
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (!files || !files.length) return;

      if (typeof onChange === "function") {
        onChange(maxItems > 1 ? files : files[0]);
      }

      const fileReader = new FileReader();

      fileReader.onload = () => {
        addImage(fileReader.result as string);
      };

      fileReader.readAsDataURL(files[0]);
    };

    return (
      <Stack
        justifyContent="center"
        sx={{
          border: "1px dashed rgba(0, 0, 0, 0.23)",
          py: 5,
        }}
      >
        <IconButton
          color="primary"
          component="label"
          sx={{
            flexDirection: "column",
          }}
        >
          <Box
            component="input"
            type="file"
            accept="image/*"
            sx={{ visibility: "hidden" }}
            ref={ref}
            onChange={handleChange}
            disabled={images.length == maxItems}
            {...rest}
            hidden
          />
          {noImages ? (
            <>
              <CloudUploadIcon fontSize="large" />
              <Typography fontWeight={500}>
                {label || "Upload images"}
              </Typography>
            </>
          ) : (
            <Grid spacing={4} container>
              {images.map((image, i) => (
                <Grid item md={4} xs={6} key={i} position="relative">
                  <Box component="img" src={image} maxWidth="100%" alt="" />
                  <IconButton
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      removeImage(image);
                    }}
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Grid>
              ))}
            </Grid>
          )}
        </IconButton>
      </Stack>
    );
  }
);

export default ImageUpload;
