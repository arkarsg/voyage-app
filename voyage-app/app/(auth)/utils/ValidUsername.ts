const usernameRegEx = /^\w[\w.]{3,10}\w$/;

export const isValidUsername = (username: string) => {
  return usernameRegEx.test(username);
};
