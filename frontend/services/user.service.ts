import httpService from "@/utils/axios";

const path = "/user";

class userServices {
  public getProfile(): Promise<IResponseData<IUser>> {
    return httpService.get("/profile");
  }

  public gets(
    page: IPage = {
      currentPage: 1,
      recordPerPage: 10,
    }
  ): Promise<IResponseData<IUserResponse>> {
    return httpService.get(
      `${path}?page=${page?.currentPage}&pageSize=${page?.recordPerPage}`
    );
  }
  public getById(id: string): Promise<IResponse<IUserResponse>> {
    return httpService.get(`${path}/${id}`);
  }
  public create(data: IUserData): Promise<IResponse<IUserResponse>> {
    let formData = new FormData();
    formData.append("username", data.username);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    if (data.password) formData.append("password", data.password);
    if (data.file) formData.append("file", data.file);
    return httpService.post(`${path}`, formData);
  }
  public update(
    id: string,
    data: IUserData
  ): Promise<IResponse<IUserResponse>> {
    let formData = new FormData();
    formData.append("id", id);
    formData.append("username", data.username);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    if (data.password) formData.append("password", data.password);
    if (data.file) formData.append("file", data.file);
    return httpService.put(`${path}`, formData);
  }
  public delete(id: number): Promise<void> {
    return httpService.delete(`${path}/${id}`);
  }
}

export const service = new userServices();
