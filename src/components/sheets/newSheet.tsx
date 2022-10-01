import {
  Stack,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { FunctionComponent, useMemo } from "react";
import Modal from "../modal";
import WithModal, { InjectedModalProps } from "../modal/withModal";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LoadingButton } from "@mui/lab";
import { Sheet } from "../../__typescript/sheet";
import { http } from "../../libs/axios/http";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { sheetPlaces } from "../../consts/sheet";
import { toLower, startCase } from "lodash";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = yup.object().shape({
  atvylRef: yup.string().required(),
  shipementDate: yup.string().required(),
  plate: yup.string().required(),
  way: yup.string().required(),
  from: yup.string().required(),
  to: yup.string().required(),
});

type Data = Partial<Omit<Sheet, "user">>;

const NewSheet: FunctionComponent = ({ ...modalState }) => {
  const { isOpen, open, close } = modalState as InjectedModalProps;

  const {
    handleSubmit,
    register,
    reset,
    setError,
    control,
    formState: { isSubmitting, errors },
  } = useForm<Data>({
    defaultValues: useMemo(
      () => ({
        shipementDate: dayjs().toString(),
        from: sheetPlaces[0],
        to: sheetPlaces[1],
        way: "South Bound",
      }),
      []
    ),
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: Data) => {
    try {
      const { to, from } = data;

      if (to === from) {
        setError("to", {
          type: "samePlace",
          message: "Places must be different",
        });

        return;
      }

      await http.post("/sheets", data);

      mutate("/sheets");

      toast.success("Sheet successfully created");

      reset({});

      close();
    } catch (e: unknown) {}
  };

  return (
    <Modal
      {...{ isOpen, open, close }}
      title="Add new sheet"
      width={{
        md: 800,
      }}
      buttonProps={{
        title: "New Sheet",
        variant: "contained",
        startIcon: <AddOutlinedIcon />,
      }}
    >
      <Stack component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid spacing={3} container>
          <Grid item xs={12} md={6}>
            <TextField
              error={!!errors.atvylRef}
              label="Atvyl ref"
              {...register("atvylRef")}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="shipementDate"
                control={control}
                render={({ field: { onChange, value, ...rest } }) => (
                  <DesktopDatePicker
                    label="Date of shipment"
                    inputFormat="DD/MM/YYYY"
                    value={value}
                    onChange={(date) => onChange(date ? date.toString() : null)}
                    renderInput={(params) => (
                      <TextField
                        error={!!errors.shipementDate}
                        {...params}
                        fullWidth
                      />
                    )}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              error={!!errors.plate}
              label="Plate No"
              {...register("plate")}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              control={control}
              name="way"
              render={({ field: { ...params } }) => (
                <FormControl fullWidth>
                  <InputLabel id="way">Way</InputLabel>
                  <Select
                    labelId="way"
                    id="way"
                    label="Way"
                    error={!!errors.way}
                    {...params}
                  >
                    <MenuItem value="South Bound">South Bound</MenuItem>
                    <MenuItem value="North Bound">North Bound</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>

          {(["from", "to"] as const).map((el, i) => (
            <Grid item xs={12} md={6} key={el}>
              <Controller
                control={control}
                name={el}
                render={({ field: { ...params } }) => (
                  <FormControl fullWidth>
                    <InputLabel id="from">{startCase(toLower(el))}</InputLabel>
                    <Select
                      labelId={el}
                      id={el}
                      label={el}
                      error={!!errors[el]}
                      {...params}
                    >
                      {sheetPlaces.map((place) => (
                        <MenuItem key={place} value={place}>
                          {place}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors[el]?.type === "samePlace" && (
                      <FormHelperText error>
                        {errors[el]?.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
          ))}

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
              type="submit"
              variant="contained"
              loading={isSubmitting}
              loadingPosition="center"
              fullWidth
            >
              Submit
            </LoadingButton>
          </Grid>
        </Grid>
      </Stack>
    </Modal>
  );
};

export default WithModal(NewSheet);
