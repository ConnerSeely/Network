<template>
  <div class="container-fluid bg-secondary">
    <div class="row justify-content-center">
      <Search />
      <CreatePost />
      <div class="col-md-7" v-for="p in posts" :key="p.id">
        <Post :post="p" />
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-3 text-end">
        <button
          :disabled="currentPage <= 1"
          class="btn btn-info px-3 py-2 btn-block"
          @click="changePagePrev(currentPage - 1)"
        >
          prev
        </button>
      </div>
      <p class="col-3 text-center">page {{ currentPage }}</p>
      <div class="col-3 text-start">
        <button
          :disabled="currentPage >= totalPages"
          class="btn btn-info px-3 py-2 btn-block"
          @click="changePage(currentPage + 1)"
        >
          next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
export default {
  name: "Home",
  setup() {
    onMounted(async () => {
      try {
        await postsService.getPosts();
      } catch (error) {
        logger.log(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      currentPage: computed(() => AppState.currentPage),
      totalPages: computed(() => AppState.totalPages),
      async changePage(pageNumber) {
        try {
          await postsService.changePage(pageNumber);
          scrollTo(0, 0);
        } catch (error) {
          Pop.toast(error.message, "error");
          logger.error(error);
        }
      },
      async changePagePrev(pageNumber) {
        try {
          await postsService.changePagePrev(pageNumber);
          scrollTo(0, 0);
        } catch (error) {
          Pop.toast(error.message, "error");
          logger.error(error);
        }
      },
    };
  },
};
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
