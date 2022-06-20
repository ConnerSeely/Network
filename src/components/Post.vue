<template>
  <div
    class="
      bg-dark
      text-light
      shadow
      rounded
      m-3
      p-3
      text-center
      border border-3 border-white
      align-items-center
    "
  >
    <router-link
      :to="{ name: 'Profile', params: { id: post.creator.id } }"
      class="btn text-light selectable"
    >
      <h4 class="">
        <img class="m-3 creator-img" :src="post.creator?.picture" alt="" />{{
          post.creator?.name
        }}
      </h4>
    </router-link>
    <button
      v-show="post.creatorId == account.id"
      class="delete-button btn selectable"
      @click="deletePost"
    >
      <i class="mdi mdi-delete-forever"></i>
    </button>
    <button class="like-button btn selectable" @click="likePost">
      <i class="mdi mdi-thumb-up"></i>
    </button>
    <p>{{ post.likeIds.length }}</p>
    <p class="mb-0">{{ formatDate(post.createdAt) }}</p>
    <img class="img-fluid" :src="post.imgUrl" alt="" />
    <p style="font-size: large">{{ post?.body }}</p>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { postsService } from "../services/PostsService";
import { AppState } from "../AppState";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
export default {
  props: { post: { type: Object, required: true } },
  setup(props) {
    const router = useRouter();
    return {
      account: computed(() => AppState.account),
      goToProfile() {
        router.push({
          name: "Profile",
          params: { id: props.post.creatorId },
        });
      },
      async deletePost() {
        try {
          await postsService.deletePost(props.post.id);
          Pop.toast("post deleted", "success");
        } catch (error) {
          Pop.toast(error.message, "error");
          logger.error(error);
        }
      },
      async likePost() {
        try {
          await postsService.likePost(props.post.id);
          Pop.toast("post Liked", "success");
        } catch (error) {
          Pop.toast(error.message, "error");
          logger.error(error);
        }
      },
      formatDate(rawDate) {
        return new Date(rawDate).toLocaleDateString();
      },
    };
  },
};
</script>

<style>
.creator-img {
  width: 50px;
  max-width: 50px;
}
.delete-button {
  background-color: red;
  margin: 1em;
}
.like-button {
  background-color: lightseagreen;
  margin: 1em;
}
</style>
