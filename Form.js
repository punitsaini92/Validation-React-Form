import {
  Grid,
  Paper,
  TextField,
  MenuItem,
  Button,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import * as React from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";



import { useFormik } from "formik";
import { useState } from "react";
import { validationSchema } from "../Validation";
import "react-phone-input-2/lib/material.css";
import PhoneInput from "react-phone-input-2";

import * as yup from "yup";
import { useRef } from "react";

const hobbyOptions = [
  { label: "Reading", value: "reading" },
  { label: "Cooking", value: "cooking" },
  { label: "Gardening", value: "gardening" },
  // Add more hobbies as needed
];
const hobbyOptions2 = [
  { label: "Reading", value: "reading" },
  { label: "Cooking", value: "cooking" },
  { label: "Gardening", value: "gardening" },
  // Add more hobbies as needed
];

export const Form = () => {
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [showPassword, setShowPassword] = useState(false);

  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  function generateCaptcha() {
    return Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
  }

  const handleReset = (resetForm) => {
    // resetForm();
    setCaptcha(generateCaptcha()); // Generate a new CAPTCHA on reset
  };

  const InitialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dateOfBirth: null,
    address: "",
    file: null,
    image: null,
    website: "",
    decimalNumber: "",
    captchaResponse: "",
    captcha: captcha,
    hobbies: "",
    options: [],
    acceptTerms: false,
  };

  const {
    values,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
    handleChange,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues: InitialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, setFieldError }) => {
      console.log("submitted", values);

      fileInputRef.current.value = "";
      imageInputRef.current.value = "";

      document.getElementById("dateOfBirth").value = "";

      setTimeout(() => {
        if (values.captchaResponse === captcha) {
          console.log("CAPTCHA validation passed");
          setCaptcha(generateCaptcha()); // Generate a new CAPTCHA after successful validation
        } else {
          console.log("Invalid CAPTCHA");
        }
        setSubmitting(false);
      }, 1000);
      resetForm();
    },
  });
  //   console.log(formik)
  console.log(errors);

  const handleFirstNameChange = (e) => {
    const { name, value } = e.target;
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    setFieldValue(name, capitalizedValue);
  };

  const handleLastNameChange = (e) => {
    const { name, value } = e.target;
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    setFieldValue(name, capitalizedValue);
  };

  return (
    <Paper sx={{ padding: "32px" }} elevation={16}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              placeholder="Your first name"
              value={values.firstName}
              onChange={(e) => {
                handleChange(e);
                handleFirstNameChange(e);
              }}
              onBlur={handleBlur}
              error={touched.firstName && Boolean(errors.firstName)}
            />
            {errors.firstName && touched.firstName ? (
              <p className="error">{errors.firstName}</p>
            ) : (
              " "
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              placeholder="Your last name"
              value={values.lastName}
              onChange={(e) => {
                handleChange(e);
                handleLastNameChange(e);
              }}
              onBlur={handleBlur}
              error={touched.lastName && Boolean(errors.lastName)}
            />
            {errors.lastName && touched.lastName ? (
              <p className="error">{errors.lastName}</p>
            ) : (
              " "
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              placeholder="Your email address"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
            />
            {errors.email && touched.email ? (
              <p className="error">{errors.email}</p>
            ) : (
              " "
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl
              fullWidth
              error={!!(touched.phoneNumber && errors.phoneNumber)}
            >
              <PhoneInput
                country={"us"}
                value={values.phoneNumber}
                onChange={(phone) => setFieldValue("phoneNumber", phone)}
                onBlur={handleBlur("phoneNumber")}
                inputStyle={{ width: "100%" }} // Adjust the width as needed
              />
              {touched.phoneNumber && errors.phoneNumber && (
                <p className="error">{errors.phoneNumber}</p>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              name="password"
              label="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
              fullWidth
              margin="normal"
              error={touched.password && Boolean(errors.password)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => {
                        e.preventDefault(); // Prevents input blur
                      }}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errors.password && touched.password && (
              <p className="error">{errors.password}</p>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Gender"
              name="gender"
              value={values.gender}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.gender && Boolean(errors.gender)}
            >
              <MenuItem value="">Select Gender</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
            {errors.gender && touched.gender && (
              <p className="error">{errors.gender}</p>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Date of Birth"
              name="dateOfBirth"
              value={values.dateOfBirth}
              onChange={handleChange}
              onBlur={handleBlur}
              InputLabelProps={{
                shrink: true,
              }}
              id="dateOfBirth" // Add an ID for reference
              error={touched.dateOfBirth && Boolean(errors.dateOfBirth)}
            />
            {touched.dateOfBirth && errors.dateOfBirth ? (
              <p className="error">{errors.dateOfBirth}</p>
            ) : null}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              multiline
              rows={2}
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.address && Boolean(errors.address)}
            />
            {touched.address && errors.address ? (
              <p className="error">{errors.address}</p>
            ) : null}
          </Grid>

          <Grid item xs={12} sm={6}>
            <label>File upload</label>
            <br></br>
            <input
              ref={fileInputRef}
              id="file"
              name="file"
              type="file"
              onChange={(event) => {
                setFieldValue("file", event.currentTarget.files[0]);
              }}
              onBlur={handleBlur}
            />
            {errors.file && touched.file && (
              <p className="error">{errors.file}</p>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <label>Image upload</label>
            <br></br>

            <input
              ref={imageInputRef}
              id="image"
              name="image"
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={(event) => {
                setFieldValue("image", event.currentTarget.files[0]);
              }}
              onBlur={handleBlur}
            />
            {errors.image && touched.image && (
              <p className="error">{errors.image}</p>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Website URL"
              name="website"
              placeholder="Enter website URL"
              value={values.website}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.website && Boolean(errors.website)}
              helperText={touched.website && errors.website}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Decimal Number"
              name="decimalNumber"
              placeholder="Enter a decimal number"
              value={values.decimalNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.decimalNumber && Boolean(errors.decimalNumber)}
              helperText={touched.decimalNumber && errors.decimalNumber}
              type="text"
              inputProps={{ inputMode: "decimal", pattern: "^\\d*\\.?\\d*$" }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <img
              src={`https://dummyimage.com/120x40/000/fff&text=${captcha}`}
              alt="CAPTCHA"
            />
            <br></br>
            <br></br>

            <TextField
              type="text"
              name="captchaResponse"
              label="Enter CAPTCHA"
              fullWidth
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.captchaResponse}
              error={touched.captchaResponse && Boolean(errors.captchaResponse)}
            />
            {errors.captchaResponse && touched.captchaResponse ? (
              <p className="error">{errors.captchaResponse}</p>
            ) : null}
            <br></br>
            <Button type="button" onClick={() => handleReset(resetForm)}>
              Reset CAPTCHA
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Hobbies"
              name="hobbies"
              value={values.hobbies}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.hobbies && Boolean(errors.hobbies)}
            >
              <MenuItem value="" disabled>
                Select Hobbies
              </MenuItem>
              {hobbyOptions.map((hobby) => (
                <MenuItem key={hobby.value} value={hobby.value}>
                  {hobby.label}
                </MenuItem>
              ))}
            </TextField>

            {errors.hobbies && touched.hobbies && (
              <p className="error">{errors.hobbies}</p>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl
              component="fieldset"
              error={touched.options && Boolean(errors.options)}
            >
              <FormGroup>
                {hobbyOptions2.map((hobby) => (
                  <FormControlLabel
                    key={hobby.value}
                    control={
                      <Checkbox
                        checked={values.options.includes(hobby.value)}
                        onChange={() => {
                          const newHobbies = values.options.includes(
                            hobby.value
                          )
                            ? values.options.filter((h) => h !== hobby.value)
                            : [...values.options, hobby.value];
                          setFieldValue("options", newHobbies);
                        }}
                        onBlur={handleBlur}
                      />
                    }
                    label={hobby.label}
                  />
                ))}
              </FormGroup>
              {errors.options && touched.options && (
                <p className="error">{errors.options}</p>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.acceptTerms}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="acceptTerms"
                  color="primary"
                />
              }
              label="I accept the terms and conditions"
            />
            {errors.acceptTerms && touched.acceptTerms && (
              <p className="error">{errors.acceptTerms}</p>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <button type="submit">Submit</button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};
