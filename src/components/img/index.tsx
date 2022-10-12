import { Box, SxProps } from "@mui/material";
import { FunctionComponent, useEffect, useRef } from "react";

type Props = {
  sx?: SxProps;
  src: string;
  alt?: string;
};

const Image: FunctionComponent<Props> = ({ src, alt = "", ...rest }) => {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = ref?.current;

    if (img) {
      img.onerror = (e) => {
        img.src =
          "https://via.placeholder.com/400x400/D63031/FFFFFF?text=Can+not+load+image";
      };
    }
  }, []);

  return (
    <Box
      component="img"
      maxWidth="100%"
      ref={ref}
      src={src}
      alt={alt}
      {...rest}
    />
  );
};

export default Image;
