<template>
  <div style="direction:rtl;">
    <h1>
      <font-awesome-icon :icon="['fas','users']" />لیست کاربران
    </h1>
    <button
      type="button"
      class="btn btn-success mb-1 "
      data-toggle="modal"
      data-target="#userModal"
    >کاربر جدید</button>

    <div
      v-for="user in users"
      :key="user._id"
      class="list-group-item"
    >{{user._id}}-{{user.username}}-{{user.role}}</div>
    
    <!-- The Modal -->
    <div class="modal fade" id="userModal">
      <div class="modal-dialog modal-dialog-centered modal-md">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">کاربر جدید</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <!-- Modal body -->
          <div class="modal-body">
            <div class="d-flex justify-content-center">
              <form @submit.prevent="createUser" class>
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
                      v-model="userForm.username"
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
                      v-model="userForm.password"
                      placeholder="کلمه عبور"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class>نقش کاربر:</label>
                  <div class="input-group">
                    <multiselect
                      dir="rtl"
                      v-model="userForm.role"
                      :options="['admin','manager','teacher','student']"
                      placeholder="نقش کاربر"
                      :show-labels="false"
                      :multiple="false"
                    ></multiselect>
                  </div>
                </div>
                <div class>
                  <div class="form-group">
                    <button @click="createUser" class="btn btn-primary btn-block">ورود</button>
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
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      users: [],
      saving: 0,
      userForm: { username: null, password: null, role: null }
    };
  },
  methods: {
    createUser() {
      console.log("user form:", this.userForm);
      this.saving = 1;
      this.$axios
        .post("users", { user: this.userForm })
        .then(response => {
          this.saving = 0;
          this.$toasted.success("کاربر جدید ثبت شد.", {
            icon: {
              name: "fa-check"
            }
          });
        })
        .catch(function(error) {
          this.saving = 0;
          this.$toasted.error("خطا در ثبت سوال جدبد!", {
            icon: {
              name: "fa-remove"
            }
          });
          console.log(error);
        });
    }
  },
  mounted() {
    this.$axios
      .get("users")
      .then(response => {
        this.users = response.data.users;
      })
      .catch(function(error) {
        this.saving = 0;
        this.$toasted.error("خطا در دریافت کاربران!", {
          icon: {
            name: "fa-remove"
          }
        });
      });
  }
};
</script>
