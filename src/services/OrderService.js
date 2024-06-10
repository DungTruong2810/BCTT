import { requestPost } from "../api/request";

export const addOrder = async (data) => {
  try {
    const data1 = await requestPost(`order/add-order`, data);
    return data1;
  } catch (error) {
    console.log(error);
  }
};
