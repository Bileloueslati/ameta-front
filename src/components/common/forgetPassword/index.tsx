import { Fragment, FunctionComponent } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import EastIcon from "@mui/icons-material/East";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { Stack, Box, TextField, Alert } from "@mui/material";
import { http, isHttpError } from "../../../libs/axios/http";

type Data = {
  email: string;
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
});

const ForgetPassword: FunctionComponent = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<Data>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async ({ email }: Data) => {
    try {
      await http.post(`/forget-password`, { email });
    } catch (e: unknown) {
      isHttpError(e) &&
        setError("email", { type: "user not found", message: e.message });
    }
  };

  return (
    <Fragment>
      {isSubmitSuccessful ? (
        <Alert sx={{ mt: 3 }}>
          Please check the link you got to your email address
        </Alert>
      ) : (
        <Stack
          component="form"
          spacing={2}
          mt={3}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            color="secondary"
            label="Email"
            error={!!errors.email}
            {...(errors?.email &&
              errors.email.type === "user not found" && {
                helperText: "There is no user subscribed with this email",
              })}
            {...register("email")}
          />
          <Box sx={{ display: "flex", alignSelf: "center" }}>
            <LoadingButton
              sx={{ px: { md: 5 } }}
              type="submit"
              loading={isSubmitting}
              loadingPosition="center"
              variant="contained"
              startIcon={<EastIcon />}
            >
              Submit
            </LoadingButton>
          </Box>
        </Stack>
      )}
    </Fragment>
  );
};

export default ForgetPassword;
