import * as yup from "yup";
import { string,ref, date } from "yup";



const FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes
const SUPPORTED_FORMATS = ['application/pdf','text/plain', 'text/xml']; // Supported file formats




export const validationSchema = yup.object().shape({
  firstName: string()
  .min(2, " Minimum 2 character sholud be required")
    .max(25, "First Name contained maximun 25 charater")
    .matches(/^[A-Z][a-zA-Z]*$/, 'First name should start with a capital letter and contain only letters')
    .matches(/^(?!.*(.)\1\1)/, 'First name should not contain three repeating characters')
    .required("Please Enter First Name"),


  lastName: string()
  .min(2, " Minimum 2 character sholud be required")
  .max(25, "Last Name contained maximun 25 charater")
  .matches(/^[A-Z][a-zA-Z]*$/, 'Last name should start with a capital letter and contain only letters')
  .matches(/^(?!.*(.)\1\1)/, 'Last name should not contain three repeating characters')
  .required("Please Enter First Name"),


  email: string()
  .email("Enter valid email")

  .matches(
    /^[^`~!@#$%^&*()-_=+[\]{}\\|;:'",<>/?].*$/,
    'Email cannot start with a special character'
  )

  .test(
    'local-part-length',
    'Local part must have at least 3 characters',
    (value) => {
      const localPart = value.split('@')[0]; // Extracting local part before @ symbol
      return localPart.length >= 3 && localPart.length <= 64;
    }
  )
  .test(
    'domain-part-length',
    'Domain part must be between 3 and 253 characters',
    (value) => {
      if (value && value.includes('@')) {
        const domainPart = value.split('@')[1];
        return domainPart.length >= 3 && domainPart.length <= 253;
      }
      return false;
    }
  )
  

  .test(
    'zero-or-one-dot-local-part',
    'Local part must contain zero or one dot',
    (value) => {
      const localPart = value.split('@')[0]; // Extracting local part before @ symbol
      const dotCount = localPart.split('.').length - 1; // Counting the dots
      return dotCount === 0 || dotCount === 1;
    }
  )

  .test(
    'valid-domain-part',
    'Email accepts only two Domains',
    (value) => {
      if (value && value.includes('@')) {
        const domainPart = value.split('@')[1]; // Extracting domain part after @ symbol
        const dotCount = (domainPart.match(/\./g) || []).length; // Counting the dots
        return dotCount === 1 || dotCount === 2;
      }
      return false; // Fail validation if no '@' symbol is present
    }
  )
 
  .required("Email is required"),



  // Validation for phoneNumber
  phoneNumber: yup
    .string()
    // .min(12, 'Phone number must be at least 10 characters')
    .required('Phone number is required')
    .matches(/^(?!.*(\d)\1{3}).*$/, 'Phone number cannot have 4 repeated digits consecutively'),



  password: string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .max(20, 'Password not exceed  20 characters'),







confirmPassword: string()
  .required('Please confirm your password')
  .oneOf([ref('password'), null], 'Passwords must match'),




  gender: string().required('Gender is required').oneOf(['male', 'female', 'other'], 'Invalid gender'),




  dateOfBirth: date()
  .nullable()
  .required('Date of birth is required')
  .max(new Date(), 'Date of birth cannot be in the future'),



  address: string()  .required('Address is required')
  .min(10, 'Address should be at least 10 characters')
  .max(50, 'Address should not exceed 50 characters'),



  file: yup
  .mixed()
  .required('Please select a file')
  .test('fileSize', 'File size too large', (value) => {
    if (!value) return true; // Skip validation if no file is selected
    return value.size <= FILE_SIZE;
  })
  .test('fileFormat', 'Unsupported file format', (value) => {
    if (!value) return true; // Skip validation if no file is selected
    return SUPPORTED_FORMATS.includes(value.type);
  }),



  image: yup
  .mixed()
  .required('Please select a file')
  .test('fileType', 'Only JPG, JPEG, or PNG files are allowed', (value) => {
    return value && ['image/jpeg', 'image/jpg', 'image/png'].includes(value.type);
  })
  .test('fileSize', 'File size must be less than 2MB', (value) => {
    return value && value.size <= 2 * 1024 * 1024; // 2MB in bytes
  }),

  

  website: string().url('Invalid URL').required('Website URL is required'),

  decimalNumber:
  yup .number()
  .typeError('Enter a valid number')
  .positive('Enter a positive number')
  .required('Decimal number is required')
  .test('is-decimal', 'Invalid decimal number', (value) => /^\d*\.?\d*$/.test(value)),

  captchaResponse: yup
    .string()
    .required("Please enter the CAPTCHA value")
    .matches(/^[0-9]{4}$/, 'Invalid CAPTCHA')
    .test("match-captcha", "CAPTCHA does not match", function (value) {
      const { captcha } = this.parent;
      return value && value.toLowerCase() === captcha.toLowerCase();
    }),

    hobbies: yup.string().required('Please select at least one hobby'),

    options: yup.array().min(1, 'Please select at least one hobby'), // Validation for at least one hobby

    acceptTerms: yup
    .bool()
    .oneOf([true], "Please accept the terms and conditions"),



});
