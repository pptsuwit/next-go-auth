interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  token: string;
}

interface IUserData {
  firstName: string;
  lastName: string;
  username: string;
  password?: string;
  avatar?: string;
  file?: File;
}
interface IUserTable {
  id: string;
  name: string;
  username: string;
}

interface IUserResponse {
  id?: string;
  firstName: string;
  lastName: string;
  username: string;
  assetFile: string;
  createdAt: Date;
  updatedAt: Date;
}
