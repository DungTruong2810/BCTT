import { request, requestPut } from "../api/request";

export const getUser = async (id) => {
  const data = await request(`users/${id}`);
  return data;
};
export const checkRepeatPassword = (
  setErrorRepeatPassword,
  repeatPassword,
  password
) => {
  if (repeatPassword !== password) {
    setErrorRepeatPassword("Mật khẩu không khớp.");
    return true;
  } else {
    setErrorRepeatPassword("");
    return false;
  }
};
export const checkPassword = (setErrorPassword, password) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  if (password === "") {
    return false;
  } else if (!passwordRegex.test(password)) {
    setErrorPassword("Mật khẩu phải có ít nhất 8 ký tự và bao gồm chữ và số.");
    return true;
  } else {
    setErrorPassword("");
    return false;
  }
};

export const changepassword = async ({ id, newPassword }) => {
  const res = await requestPut("users/change-password", { id, newPassword });
  return res;
};
