<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    if (this.$q.platform.is.electron) {
      require("electron").ipcRenderer.on("show-settings", () => {
        this.$router.push("/settings");
      });
    }
  },
};
</script>
