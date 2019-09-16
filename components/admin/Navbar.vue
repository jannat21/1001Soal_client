<template>
  <div class="container-fluid">
    <no-ssr>
      <nav class="navbar navbar-expand-md bg-info navbar-dark">
        <!-- Brand -->
        <a class="navbar-brand" href="#">
          <img src="/img/exam24.png" />
        </a>
        <!-- Toggler/collapsibe Button -->
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- Navbar links -->
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>

            <li class="nav-item" v-if="!isAuthenticated">
              <button
                type="button"
                class="btn btn-success btn-block mb-1"
                data-toggle="modal"
                data-target="#myModal"
              >ورود</button>
            </li>

            <li class="nav-item" v-if="!isAuthenticated">
              <button
                type="button"
                class="btn btn-primary btn-block"
                data-toggle="modal"
                data-target="#myModal"
              >ثبت نام</button>
            </li>

            <li class="nav-item" v-if="isAuthenticated">
              <a @click="logout" class="nav-link" href="#">
                <font-awesome-icon :icon="['fas', 'power-off']" />خروج
              </a>
            </li>

            <li class="nav-item">
              <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-secondary">Left</button>
                <button type="button" class="btn btn-secondary">Middle</button>
                <button type="button" class="btn btn-secondary">Right</button>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </no-ssr>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  layout: "manager",
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"])
  },
  methods: {
    async logout() {
      await this.$auth.logout({
        data: {
          device_id: this.device_id
        }
      });

      this.$axios.setHeader("Authorization", null);
      this.$toasted.success("Successfully logged out");
    }
  }
};
</script>

