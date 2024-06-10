import { axiosInstance } from "./axiosConfig";

export async function request(endpoint) {
  // Truy cập đến đường dẫn
  const response = await axiosInstance.get(endpoint);

  // Thành công
  return response.data;
}
export async function requestPost(endpoint, data) {
  // Truy cập đến đường dẫn
  const response = await axiosInstance.post(endpoint, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Thành công
  return response.data;
}
export async function requestPut(endpoint, data) {
  // Truy cập đến đường dẫn
  const response = await axiosInstance.put(endpoint, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Thành công
  return response.data;
}
