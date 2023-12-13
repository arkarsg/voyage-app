const digit = /[0-9]/;
const upperCase = /[A-Z]/;
const lowerCase = /[a-z]/;
const nonAlphanumeric = /[^0-9A-Za-z]/;

export const isStrongPassword = (password: string) =>
  [digit, upperCase, lowerCase, nonAlphanumeric].every((re) =>
    re.test(password)
  ) &&
  password.length >= 8 &&
  password.length <= 32;
