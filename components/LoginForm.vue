<template>
  <no-ssr>
    <!-- The Modal -->
    <div class="modal fade" id="myModal">
      <div class="modal-dialog modal-dialog-centered modal-md">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">ورود</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <!-- Modal body -->
          <div class="modal-body">
            <div class="d-flex justify-content-center">
              <form class>
                <div class="form-group">
                  <label class="control-label" for>نام کاربری:</label>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text text-primary">
                        <font-awesome-icon :icon="['fas','user']" />
                      </span>
                    </div>
                    <input
                      class="form-control"
                      v-model="loginForm.username"
                      placeholder="نام کاربری"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class>کلمه عبور:</label>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text text-primary">
                        <font-awesome-icon :icon="['fas','user-lock']" />
                      </span>
                    </div>
                    <input
                      class="form-control"
                      type="password"
                      v-model="loginForm.password"
                      placeholder="کلمه عبور"
                    />
                  </div>
                </div>
                <div class>
                  <div class="form-group">
                    <button type="button" @click="login" class="btn btn-success btn-block">ورود</button>
                  </div>
                  <div class="form-group">
                    <button
                      type="button"
                      @click="register"
                      class="btn btn-primary btn-block"
                    >ثبت نام</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <!-- Modal footer -->
          <div class="modal-footer">
            <button
              type="button"
              id="hideLoginModal"
              class="btn btn-danger"
              data-dismiss="modal"
            >انصراف</button>
          </div>
        </div>
      </div>
    </div>
  </no-ssr>
</template>

<script>
export default {
  data() {
    return {
      loginForm: { username: null, password: null, role: "student" }
    };
  },
  methods: {
    checkForm() {
      this.$toasted.clear();
      if (this.loginForm.username && this.loginForm.password) {
        return true;
      } else {
        if (!this.loginForm.username) {
          this.$toasted.error("نام کاربری را وارد کنید.", {
            icon: { name: "fa-remove" }
          });
        }
        if (!this.loginForm.password) {
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
        await this.$auth.loginWith("local", { data: { user: this.loginForm } });
        $("#hideLoginModal").click();
        var role = this.$auth.$state.user.role;
        if (role == "admin") {
          this.$router.push({
            path: "/admin"
          });
        }
      } catch (e) {
        this.$toasted.error("خطا در وارد کردن نام کاربری و کلمه عبور!", {
          icon: { name: "fa-remove" }
        });
        //console.log(e.response);
      }
    },
    async register() {
      if (this.checkForm()) {
      } else {
        return false;
      }
      try {
        await this.$axios.post("users", { user: this.loginForm });
        this.$toasted.success("ثبت نام با موفقیت انجام شد.", {
          icon: { name: "fa-check" }
        });
        //await this.$auth.loginWith("local", { data: { user: this.loginForm } });
        $("#hideLoginModal").click();
      } catch (e) {
        this.$toasted.error("خطا در ثبت کردن نام کاربری و کلمه عبور!", {
          icon: { name: "fa-remove" }
        });
        //console.log(e.response);
      }
    }
  }
};
</script>
