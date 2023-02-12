import { AxiosInstance, AxiosResponse } from "axios";

export class JsDeliverService {
  #instance: AxiosInstance;
  constructor(instance: AxiosInstance) {
    this.#instance = instance;
  }

  public async getPackage(name: string): Promise<AxiosResponse> {
    return await this.#instance.get(`/package/npm/${name}`);
  }

  public async getPackageVersion(
    name: string,
    version?: string
  ): Promise<AxiosResponse> {
    return await this.#instance.get(`/package/npm/${name}@${version}`);
  }
}
