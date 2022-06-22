import * as yup from 'yup';

export const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
  fullName: yup.string().min(8).max(32).required(),
  role: yup.string().required(),
});

export const LoginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});
