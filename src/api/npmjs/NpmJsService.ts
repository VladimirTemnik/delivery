import { AxiosInstance, AxiosResponse } from "axios";

// https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#get-v1search

export interface INpmJsSearchParams {
  text?: string;
  size?: number;
  from?: number;
}

export interface IPackageCollectionItemResponse {
  package: IPackage;
  score: IScore;
  searchScore: number;
}

export interface IPackageCollectionResponse {
  objects: IPackageCollectionItemResponse[];
  total: number;
  time: string;
}

export interface IPackage {
  name: string;
  scope: string;
  version: string;
  description: string;
  date: string;
  links: ILinks;
  publisher: IPublisher;
  maintainers: IPublisher[];
  keywords?: string[];
  author?: IAuthor;
}

export interface IAuthor {
  name: string;
  email?: string;
  url?: string;
  username?: string;
}

export interface ILinks {
  npm: string;
  homepage: string;
  repository: string;
  bugs: string;
}

export interface IPublisher {
  username: string;
  email: string;
}

export interface IScore {
  final: number;
  detail: IDetail;
}

export interface IDetail {
  quality: number;
  popularity: number;
  maintenance: number;
}

export class NpmJsService {
  #instance: AxiosInstance;
  constructor(instance: AxiosInstance) {
    this.#instance = instance;
  }

  public async search(
    params?: INpmJsSearchParams
  ): Promise<AxiosResponse<IPackageCollectionResponse>> {
    return await this.#instance.get(`/search`, {
      params,
    });
  }
}
