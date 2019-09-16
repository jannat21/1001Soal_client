<template>
  <section class>
    <!--==========================
    Header
    ============================-->
    
    <!--==========================
    Intro Section
    ============================-->
    




    
    <a href="#" class="back-to-top">
      <i class="fa fa-chevron-up"></i>
    </a>


    <div class="row">
      <div class="col-md-4 col-sm-3"></div>
      <div class="col-md-5 col-lg-4 col-sm-6">
        <img
          class="mx-auto d-block img-fluid"
          alt="logo"
          src="~assets/images/logo.png"
          style="margin-top:50px;"
        />
        <form @submit.prevent="login" style="margin-top:20px;">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                <i class="fa fa-user text-primary"></i>
              </span>
            </div>
            <input
              type="text"
              v-model="userForm.username"
              class="form-control"
              placeholder="نام کاربری"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                <i class="fa fa-lock text-primary"></i>
              </span>
            </div>
            <input
              type="password"
              v-model="userForm.password"
              class="form-control"
              placeholder="کلمه عبور"
              aria-label="Password"
              aria-describedby="basic-addon1"
            />
          </div>

          <div class="input-group mb-3">
            <button type="submit" class="btn btn-primary btn-block">
              <i class="fa fa-address-book-o"></i>
              ورود
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: "firstPage",
  mounted() {},
  data() {
    return {
      userForm: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    checkForm() {
      this.$toasted.clear();
      if (this.userForm.username && this.userForm.password) {
        return true;
      } else {
        if (!this.userForm.username) {
          this.$toasted.error("نام کاربری را وارد کنید.", {
            icon: { name: "fa-remove" }
          });
        }
        if (!this.userForm.password) {
          this.$toasted.error("کلمه عبور را وارد کنید.", {
            icon: { name: "fa-remove" }
          });
        }
      }
    },
    async login() {
      if (this.checkForm()) {
      } else {
        return false;
      }
      try {
        await this.$auth.loginWith("local", {
          data: this.userForm
        });
        this.$axios.defaults.headers.common[
          "Authorization"
        ] = this.$auth.$storage._state["_token.local"];
        var role = this.$auth.$state.user.role;
        if (role == "manager") {
          this.$router.push({
            path: "manager"
          });
        }

        /*this.$axios
          .get("auth/user")
          .then(response => {
            console.log(response);
            this.token = response.data.token;
          })
          .catch(function(error) {
            console.log(error);
          });*/
      } catch (e) {
        this.$toasted.error("خطا در وارد کردن نام کاربری و کلمه عبور!", {
          icon: { name: "fa-remove" }
        });
        //console.log(e.response);
      }

      /*
      this.$axios
        .post("auth/login")
        .then(response => {
          console.log(response);
          this.token = response.data.token;
        })
        .catch(function(error) {
          console.log(error);
        });*/
    }
  },
  created() {}
};
</script>
