interface ILoginResponse {
  data: IUserLogin;
}
interface IUserLogin {
  token: string;
  user: IUserResponse;
}

interface IRegister {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}
