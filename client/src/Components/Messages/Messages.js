import * as React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/material/styles";
import { Button, TextField, Typography } from "@mui/material";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  recipients: Yup.array()
    .min(1, "Please select at least one recipient")
    .required("Required"),
  message: Yup.string().required("Message is required"),
});

const Root = styled("div")(
  ({ theme }) => `
  color: ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,.85)"
  };
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,.15)"
  };
  padding: 4px 8px;
  width: 100%;

`
);

const Label = styled("label")`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled("div")(
  ({ theme }) => `
  width: 100%;
  border-bottom: 1px solid ${
    theme.palette.mode === "dark" ? "#434343" : "#d9d9d9"
  };
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
  }

  &.focused {
   outline: none;
   
  }

  & input {
    background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
    color: ${
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.65)"
        : "rgba(0,0,0,.85)"
    };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`
);

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const StyledTag = styled(Tag)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "#fafafa"
  };
  border: 1px solid ${theme.palette.mode === "dark" ? "#303030" : "#e8e8e8"};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`
);

const Listbox = styled("ul")(
  ({ theme }) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 2;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === "dark" ? "#2b2b2b" : "#fafafa"};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`
);

export default function Messages() {
  const formik = useFormik({
    initialValues: {
      recipients: [],
      message: "",
    },
    validationSchema,

    onSubmit: async (values) => {
      let { recipients, message } = values;
      recipients = recipients.map((recipient) => recipient.label);

      // axios request
      try {
        const { data } = await axios.post("http://localhost:8005/messages", {
          recipients,
          message,
        });
        if (data) {
          alert("Message sent successfully!");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: "customized-hook-demo",
    multiple: true,
    options: diabetesCategories,
    getOptionLabel: (option) => option.label,
    defaultValue: [],
    onChange: (event, newValue) => {
      console.log(newValue);
      formik.setFieldValue("recipients", newValue);
    },
  });

  return (
    <Root>
      <form onSubmit={formik.handleSubmit}>
        <div {...getRootProps()}>
          <Label {...getInputLabelProps()}>
            <Typography
              variant="body2"
              color={
                formik.touched.recipients && formik.errors.recipients
                  ? "error"
                  : "textSecondary"
              }
            >
              Recipients
            </Typography>
          </Label>
          <InputWrapper ref={setAnchorEl} className={focused ? "focused" : ""}>
            {value.map((option, index) => (
              <StyledTag label={option.label} {...getTagProps({ index })} />
            ))}

            <input {...getInputProps()} />
          </InputWrapper>
        </div>
        {groupedOptions.length > 0 ? (
          <Listbox {...getListboxProps()}>
            {groupedOptions.map((option, index) => (
              <li {...getOptionProps({ option, index })}>
                <span>{option.label}</span>
                <CheckIcon fontSize="small" />
              </li>
            ))}
          </Listbox>
        ) : null}
        {formik.touched.recipients && formik.errors.recipients ? (
          <Typography sx={{ fontSize: "12px" }} color="error">
            {formik.errors.recipients}
          </Typography>
        ) : null}
        {/* textarea */}
        <TextField
          id="outlined-multiline-flexible"
          label="Message"
          multiline
          rows={4}
          variant="outlined"
          name="message"
          value={formik.values.message}
          onChange={formik.handleChange}
          sx={{ width: "100%", mt: 2 }}
          error={formik.touched.message && Boolean(formik.errors.message)}
          helperText={formik.touched.message && formik.errors.message}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
          endIcon={<SendIcon />}
        >
          Send
        </Button>
      </form>
    </Root>
  );
}

// diabetes patients categories
const diabetesCategories = [
  { label: "All" },
  { label: "Children" },
  { label: "Teens" },
  { label: "Adults" },
];
