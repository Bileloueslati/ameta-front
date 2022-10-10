import {
  Button,
  Stack,
  Box,
  Modal,
  Fade,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useVisibilityState } from "webrix/hooks";
import ForgetPassword from "../../components/common/forgetPassword";

export default function ForgetPasswordModal() {
  const { visible, show, hide } = useVisibilityState(false);

  return (
    <>
      <Box
        sx={({ palette }) => ({
          mt: 2,
          position: "relative",
          "&::before, &::after": {
            content: `""`,
            position: "absolute",
            height: "1px",
            width: "35%",
            backgroundColor: palette.divider,
            top: "50%",
            zIndex: "-1",
          },
          "&::before": {
            left: 0,
          },
          "&::after": {
            right: 0,
          },
        })}
      >
        <Button
          onClick={show}
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

      <Modal open={visible} onClose={close} keepMounted>
        <Fade in={visible}>
          <Paper
            elevation={1}
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
              boxShadow: 24,
              px: 3,
              py: 4,
            }}
          >
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              <Box>
                <Typography variant="h2" color="primary" fontSize={22}>
                  Forget password
                </Typography>
                <Typography>
                  You will receive an e-mail to with instructions to reset your
                  password shortly.
                </Typography>
              </Box>
              <Box>
                <IconButton onClick={hide}>
                  <CloseIcon fontSize="large" sx={{ cursor: "pointer" }} />
                </IconButton>
              </Box>
            </Stack>

            <ForgetPassword />
          </Paper>
        </Fade>
      </Modal>
    </>
  );
}
