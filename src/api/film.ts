import { FilmQueryType, FilmType } from "@/type/film";
import request from "@/utils/request";
import qs from "qs";

export async function getFilmList(params?: FilmQueryType) {
  return request.get(`/api/films?${qs.stringify(params)}`);
}

export async function getFilmRentList(params?: FilmQueryType) {
  const queryParams = {
    ...params,
    category: 'available'
  };
  return request.get(`/api/films?${qs.stringify(queryParams)}`);
}

export async function filmAdd(params: FilmType) {
  return request.post("/api/films", params);
}

export async function filmDelete(id: string) {
  return request.delete(`/api/films/${id}`);
}

export const getFilmDetail = (id: string) => {
  return request.get(`/api/films/${id}`);
};

export const filmUpdate = (id: string, params: FilmType) => {
  return request.put(`/api/films/${id}`, params);
};