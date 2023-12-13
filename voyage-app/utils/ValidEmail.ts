const re = /\S+@\S+\.\S+/;

export const isValidEmail = (email: string) => {
  return re.test(email);
};
