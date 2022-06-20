<template>
  <header>
    <Navbar />
  </header>
  <main class="container-fluid">
    <div class="row p-0">
      <div class="col-md-2 p-0">
        <Sidebar />
      </div>
      <!-- TODO overflow scroll-y -->
      <div class="col-10 p-0">
        <router-view />
      </div>
    </div>
  </main>
</template>

<script>
import { computed } from "vue";
import { AppState } from "./AppState";
export default {
  name: "App",
  setup() {
    return {
      appState: computed(() => AppState),
    };
  },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
