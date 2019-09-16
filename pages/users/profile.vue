<template>
  <div>
    <div class="row">
      <div class="col-sm-1"></div>
      <div class="col-sm-6">
        <form>
          <div class="form-group">
            <label for="name">نام:</label>
            <input v-model="profile.name" type="text" class="form-control" id="name" placeholder />
          </div>
          <div class="form-group">
            <label for="family">نام خانوادگی:</label>
            <input v-model="profile.family" type="text" class="form-control" id="family" />
          </div>
          <div class="form-group">
            <label for="email">آدرس ایمیل:</label>
            <input v-model="profile.email" type="email" class="form-control" id="email" />
          </div>
          <div class="form-group">
            <label for="mobile">شماره موبایل:</label>
            <input v-model="profile.mobile" type="text" class="form-control" id="mobile" />
          </div>
          <div class="form-group">
            <label for="username">نام کاربری:</label>
            <input v-model="profile.username" type="text" class="form-control" id="username" />
          </div>
          <div class="form-group">
            <label for="pass">کلمه عبور:</label>
            <input v-model="profile.password" type="password" class="form-control" id="pass" />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
      <div class="col-sm-3">
        <div id="preview" class="mb-3 mt-3">
          <img
            v-if="!url"
            :src="'http://localhost:3001/uploads/profile/'+profile.image"
            class="img-thumbnail mx-auto d-block img-fluid"
          />
          <img v-if="url" :src="url" class="img-thumbnail mx-auto d-block img-fluid" />
        </div>

        <div class="row">
          <div class="col">
            <div class="image-upload">
              <label for="file" class="btn btn-primary btn-lg btn-block">
                <font-awesome-icon :icon="['fas','camera']" />انتخاب تصویر جواب
              </label>
              <input
                type="file"
                id="file"
                name="file"
                ref="file"
                @change="onChangeFileUpload()"
                accept="image/*"
                style="display:none;"
              />
            </div>
          </div>
          <div class="col">
            <button
              :disabled="saving==1"
              @click="submitForm"
              class="btn btn-success btn-lg btn-block"
            >
              <font-awesome-icon :icon="['fas','paper-plane']" />ارسال جواب
              <font-awesome-icon
                v-if="saving==1"
                spin
                :icon="['fas','spinner']"
                class="text-warning"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      profile: {
        name: null,
        family: null,
        email: null,
        mobile: null,
        username: null,
        password: null,
        image: null
      },
      file: "",
      saving: 0,
      url: null
    };
  },
  mounted() {
    this.$axios
      .get("profiles/profile")
      .then(response => {
        this.profile = response.data.user;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    submitForm() {
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("profile", JSON.stringify(this.profile));

      //this.saving = 1;
      this.$axios
        .put("profiles/profile", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          this.saving = 0;
          console.log(response.data);
          this.$toasted.success("اطلاعات بروز رسانی شد.", {
            icon: {
              name: "fa-check"
            }
          });
          //this.$router.push({ path: "/bepors" });
        })
        .catch(function() {
          this.saving = 0;
          console.log("FAILURE!!");
        });
    },

    onChangeFileUpload() {
      this.file = this.$refs.file.files[0];
      this.url = URL.createObjectURL(this.file);
    }
  }
};
</script>
