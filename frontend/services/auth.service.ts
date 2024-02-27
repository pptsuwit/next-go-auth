import httpService from "@/utils/axios";
import { deleteCookie, getCookie } from "cookies-next";

class AuthService {
  public register(user: IRegister): Promise<IUser> {
    return httpService.post("/register", user);
  }
  public login(username: string, password: string): Promise<ILoginResponse> {
    const schema = {
      username: username,
      password: password,
    };
    return httpService.post("/login", schema);
  }
  public logout() {
    localStorage.removeItem(process.env.TOKEN_NAME as string);
    localStorage.removeItem("user");
    deleteCookie(process.env.TOKEN_NAME as string, {});
    window.location.replace(process.env.REDIRECT_TO_LOGIN as string);
  }
}

export const authService = new AuthService();
