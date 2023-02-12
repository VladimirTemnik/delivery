import { defineStore } from "pinia";
import { ref } from "vue";
import { npmJsService } from "@/api/npmjs";
import { jsDeliverService } from "@/api/jsdeliver";
import {
  INpmJsSearchParams,
  IPackage,
  IPackageCollectionItemResponse,
} from "@/api/npmjs/NpmJsService";

export interface IPackageDetails {
  name: string;
  version: string;
  tags: Tags;
  versions: string[];
  default: string;
  files: File[];
  package: IPackage;
}

export interface File {
  type: string;
  name: string;
  hash: string;
  time: string;
  size: number;
  files: File[];
}

export interface Tags {
  latest: string;
}

export const usePackageStore = defineStore("package", () => {
  const items = ref<IPackageCollectionItemResponse[] | null>(null);
  const item = ref<IPackageDetails | null>(null);
  const count = ref<number>(0);
  const loading = ref<boolean>(false);

  const getPackageDetail = async ($package: IPackage) => {
    loading.value = true;
    const { name, version } = $package;
    try {
      const [{ data: tags }, { data: details }] = await Promise.all([
        jsDeliverService.getPackage(name),
        jsDeliverService.getPackageVersion(name, version),
      ]);
      item.value = Object.assign({}, item.value, {
        package: $package,
        ...tags,
        ...details,
      });
    } catch (error) {
      error;
    } finally {
      loading.value = false;
    }
  };

  const getPackageVersion = async ($package: IPackage) => {
    loading.value = true;
    const { name, version } = $package;
    try {
      const { data } = await jsDeliverService.getPackageVersion(name, version);
      if (item.value) {
        item.value = Object.assign(item.value, data);
      }
    } catch (error) {
      error;
    } finally {
      loading.value = false;
    }
  };

  const searchPackageCollection = async (params?: INpmJsSearchParams) => {
    loading.value = true;
    try {
      const { data } = await npmJsService.search(params);
      const { objects, total } = data;

      count.value = total;
      items.value = objects;
    } catch (error) {
      error;
    } finally {
      loading.value = false;
    }
  };

  return {
    items,
    item,
    count,
    loading,
    getPackageDetail,
    getPackageVersion,
    searchPackageCollection,
  };
});
