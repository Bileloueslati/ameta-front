import {
  Modal as MuiModal,
  Box,
  Fade,
  Stack,
  Typography,
  Button,
  IconButton,
  ButtonProps,
} from "@mui/material";
import { FunctionComponent, PropsWithChildren } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { InjectedModalProps } from "./withModal";

type Props = PropsWithChildren &
  InjectedModalProps & {
    title: string;
    width?: {
      [key in "xs" | "md" | "lg"]?: string | number;
    };
    buttonProps: ButtonProps & {
      title: string;
    };
  };

const Modal: FunctionComponent<Props> = ({
  title,
  isOpen,
  open,
  close,
  buttonProps,
  width,
  children,
}) => {
  const { title: btnTitle, ...rest } = buttonProps;

  return (
    <>
      <Button onClick={open} size="small" {...rest}>
        {btnTitle}
      </Button>

      <MuiModal open={isOpen} onClose={close}>
        <Fade in={isOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: {
                xs: "90%",
                md: 600,
                ...width,
              },
              borderRadius: 2,
              bgcolor: "background.paper",
              boxShadow: 24,
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={4}
              sx={{
                pt: 1,
                px: 3,
                borderBottom: "1px solid #eee",
              }}
            >
              <Box>
                <Typography variant="h2" color="secondary" fontSize={22}>
                  {title}
                </Typography>
              </Box>

              <IconButton onClick={close}>
                <CloseIcon fontSize="large" sx={{ cursor: "pointer" }} />
              </IconButton>
            </Stack>

            <Box sx={{ mt: 1, px: 3, py: 2 }}>{children}</Box>
          </Box>
        </Fade>
      </MuiModal>
    </>
  );
};

export default Modal;
