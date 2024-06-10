import { request } from "../api/request";

export const getAllBook = async () => {
  const data = await request(`books?sort=avgRating,desc&size=10`);
  return data._embedded.books;
};
export const getDetailProduct = async (id) => {
  const data = await request(`books/${id}`);
  return data._embedded.books;
};
export const getGEnre = async (id) => {
  const data = await request(`genre/${id}`);
  return data;
};
export const getAllGenre = async () => {
  const data = await request(`genre`);
  return data._embedded.genres;
};

export const getGenreBooks = async (id) => {
  const data = await request(
    `books/search/findByListGenres_idGenre?idGenre=${id}&size=12&page=0&`
  );
  return data._embedded.books;
};
export const getGenreBook = async (id) => {
  const data = await request(`books/${id}/listGenres`);
  console.log(data);
  return data._embedded.genres;
};

export const getSearch = async (q) => {
  const data = await request(
    `books/search/findByNameBookContaining?nameBook=${q}&size=12&page=0&`
  );
  return data._embedded.books;
};
