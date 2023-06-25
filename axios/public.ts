import { PublicData } from "@/types/public";
import { base } from "@/axios/base";
import { AxiosResponse } from "axios";

export const publicApi = {
  getPublicData(): Promise<AxiosResponse<PublicData>> {
    return base.get("/public");
  },
};
