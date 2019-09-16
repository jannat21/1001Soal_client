<template>
  <div class="container-fluid">
    <no-ssr>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <!-- Brand -->
        <a @click="$router.push('/')" class="navbar-brand" href="#">
          <img src="/img/1001soal_32.png" />
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
              <a
                @click="$router.push('/')"
                class="nav-link"
                href="#"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                <font-awesome-icon :icon="['fas', 'home']" />خانه
              </a>
            </li>
            <li class="nav-item">
              <a
                @click="$router.push('/bepors/new')"
                class="nav-link"
                href="#"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                <font-awesome-icon :icon="['fa', 'plus-circle']" />ثبت سوال جدید
              </a>
            </li>
            <li class="nav-item" v-if="isAuthenticated">
              <a
                @click="$router.push('/users/profile')"
                class="nav-link"
                href="#"
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
              >
                <font-awesome-icon :icon="['far', 'user']" />پروفایل
              </a>
            </li>

            <li class="nav-item" v-if="!isAuthenticated">
              <button
                type="button"
                class="btn btn-info btn-block mb-1"
                data-toggle="modal"
                data-target="#myModal"
              >ورود/ثبت نام</button>
            </li>

            <!--<li class="nav-item" v-if="!isAuthenticated">
              <button
                type="button"
                class="btn btn-primary btn-block"
                data-toggle="modal"
                data-target="#myModal"
              >ثبت نام</button>
            </li>-->

            <li class="nav-item" v-if="isAuthenticated">
              <a @click="logout" class="nav-link" href="#">
                <font-awesome-icon :icon="['fas', 'power-off']" />خروج
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </no-ssr>
    <img class="img-fluid" src="/img/logo.png" style="width:100%;" />
  </div>
</template>
<script>
$(".navbar-nav>li>a").on("click", function() {
  $(".navbar-collapse").collapse("hide");
});

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
      this.$toasted.success("خروج از سامانه با موفقیت انجام شد.");
    }
  }
};
</script>

