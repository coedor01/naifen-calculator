import { AxiosResponse } from "axios";
import { Data } from "@/app/v2/axios/types";
import Services from "@/app/v2/axios/services";
import { ReportIn } from "./types";

export async function createReport(
  data: ReportIn
): Promise<AxiosResponse<Data>> {
  const res = await Services.localService.post("/v2/api/reports", data);
  return res;
}
