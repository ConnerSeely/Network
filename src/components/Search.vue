<template>
  <div class="row">
    <form @submit.prevent="searchPosts">
      <input
        v-model="search"
        type="text"
        class="col-10"
        placeholder="search posts"
      />
      <button class="col-2 btn btn-primary">
        <i class="mdi mdi-magnify"></i>
      </button>
    </form>
  </div>
</template>


<script>
import { computed, reactive, onMounted, ref } from "vue";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
export default {
  setup() {
    const search = ref("");
    return {
      search,
      async searchPosts() {
        try {
          logger.log("searching", search.value);
          await postsService.searchPosts(`query=${search.value}`);
        } catch (error) {
          Pop.toast(error.message, "error");
          logger.error(error);
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>