<template>
  <v-layout>
    <v-app-bar
      v-bind="{
        title: 'NPackage',
      }"
    >
    </v-app-bar>

    <v-container>
      <v-main>
        <router-view v-slot="{ Component }">
          <template v-if="Component">
            <suspense>
              <component v-bind:is="Component"></component>
              <template v-slot:fallback> loading </template>
            </suspense>
          </template>
        </router-view>
      </v-main>
    </v-container>

    <v-footer v-bind="{ app: true, absolute: true }">
      <v-card>
        <v-card-text>
          <v-chip
            v-bind="{
              target: '_blank',
              href: 'https://github.com/VBuchatskiy',
              prependIcon: 'mdi-github',
            }"
          >
            Vladimir Buchatskiy
          </v-chip>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-layout>
</template>
