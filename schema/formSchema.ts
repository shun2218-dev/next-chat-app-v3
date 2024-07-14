import { z } from 'zod';

const ONLY_REQUIRED = z.string().min(1, 'This field is required');

const NUMBER_CONTAINED = {
  regex: /[0-9]+/,
  message: 'Must have at least one number',
};

const LOWERCASE_CONTAINED = {
  regex: /[a-z]+/,
  message: 'Must have at least one lowercase character',
};

const UPPERCASE_CONTAINED = {
  regex: /[A-Z]+/,
  message: 'Must have at least one uppercase character',
};

const EMAIL_SCHEMA = ONLY_REQUIRED.email();

const PASSWORD_SCHEMA = ONLY_REQUIRED.regex(
  NUMBER_CONTAINED.regex,
  NUMBER_CONTAINED.message
)
  .regex(LOWERCASE_CONTAINED.regex, LOWERCASE_CONTAINED.message)
  .regex(UPPERCASE_CONTAINED.regex, UPPERCASE_CONTAINED.message);

export const LOGIN_FORM_SCHEMA = z.object({
  email: EMAIL_SCHEMA,
  password: ONLY_REQUIRED,
});

export const REGISTER_FORM_SCHEMA = z
  .object({
    email: EMAIL_SCHEMA,
    password: PASSWORD_SCHEMA,
    confirmPassword: ONLY_REQUIRED,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
