import { request } from "../api/request";

export const getImageByProductId = async (id) => {
  const data = await request(`books/${id}/listImages`);
  return data._embedded.images;
};
