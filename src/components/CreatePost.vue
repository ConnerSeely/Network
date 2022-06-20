<template>
  <div class="row justify-content-center">
    <form
      class="col-10 p-3 d-flex flex-column bg-dark"
      action=""
      @submit.prevent="createPost"
    >
      <p>Create a post</p>
      <input type="text" placeholder="body" v-model="postData.body" />
      <textarea
        name=""
        id=""
        cols="30"
        rows="4"
        placeholder="post image"
        v-model="postData.imgUrl"
      ></textarea>
      <button class="btn btn-primary">create</button>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { postsService } from "../services/PostsService";
export default {
  setup() {
    const postData = ref({});
    return {
      postData,
      async createPost() {
        try {
          await postsService.createPost(postData.value);
        } catch (error) {
          Pop.toast(error.message, "error");
          logger.error(error);
        }
      },
    };
  },
};
</script>

<style>
</style>