import { Autocomplete, Stack, TextField } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { FunctionComponent, useEffect } from "react";
import Modal from "../../../components/modal";
import { useForm, Controller } from "react-hook-form";
import { http } from "../../../libs/axios/http";
import { LoadingButton } from "@mui/lab";
import { mutate } from "swr";
import { toast } from "react-toastify";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Compagny as CompagnyT } from "../../../__typescript/api";
import WithModal, {
  InjectedModalProps,
} from "../../../components/modal/withModal";
import { countries } from "../../../data/countriesAndStates";
import ImageUpload from "../../../components/form/imageUpload";
import { getCountryNameFromCode } from "../../../consts/intl";

type Data = {
  name: string;
  country: string;
  file: File;
};

type Props = {
  compagny?: CompagnyT;
};

const Compagny: FunctionComponent<Props> = ({ compagny, ...modalState }) => {
  const { isOpen, open, close } = modalState as InjectedModalProps;

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Data>();

  useEffect(() => {
    if (compagny) {
      reset({ name: compagny.name, country: compagny.country });
    }
  }, [compagny]);

  const onSubmit = async ({ file, ...rest }: Data) => {
    try {
      const formData = new FormData();

      formData.append("file", file);

      Object.entries(rest).forEach(([k, v]) => {
        formData.append(k, v);
      });

      await http.post("/compagnies", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      reset();
      mutate("/compagnies");
      close();
      toast.success("Company successfully created");
    } catch (e: unknown) {}
  };

  return (
    <Modal
      {...{ isOpen, open, close }}
      title={compagny ? compagny.name : "Add new company"}
      buttonProps={{
        size: "small",
        title: compagny ? "Edit" : "New company",
        variant: compagny ? "text" : "contained",
        startIcon: compagny ? <EditOutlinedIcon /> : <AddOutlinedIcon />,
      }}
    >
      <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2}>
        <Controller
          control={control}
          name="file"
          render={({ field: { ref, value, ...rest } }) => (
            <ImageUpload label="Upload company logo" ref={ref} {...rest} />
          )}
        />

        <TextField
          error={!!errors.name}
          label="Name"
          {...register("name", { required: true })}
        />

        <Controller
          name="country"
          control={control}
          render={({ field: { onChange, value, ...controllerProps } }) => (
            <Autocomplete
              {...controllerProps}
              fullWidth
              disablePortal
              options={countries.map(({ name, iso2 }) => ({
                label: name,
                value: iso2,
                id: name,
              }))}
              renderInput={(params) => <TextField {...params} />}
              isOptionEqualToValue={(option: any, value: any) =>
                option.label === value.label
              }
              onChange={(_, value) => onChange(value?.value || null)}
              {...(compagny?.country && {
                defaultValue: {
                  id: compagny.country,
                  label: getCountryNameFromCode(compagny.country),
                  value: compagny.country,
                },
              })}
            />
          )}
        />

        <LoadingButton
          type="submit"
          loading={isSubmitting}
          loadingPosition="center"
          variant="contained"
        >
          Save
        </LoadingButton>
      </Stack>
    </Modal>
  );
};

export default WithModal(Compagny);
