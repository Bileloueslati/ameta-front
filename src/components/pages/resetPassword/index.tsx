import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { Stack, Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import EastIcon from "@mui/icons-material/East";
import InputPassword from "../../form/inputPassword";
import { http, HttpError } from "../../../libs/axios/http";
import useSWR from "swr";
import FullPageLoader from "../../loader/fullPageLoader";
import { ResetPasswordT } from "../../../__typescript/resetPassword";
import ForgetPassword from "../../common/forgetPassword";
import Alert from "@mui/material/Alert";

const validationSchema = Yup.object().shape({
  newPassword: Yup.string().trim().min(6),
  confirmPassword: Yup.string()
    .trim()
    .when("password", {
      is: (value: string) => value && value.length,
      then: Yup.string().oneOf([Yup.ref("newPassword")]),
    }),
});

type Data = {
  newPassword: string;
  confirmPassword: string;
};

const ResetPassword: FunctionComponent = () => {
  const { token } = useParams();

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Data>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async ({ newPassword }: Data) => {
    try {
      await http.post("reset-password", { token, newPassword });
    } catch (e: unknown) {}
  };

  const { data, error } = useSWR<ResetPasswordT, HttpError>(
    `/forget-password/${token}`
  );

  if (!data && !error) return <FullPageLoader />;

  return (
    <Stack justifyContent="center" minHeight="100vh">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          m: "0 auto",
          width: {
            xs: "95%",
            lg: 500,
          },
        }}
      >
        <Box
          component="img"
          src="/img/dark-logo.png"
          sx={{
            maxWidth: 300,
            mx: "auto",
            mb: 2,
          }}
        />
        <Card sx={{ minWidth: "100%", borderRadius: 2 }}>
          <CardContent
            sx={{
              px: 6,
              py: 5,
            }}
          >
            <Box sx={{ mb: 3, textAlign: "center" }}>
              <Typography variant="h2" color="primary" fontSize={22}>
                {!error
                  ? "Reset your password"
                  : "Request a new password change"}
              </Typography>
            </Box>

            {error && (
              <Alert severity="error">
                it's likely that the link you clicked on to reset your password
                has expired or is invalid.
              </Alert>
            )}

            {!error ? (
              <Stack
                component="form"
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
                spacing={2}
                sx={{
                  width: "100%",
                }}
              >
                <InputPassword
                  label="Password"
                  error={!!errors.newPassword}
                  {...register("newPassword")}
                />

                <InputPassword
                  label="Repeat password"
                  error={!!errors.confirmPassword}
                  {...register("confirmPassword")}
                />

                <LoadingButton
                  type="submit"
                  loading={isSubmitting}
                  loadingPosition="center"
                  variant="contained"
                  startIcon={<EastIcon />}
                >
                  Submit
                </LoadingButton>
              </Stack>
            ) : (
              <ForgetPassword />
            )}
          </CardContent>
        </Card>
      </Box>
    </Stack>
  );
};

export default ResetPassword;
