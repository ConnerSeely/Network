<template>
  <div class="container-fluid bg-secondary vh-100">
    <div class="about text-center">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>
    </div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-8">
          <form
            class="d-flex flex-column"
            action=""
            @submit.prevent="saveAccount"
          >
            <label for="">account name</label>
            <input type="text" v-model="editable.name" />
            <label for="">account picture</label>
            <input type="text" v-model="editable.picture" />
            <label for="">account cover image</label>
            <input type="text" v-model="editable.coverImg" />
            <label for="">bio</label>
            <input type="text" v-model="editable.bio" />
            <label for="">Github</label>
            <input type="text" v-model="editable.github" />
            <label for="">linkedin</label>
            <input type="text" v-model="editable.linkedin" />
            <label for="">resume</label>
            <input type="text" v-model="editable.resume" />
            <label for="">class</label>
            <input type="text" v-model="editable.class" />
            <label for="">graduated</label>
            <input type="checkbox" v-model="editable.graduated" />
            <button class="btn btn-primary">save</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { AppState } from "../AppState";
import { ref, watchEffect } from "@vue/runtime-core";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { accountService } from "../services/AccountService";
export default {
  name: "Account",
  setup() {
    const editable = ref({});
    watchEffect(() => {
      AppState.account;
      logger.log("account updated", AppState.account, editable.value);
      // NOTE the spread operator here just breaks reference of the original object
      editable.value = { ...AppState.account };
    });
    return {
      editable,
      account: computed(() => AppState.account),
      async saveAccount() {
        try {
          await accountService.editAccount(editable.value);
        } catch (error) {
          Pop.toast(error.message, "error");
          logger.error(error);
        }
      },
    };
  },
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
