<script lang="ts" setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { debounce } from "lodash";
import { useDisplay } from "vuetify";
import { usePackageStore } from "@/store";
import { IPackage } from "@/api/npmjs/NpmJsService";
import PackageCard from "@/components/PackageCard.vue";

const store = usePackageStore();
const { t } = useI18n();
const { mobile } = useDisplay();

const delay = 200;
const size = 10;

const icons = {
  npm: {
    icon: "mdi-npm",
  },
  homepage: {
    icon: "mdi-home",
  },
  repository: {
    icon: "mdi-github",
  },
  bugs: {
    icon: "mdi-bug",
  },
};

const text = ref<string>("");
const from = ref<number>(0);
const page = ref<number>(1);
const length = ref<number>(1);
const dialog = ref<boolean>(false);

const count = computed(() => {
  // page count
  return Math.ceil(store.count / size);
});

const onPageChange = async (page: number) => {
  if (!page) return;

  if (page === length.value && page <= count.value) {
    length.value += size;
  }

  from.value = page === 1 ? 0 : size * page - size;

  await store.searchPackageCollection({
    text: text.value,
    size,
    from: from.value,
  });

  window.scrollTo(0, 0);
};

const onSearch = debounce(async () => {
  await store.searchPackageCollection({
    text: text.value,
    size,
    from: 0,
  });

  length.value = count.value >= size ? size : count.value;
  page.value = 1;
}, delay);

const onClickDetail = async ($package: IPackage) => {
  await store.getPackageDetail($package);
  dialog.value = true;
};
</script>

<template>
  <v-card
    v-bind="{
      variant: 'flat',
      color: 'transparent',
    }"
  >
    <v-card-text>
      <v-text-field
        v-model="text"
        v-bind="{
          loading: store.loading,
          label: t('search'),
          variant: 'filled',
          prependInnerIcon: 'mdi-magnify',
          singleLine: true,
        }"
        v-on="{
          'update:modelValue': onSearch,
        }"
      >
      </v-text-field>
    </v-card-text>

    <template v-if="store.items?.length">
      <template v-for="item of store.items" v-bind:key="item.package.name">
        <v-card-item>
          <v-card
            v-bind="{
              color: 'transparent',
            }"
          >
            <v-row
              v-bind="{
                justify: 'space-between',
              }"
            >
              <v-col
                v-bind="{
                  alignSelf: 'center',
                  md: '4',
                  cols: '12',
                }"
              >
                <v-card-text>
                  {{ item.package.name }}
                </v-card-text>
              </v-col>
              <v-col
                v-bind="{
                  md: 'auto',
                  cols: '12',
                }"
              >
                <v-card-text>
                  <template
                    v-for="(href, key) in item.package.links"
                    v-bind:key="key"
                  >
                    <v-btn
                      v-bind:class="{
                        'mr-2': mobile,
                        'ml-2': !mobile,
                      }"
                      v-bind="{
                        href,
                        size: 'small',
                        icon: icons[key].icon,
                        variant: 'flat',
                      }"
                    >
                    </v-btn>
                  </template>
                </v-card-text>
              </v-col>
            </v-row>

            <v-card-text>
              <v-chip class="mr-2 mb-2">
                {{ t("publisher") }}: {{ item.package.publisher.username }}
              </v-chip>
              <v-chip class="mb-2">
                {{ t("version") }}: {{ item.package.version }}
              </v-chip>
            </v-card-text>
            <v-card-text>
              {{ item.package.description }}
            </v-card-text>
            <v-card-text>
              <template v-if="item.package.keywords">
                <template
                  v-for="keyword of item.package.keywords"
                  v-bind:key="keyword"
                >
                  <v-chip class="mr-2 mb-2">
                    {{ keyword }}
                  </v-chip>
                </template>
              </template>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                v-bind="{
                  variant: 'tonal',
                }"
                v-on="{
                  click: () => onClickDetail(item.package),
                }"
              >
                {{ t("details") }}
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-divider></v-divider>
        </v-card-item>
      </template>

      <v-pagination
        v-model="page"
        v-bind="{
          disabled: store.loading,
          length,
          totalVisible: mobile ? 5 : 10,
        }"
        v-on="{
          'update:modelValue': (page: number) => onPageChange(page),
        }"
      ></v-pagination>
    </template>
  </v-card>
  <v-dialog
    v-model="dialog"
    v-bind="{ width: 500, height: 800, scrollable: true }"
  >
    <v-card>
      <package-card v-bind="{ item: store.item }"></package-card>
      <v-spacer></v-spacer>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          v-on="{
            click: () => (dialog = false),
          }"
        >
          {{ t("close") }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
