<template>
  <div class="col-2 px-sm-2 px-0 bg-dark position-fixed">
    <!-- TODO position-fix the sidebar  -->
    <div
      class="
        d-flex
        flex-column
        align-items-center align-items-sm-start
        px-3
        pt-2
        text-white
        min-vh-100
      "
    >
      <a
        href="/"
        class="
          d-flex
          align-items-center
          pb-3
          mb-md-0
          me-md-auto
          text-white text-decoration-none
        "
      >
        <span class="fs-5 d-none d-sm-inline"></span>
      </a>
      <ul
        class="
          nav nav-pills
          flex-column
          mb-sm-auto mb-0
          align-items-center align-items-sm-start
        "
        id="menu"
      >
        <li class="nav-item">
          <a href="#" class="nav-link align-middle px-0">
            <i class="fs-4 bi-house"></i>
            <router-link
              :to="{ name: 'Home' }"
              class="btn text-success lighten-30 selectable text-uppercase"
            >
              Home
            </router-link>
          </a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link align-middle px-0">
            <router-link
              :to="{ name: 'Account' }"
              class="btn text-success lighten-30 selectable text-uppercase"
            >
              Account
            </router-link>
          </a>
        </li>
      </ul>
      <hr />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>