import { FunctionComponent } from "react";
import { useSheetContext } from "../../../../../contexts/sheet";
import Modal from "../../../../modal";
import WithModal, { InjectedModalProps } from "../../../../modal/withModal";
import Box from "@mui/material/Box";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useForm, Controller } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { SheetContainer } from "../../../../../__typescript/sheet";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { http } from "../../../../../libs/axios/http";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const validationSchema = yup.object().shape({
  sender: yup.string().required(),
  consignee: yup.string().required(),
  packaging: yup.number().required(),
  weight: yup.number().required(),
  delivery: yup.string().required(),
  volumem3: yup.number().required(),
  delTerms: yup.string().required(),
  atvylCosts: yup.number().required(),
  atvylIncomes: yup.number().required(),
  lusocargoCosts: yup.number().required(),
  lusocargoIncomes: yup.number().required(),
});

const NewContainerModal: FunctionComponent = ({ ...props }) => {
  const modalState = props as InjectedModalProps;

  const { id: sheetId } = useSheetContext();

  const { mutate } = useSWRConfig();

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm<SheetContainer>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: SheetContainer) => {
    try {
      await http.post("/sheet-containers", { ...data, sheetId });
      mutate(`/sheets/${sheetId}`);
      toast.success("Container successfully created");
      reset();
      modalState.close();
    } catch (e: unknown) {}
  };

  return (
    <Box>
      <Modal
        width={{
          md: 800,
        }}
        title="New container"
        buttonProps={{
          title: "New container",
          variant: "contained",
          startIcon: <AddOutlinedIcon />,
        }}
        {...modalState}
      >
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField label="Sender" fullWidth {...register("sender")} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Consignee"
                fullWidth
                {...register("consignee")}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Packaging"
                fullWidth
                {...register("packaging")}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Volume (M3)"
                fullWidth
                {...register("volumem3")}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Controller
                control={control}
                name="delTerms"
                render={({ field: { value, ...params } }) => (
                  <FormControl fullWidth>
                    <InputLabel id="delTerms-label">DelTerms</InputLabel>
                    <Select
                      labelId="delTerms-label"
                      id="delTerms-select"
                      label="DelTerms"
                      value={value || "DDU"}
                      {...params}
                    >
                      {["DDU", "EXW", "FOB"].map((el) => (
                        <MenuItem key={el} value={el}>
                          {el}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField label="Weight" fullWidth {...register("weight")} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField label="Delivery" fullWidth {...register("delivery")} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Atvyl costs"
                fullWidth
                {...register("atvylCosts")}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Atvyl incomes"
                fullWidth
                {...register("atvylIncomes")}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Lusocargo costs"
                fullWidth
                {...register("lusocargoCosts")}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Lusocargo incomes"
                fullWidth
                {...register("lusocargoIncomes")}
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
      </Modal>
    </Box>
  );
};

export default WithModal(NewContainerModal);
