import { jwtDecode } from "jwt-decode";

export const decodeUser = () => {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  return decodedToken.id;
};
