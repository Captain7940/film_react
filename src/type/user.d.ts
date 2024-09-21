import { ValueOf } from "next/dist/shared/lib/constants";
import { USER_ROLE, USER_SEX, USER_STATUS } from "./../constants/index";

export interface UserQueryType {
  name?: string;
  status?: number;
  current?: number;
  pageSize?: number;
}

export interface UserType {
  _id?: string;
  name: string;
  password: string;
  status: "on" | "off";
  nickName: string;
  sex: USER_SEX;
  role: USER_ROLE;
  status: USER_STATUS;
}


export interface UserLoginType {
  name: string;
  password: string;
}

export interface UserQueryType {
  current?: number;
  pageSize?: number;
  name?: string;
  all?: boolean;
  status?: USER_STATUS;
}

export interface UserFormProps {
  title: string;
  editData?: UserType;
}

export interface RentUser {
  info: {
    username: string;
  };
  token: string
}
