import { z } from 'zod';

const REQUIRED_ONLY = z.string().min(1, 'This field is required');

const MIN_CHAR = (min: number): [number, string] => [
  min,
  `This field must have more than ${min} characters`,
];

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

const EMAIL_SCHEMA = REQUIRED_ONLY.email(
  'The format is invalid, please enter your email'
);

const PASSWORD_SCHEMA = REQUIRED_ONLY.min(...MIN_CHAR(8))
  .regex(NUMBER_CONTAINED.regex, NUMBER_CONTAINED.message)
  .regex(LOWERCASE_CONTAINED.regex, LOWERCASE_CONTAINED.message)
  .regex(UPPERCASE_CONTAINED.regex, UPPERCASE_CONTAINED.message);

const USERNAME_SCHEMA = REQUIRED_ONLY.min(...MIN_CHAR(5));

export const LOGIN_FORM_SCHEMA = z.object({
  email: EMAIL_SCHEMA,
  password: REQUIRED_ONLY,
});

export const REGISTER_FORM_SCHEMA = z
  .object({
    email: EMAIL_SCHEMA,
    password: PASSWORD_SCHEMA,
    confirmPassword: REQUIRED_ONLY,
    name: USERNAME_SCHEMA,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const CHANGE_EMAIL_SCHEMA = z.object({
  email: EMAIL_SCHEMA,
});

export const CHANGE_PASSWORD_SCHEMA = z.object({
  password: PASSWORD_SCHEMA,
});

export const CHANGE_PROFILE_SCHEMA = z.object({
  name: REQUIRED_ONLY,
});
