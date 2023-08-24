<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="absolute-center">
          Awesome Todo
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs>
        <q-route-tab
          v-for="nav in navs"
          :key="nav.label"
          :icon="nav.icon"
          :label="nav.label"
          :to="nav.to"
          exact
        />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="767"
      :width="250"
      show-if-above
      bordered
      content-class="bg-primary"
    >
      <q-list dark>
        <q-item-label header> Navigation </q-item-label>
        <q-item
          clickable
          v-for="nav in navs"
          :key="nav.label"
          :to="nav.to"
          exact
          class="text-grey-4"
        >
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          v-if="$q.platform.is.electron"
          @click="quitApp"
          clickable
          class="text-grey-4 absolute-bottom"
        >
          <q-item-section avatar>
            <q-icon name="power_settings_new" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Quit</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "Layout",
  data() {
    return {
      leftDrawerOpen: false,
      navs: [
        {
          label: "Todo",
          icon: "list",
          to: "/",
        },
        {
          label: "Settings",
          icon: "settings",
          to: "/settings",
        },
      ],
    };
  },
  methods: {
    quitApp() {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Really quit Awesome Todo?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          if (this.$q.platform.is.electron) {
            require("electron").ipcRenderer.send("quit-app");
          }
        });
    },
  },
};
</script>

<style lang="scss">
@media screen and (min-width: 768px) {
  .q-footer {
    display: none;
  }

  .q-drawer {
    .q-router-link--exact-active {
      color: white !important;
    }
  }
}
</style>
