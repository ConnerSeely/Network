<template>
  <div class="container-fluid bg-secondary">
    <div
      class="row bg-img"
      :style="`background-image: url(${profile.coverImg})`"
    ></div>
    <div class="row justify-content-center profile">
      <div
        class="
          col-4
          d-flex
          flex-column
          justify-content-center
          align-items-center
        "
      >
        <img class="profile-img" :src="profile.picture" alt="" />
        <h3 class="col-12 text-center">
          {{ profile.name }}
        </h3>
      </div>
    </div>
    <CreatePost v-if="account.id == profile.id" />
    <div class="row justify-content-center">
      <!--  -->
      <div class="col-md-7" v-for="p in posts" :key="p.id">
        <Post :post="p" />
      </div>
      <!--  -->
    </div>
  </div>
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted } from "vue";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { useRoute } from "vue-router";
import { profilesService } from "../services/ProfilesService";
import { postsService } from "../services/PostsService";
export default {
  setup() {
    const route = useRoute();
    onMounted(async () => {
      try {
        AppState.posts = [];
        await profilesService.getProfile(route.params.id);
        await postsService.getProfilePosts(route.params.id);
      } catch (error) {
        Pop.toast(error.message, "error");
        logger.error(error);
      }
    });
    return {
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
      posts: computed(() => AppState.posts),
    };
  },
};
</script>


<style lang="scss" scoped>
.bg-img {
  height: 20vh;
  background-size: cover;
  background-position: center;
  background-color: var(--bs-primary);
}
.profile {
  transform: translateY(-10vh);
}
.profile-img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50em;
}
</style>