import httpService from "@/utils/axios";

const path = "/abouts";

class Services {
  public getAbout(): Promise<IAbout> {
    return httpService.get(`${path}`);
  }
}

export const service = new Services();
