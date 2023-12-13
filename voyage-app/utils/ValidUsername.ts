const usernameRegEx = /^\w[\w.]{3,10}\w$/;
const specialCharacter = /(?=.*[!@#$%^&*()_=+\-=\[\]{};':"\\|,.<>\/?])/;

export const isValidUsername = (username: string) => {
  return usernameRegEx.test(username) && !username.match(specialCharacter);
};
