import { Stack, Box, TextField, Typography, Alert } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import EastIcon from "@mui/icons-material/East";
import { AuthData, useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ForgetPasswordModal from "./forgetPasswordModal";
import { http, isHttpError } from "../../libs/axios/http";
import InputPassword from "../../components/form/inputPassword";
import Logo from "../../components/logo";

type Form = {
  username: string;
  password: string;
};

const validationSchema = Yup.object().shape({
  username: Yup.string().email().required(),
  password: Yup.string().required(),
});

export default function SignIn() {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Form>({
    resolver: yupResolver(validationSchema),
  });

  const { login } = useAuth();

  const navigate = useNavigate();

  const onSubmit = async (formData: Form) => {
    try {
      const { data } = await http.post<AuthData>("/auth/login", formData);

      login(data);

      navigate("/");
    } catch (e: unknown) {
      Object.keys(formData).forEach((el) => {
        setError(el as keyof Form, {
          type: "credential",
          message: isHttpError(e)
            ? e.response?.data?.message
            : "Invalid credentials",
        });
      });
    }
  };

  return (
    <Stack justifyContent="center" minHeight="100vh">
      <Stack
        sx={{
          m: "0 auto",
          width: {
            xs: "95%",
            lg: 500,
          },
        }}
      >
        <Logo sx={{ maxWidth: 300, mx: "auto", mb: 2 }} />

        <Card sx={{ minWidth: "100%", borderRadius: 2, boxShadow: 2 }}>
          <CardContent
            sx={{
              px: 6,
              py: 5,
            }}
          >
            <Box sx={{ mb: 3, textAlign: "center" }}>
              <Typography variant="h2" color="primary" fontSize={22}>
                Welcome back
              </Typography>
              <Typography fontSize={16}>
                Sign in to continue to Ameta.
              </Typography>

              {errors?.username?.type === "credential" && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {errors.username.message}
                </Alert>
              )}
            </Box>

            <Stack
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              spacing={2}
              sx={{
                width: "100%",
              }}
            >
              <TextField
                label="Email"
                variant="outlined"
                error={!!errors.username}
                {...register("username")}
              />

              <InputPassword
                label="Password"
                error={!!errors.password}
                {...register("password")}
              />

              <LoadingButton
                type="submit"
                loading={isSubmitting}
                loadingPosition="center"
                variant="contained"
                startIcon={<EastIcon />}
              >
                Sign in
              </LoadingButton>
            </Stack>
          </CardContent>
        </Card>
        <ForgetPasswordModal />
      </Stack>
    </Stack>
  );
}
