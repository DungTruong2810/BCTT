import { requestPost } from "../api/request";
export const login = async (data) => {
  const res = requestPost("/user/authenticate", data);
  return res;
};
export const signup = async (data) => {
  const res = requestPost("/user/register", data);
  return res;
};
