import {
  FormControl,
  InputLabel,
  IconButton,
  OutlinedInput,
  InputBaseProps,
} from "@mui/material";
import { forwardRef, useId, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";

type InputProps = InputBaseProps & {
  helperText?: string;
  label?: string;
};

const InputPassword = forwardRef<HTMLInputElement, InputProps>(
  ({ onChange, error = false, helperText, label, ...props }, ref) => {
    const [type, setType] = useState<"password" | "text">("password");

    const handleTypeChange = () => {
      setType((type) => (type === "password" ? "text" : "password"));
    };

    const id = useId();

    return (
      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor={`outlined-adornment-password-${id}`}>
          {label}
        </InputLabel>
        <OutlinedInput
          id={`outlined-adornment-password-${id}`}
          type={type}
          ref={ref}
          error={error}
          {...props}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleTypeChange}
                edge="end"
              >
                {type === "password" ? (
                  <RemoveRedEyeIcon />
                ) : (
                  <VisibilityOffIcon />
                )}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />

        {helperText && (
          <FormHelperText id="component-helper-text">
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
);

InputPassword.displayName = "InputPassword";

export default InputPassword;
