<script setup lang="ts">
import { ref, defineProps } from "vue";
import { useDisplay } from "vuetify";
import { useI18n } from "vue-i18n";
import { usePackageStore } from "@/store";
import { IPackageDetails } from "@/store/packages";

const store = usePackageStore();

const { t } = useI18n();
const { mobile } = useDisplay();

const props = defineProps<{
  item: IPackageDetails | null;
}>();

const packageName = ref<string>(props.item?.package.name || "");
const version = ref<string | null>(props.item?.package.version || null);
const prevFolder = ref<unknown | null>(null);
const currFolder = ref<unknown | null>(props.item?.files || null);
const path = ref<string>("");

const onFolderBack = () => {
  const lastIndex = path.value.lastIndexOf("/");
  const firstIndex = path.value.indexOf("/");

  currFolder.value = prevFolder.value;

  if (firstIndex === lastIndex) {
    path.value = "";
    return;
  }

  path.value = path.value.slice(0, lastIndex);
};

const onChangeVersion = async (version: string) => {
  if (props.item) {
    await store.getPackageVersion({ ...props.item.package, version });
    currFolder.value = props.item?.files;
  }
};
</script>

<template>
  <template v-if="props.item">
    <v-card v-bind="{ flat: true }">
      <v-row v-bind="{ align: 'center' }">
        <v-col v-bind="{ cols: 12, md: 4 }">
          <v-card-title>
            {{ `${packageName}${path}` }}
          </v-card-title>
        </v-col>
        <v-col v-bind="{ cols: 12, md: 4, offset: mobile ? 0 : 4 }">
          <v-card-text>
            <v-select
              v-model="version"
              v-bind="{
                variant: 'outlined',
                items: props.item.versions,
                hideDetails: true,
              }"
              v-on="{
                'update:modelValue': (version: string) => onChangeVersion(version)
              }"
            ></v-select>
          </v-card-text>
        </v-col>
      </v-row>

      <v-table v-show="!store.loading" v-bind="{ height: 600 }">
        <thead>
          <tr>
            <th>
              <v-chip
                v-bind="{
                  prependIcon: 'mdi-subdirectory-arrow-left',
                  variant: 'text',
                  disabled: !path,
                }"
                v-on="{
                  click: onFolderBack,
                }"
              >
                {{ path }}
              </v-chip>
            </th>
          </tr>
        </thead>
        <tbody>
          <template
            v-for="{ type, name, files } of currFolder"
            v-bind:key="name"
          >
            <template v-if="type === 'directory'">
              <tr>
                <th>
                  <v-chip
                    v-bind="{
                      target: '_blank',
                      variant: 'text',
                      prependIcon: 'mdi-folder',
                    }"
                    v-on="{
                      click: () => {
                        path = path.concat(`/${name}`);
                        prevFolder = currFolder;
                        currFolder = files;
                      },
                    }"
                  >
                    {{ `/npm/${packageName}/${version}${path}/${name}` }}
                  </v-chip>
                </th>
              </tr>
            </template>
            <template v-if="type === 'file'">
              <tr>
                <th>
                  <v-chip
                    v-bind="{
                      prependIcon: 'mdi-file',
                      target: '_blank',
                      variant: 'text',
                      href: `https://cdn.jsdelivr.net/npm/${packageName}@${version}${path}/${name}`,
                    }"
                  >
                    {{ `/npm/${packageName}/${version}${path}/${name}` }}
                  </v-chip>
                </th>
              </tr>
            </template>
          </template>
        </tbody>
      </v-table>
    </v-card>
  </template>

  <template v-else>
    <v-card>
      <v-card-text> {{ t("noData") }}</v-card-text>
    </v-card>
  </template>
</template>
