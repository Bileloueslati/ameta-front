import { FunctionComponent, useEffect, useMemo } from "react";
import {
  Stack,
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Grid,
} from "@mui/material";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { LoadingButton } from "@mui/lab";
import useUser from "../../hooks/useUser";
import { User } from "../../__typescript/api";
import ImageUpload from "../../components/form/imageUpload";
import { http } from "../../libs/axios/http";

type UserData = Pick<User, "firstName" | "lastName" | "email">;

const UserProfile: FunctionComponent = () => {
  const { id, update } = useUser();

  const { data: user } = useSWR<User>(`/users/${id}`);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<UserData>();

  const onSubmit = async (data: UserData) => {
    try {
      await http.put(`/users/${id}`, data);

      const { firstName, lastName } = data;

      update({ firstName, lastName });
    } catch (e: unknown) {}
  };

  useEffect(() => {
    if (user) {
      const { firstName, lastName, email } = user;

      reset({ firstName, lastName, email });
    }
  }, [user]);

  if (!user) return null;

  return (
    <Stack>
      <Typography variant="h2" mb={2}>
        Profile
      </Typography>
      <Card>
        <CardContent>
          <Box
            component="form"
            sx={{ width: "100%" }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={12}>
                <ImageUpload label="Profile picture" onChange={() => null} />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="First name"
                  {...register("firstName", { required: true })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Last name"
                  {...register("lastName", { required: true })}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Email"
                  {...register("email", { required: true })}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  value={user.compagny.name}
                  label="Compagny"
                  fullWidth
                  disabled
                />
              </Grid>

              <Grid
                item
                xs={12}
                lg={6}
                sx={{
                  ml: {
                    lg: "25%",
                  },
                }}
              >
                <LoadingButton
                  fullWidth
                  type="submit"
                  loading={isSubmitting}
                  loadingPosition="center"
                  variant="contained"
                >
                  Save
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default UserProfile;
