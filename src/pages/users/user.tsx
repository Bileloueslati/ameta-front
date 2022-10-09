import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { Compagny, Pagination, User as UserT } from "../../__typescript/api";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {
  Stack,
  TextField,
  Grid,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { http } from "../../libs/axios/http";
import { mutate } from "swr";
import { toast } from "react-toastify";
import { ID } from "../../__typescript/common";
import useSWR from "swr";
import { LoadingButton } from "@mui/lab";
import WithModal, { InjectedModalProps } from "../../components/modal/withModal";
import Modal from "../../components/modal";
import InputPassword from "../../components/form/inputPassword";

type Props = {
  user?: UserT;
};

const validationSchema = yup.object().shape({
  compagnyId: yup.number().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().trim().min(6),
  roles: yup.array(),
  confirmPassword: yup
    .string()
    .trim()
    .when("password", {
      is: (value: string) => value && value.length,
      then: yup.string().oneOf([yup.ref("password")]),
    }),
});

type Data = Pick<UserT, "firstName" | "lastName" | "email" | "roles"> & {
  password: string;
  confirmPassword: string;
  compagnyId: ID;
};

const User: FunctionComponent<Props> = ({ user, ...modalState }) => {
  const { isOpen, open, close } = modalState as InjectedModalProps;

  const { data: compagnies } = useSWR<Pagination<Compagny>>("/compagnies");

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Data>({
    resolver: yupResolver(validationSchema),
    defaultValues: useMemo(() => {
      if (user) {
        const {
          email,
          firstName,
          lastName,
          compagny: { id: compagnyId },
        } = user;

        return { email, firstName, lastName, compagnyId };
      }

      return undefined;
    }, [user]),
  });

  const onSubmit = async (data: Data) => {
    try {
      const url = `/users${user ? `/${user.id}` : ""}`;

      const method = user ? "put" : "post";

      await http[method]<UserT>(url, data);

      mutate("/users");
      toast.success("User successfully created");
      reset();
      close();
    } catch (e: unknown) {}
  };

  useEffect(() => {
    if (user) {
      const {
        email,
        firstName,
        lastName,
        compagny: { id: compagnyId },
      } = user;

      reset({ email, firstName, lastName, compagnyId });
    }
  }, [user]);

  return (
    <Modal
      {...{ isOpen, open, close }}
      title={user ? user.firstName : "Add new user"}
      width={{
        md: 800,
      }}
      buttonProps={{
        title: user ? "Edit" : "New user",
        variant: user ? "text" : "contained",
        startIcon: user ? <EditOutlinedIcon /> : <AddOutlinedIcon />,
      }}
    >
      <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            {compagnies && (
              <Controller
                name="compagnyId"
                control={control}
                render={({
                  field: { onChange: _onChange, value, ...controllerProps },
                }) => (
                  <Autocomplete
                    {...controllerProps}
                    {...(user && {
                      defaultValue: { id: user.id, label: user.compagny.name },
                    })}
                    disablePortal
                    fullWidth
                    // @ts-ignore
                    isOptionEqualToValue={(option: any, value: any) =>
                      option.label === value.label
                    }
                    onChange={(e: any, value) => _onChange(value?.id || null)}
                    // @ts-ignore
                    options={compagnies.items.map(({ name, id }) => ({
                      label: name,
                      id,
                    }))}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={!!errors.compagnyId}
                        label="Company"
                      />
                    )}
                  />
                )}
              />
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              control={control}
              name="roles"
              render={({ field: { value, ...rest } }) => (
                <FormControl fullWidth>
                  <InputLabel id="roles">Roles</InputLabel>
                  <Select
                    multiple
                    value={value ? [...value] : []}
                    labelId="roles"
                    id="demo-simple-select"
                    label="Age"
                    {...rest}
                  >
                    <MenuItem value="ROLE_ADMIN">Admin</MenuItem>
                    <MenuItem value="ROLE_USER">User</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              error={!!errors.email}
              label="Email"
              {...register("email")}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              error={!!errors.firstName}
              label="First name"
              {...register("firstName")}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              error={!!errors.lastName}
              label="Last name"
              {...register("lastName")}
            />
          </Grid>

          {!user && (
            <>
              <Grid item xs={12} md={6}>
                <InputPassword
                  label="Password"
                  error={!!errors.password}
                  {...register("password")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputPassword
                  label="Repeat password"
                  error={!!errors.confirmPassword}
                  {...register("confirmPassword")}
                />
              </Grid>
            </>
          )}

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
      </Stack>
    </Modal>
  );
};

export default WithModal<Props>(User);
