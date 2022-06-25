export interface IRole {
  id: number;
  value: string;
  name: string;
}

export interface IData {
  email: string;
  password: string;
  fullName: string;
  userType: string;
}

export interface IDataLogin {
  email: string;
  password: string;
}
