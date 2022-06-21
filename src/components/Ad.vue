<template>
  <div>
    <img class="ad-img" :src="ad.tall" alt="" />
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";

export default {
  props: { ad: { type: Object, required: true } },
  setup() {
    return {
      ads: computed(() => AppState.ads),
    };
  },
};
</script>

<style>
.ad-img {
  width: 300px;
  height: 300px;
}
</style>