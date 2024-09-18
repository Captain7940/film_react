import { FilmQueryType, FilmType } from "@/type/film";
import request from "@/utils/request";
import qs from "qs";

/*
export async function getFilmList(params?: FilmQueryType) {
  // https://mock.apifox.cn/m1/2398938-0-default/api/books?name=xxx&author=xxx&category=xxx
  const res = await axios(
    `https://mock.apifox.cn/m1/2398938-0-default/api/books?${qs.stringify(
      params
    )}`
  );
  return res.data;
}*/


export async function getFilmList(params?: FilmQueryType) {
  return request.get(`/api/books?${qs.stringify(params)}`);
}

export async function filmAdd(params: FilmType) {
  return request.post("/api/books", params);
}

export async function filmDelete(id: string) {
  return request.delete(`/api/books/${id}`);
}
