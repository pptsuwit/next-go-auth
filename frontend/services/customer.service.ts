import httpService from "@/utils/axios";
const path = "/customer";
class customerService {
  public gets(
    page: IPage = {
      currentPage: 1,
      recordPerPage: 10,
    }
  ): Promise<IResponseData<ICustomer>> {
    return httpService.get(
      `${path}?page=${page?.currentPage}&pageSize=${page?.recordPerPage}`
    );
  }
  public getById(id: string): Promise<IResponse<ICustomer>> {
    return httpService.get(`${path}/${id}`);
  }
  public create(data: ICustomer): Promise<IResponseData<ICustomer>> {
    return httpService.post(`${path}`, data);
  }
  public update(data: ICustomer): Promise<IResponseData<ICustomer>> {
    return httpService.put(`${path}/${data.id}`, data);
  }
  public delete(id: number): Promise<void> {
    return httpService.delete(`${path}/${id}`);
  }
}

export const service = new customerService();
