import {
  Button,
  Stack,
  Box,
  Modal,
  Fade,
  Typography,
  TextField,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function ForgetPassword() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Box
        sx={{
          mt: 2,
          position: "relative",
          "&::before, &::after": {
            content: `""`,
            position: "absolute",
            height: "1px",
            width: "35%",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            top: "50%",
            zIndex: "-1",
          },
          "&::before": {
            left: 0,
          },
          "&::after": {
            right: 0,
          },
        }}
      >
        <Button
          onClick={handleOpen}
          variant="text"
          size="small"
          sx={{
            display: "table",
            m: "0 auto",
          }}
        >
          Forget password ?
        </Button>
      </Box>

      <Modal open={open} onClose={handleClose} keepMounted>
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: {
                xs: "90%",
                md: 600,
              },
              borderRadius: 2,
              bgcolor: "background.paper",
              boxShadow: 24,
              px: 3,
              py: 4,
            }}
          >
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Box>
                <Typography variant="h2" color="secondary" fontSize={22}>
                  Reset password
                </Typography>
                <Typography>
                  You will receive an e-mail to with instructions to reset your
                  password shortly.
                </Typography>
              </Box>

              <CloseIcon
                fontSize="large"
                sx={{ cursor: "pointer" }}
                onClick={handleClose}
              />
            </Stack>

            <Stack component="form" spacing={2} mt={3}>
              <TextField color="secondary" label="Email" />
              <Box sx={{ display: "flex", alignSelf: "center" }}>
                <Button size="large" variant="contained">
                  Send email
                </Button>
              </Box>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
