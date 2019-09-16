<template>
  <section>
    <div class="page-header">
      <button
        @click="$router.push('/bepors')"
        class="btn btn-outline-secondary float-left"
        type="button"
      >
        <font-awesome-icon :icon="['fas','arrow-circle-left']" /> بازگشت
      </button>
      <h1 class="text-info">
        <font-awesome-icon :icon="['fas','question-circle']" />مشاهده سوال / اشکال
      </h1>
    </div>
    <hr />

    <no-ssr>
      <div class="card bg-light">
        <div class="card-header">
          <img
            class="rounded-circle"
            :src="question.author?'http://localhost:3001/uploads/profile/'+question.author.image:'http://localhost:3001/uploads/profile/unknown.png'"
            width="30px"
            height="30px"
          />
          <span>{{question.author?question.author.name+' '+question.author.family:'ناشناس'}}</span>

          <span class="badge badge-info p-2 float-left">
            تعداد جواب ها:
            <span class="badge badge-pill badge-primary">{{answerCount}}</span>
          </span>
        </div>
        <img
          v-if="question.image"
          :src="'http://localhost:3001/uploads/'+question.image"
          class="img-thumbnail mx-auto d-block img-fluid"
        />
        <div v-if="question.body" class="card-body">
          <label for>توضیحات:</label>
          <p class="card-text">{{question.body}}</p>
        </div>
        <div v-if="question.book" class="card-body text-secondary">
          <label for>کتاب:</label>
          <p class="card-text">{{question.book}}</p>
        </div>
        <div v-if="question.tagList.length>0" class="card-body text-secondary">
          <label>موضوع:</label>
          <p
            v-for="tag in question.tagList"
            :key="tag"
            class="badge badge-primary badge-pill"
          >{{tag}}</p>
        </div>
      </div>
    </no-ssr>

    <no-ssr>
      <div class="row" v-if="answerCount==0">
        <div class="col">
          <div class="alert alert-warning">هیچ جوابی ثبت نشده است</div>
        </div>
      </div>
      <div class="row" v-if="answerCount>0">
        <div class="col-sm-12">
          <h2 class="text-success">لیست جواب ها:</h2>
        </div>
        <div v-for="answer in question.answers" :key="answer._id" class="col-sm-12">
          <div class="card bg-light border border-success rounded-0 mb-3">
            <div class="card-header">
              <img
                :src="answer.author?'http://localhost:3001/uploads/profile/'+answer.author.image:'http://localhost:3001/uploads/profile/unknown.png'"
                width="30px"
                height="30px"
                class="rounded-circle"
              />
              <span>{{answer.author?answer.author.name+' '+answer.author.family:'ناشناس'}}</span>

              <span class="badge badge-default p-2">تاریخ: {{answer.createDate}}</span>
            </div>
            <img
              v-if="answer.image"
              :src="'http://localhost:3001/uploads/'+answer.image"
              class="img-thumbnail mx-auto d-block img-fluid"
            />
            <div v-if="answer.description" class="card-body">
              <label for>توضیحات:</label>
              <p class="card-text">{{answer.description}}</p>
            </div>
          </div>
        </div>
      </div>
    </no-ssr>

    <div class="row">
      <div class="col-sm-12">
        <h4 class="text-primary">ارسال جواب</h4>
      </div>

      <div class="col-sm-12 text-muted">
        <div class="alert alert-secondary">
          <h3>راهنمای ارسال جواب</h3>
          <ul>
            <li class="text-justify">
              ساده ترین راه جهت ارسال جواب، ارسال عکس آن می باشد. با انتخاب و کلیک بر روی دکمه "انتخاب تصویر جواب" عکس جواب خود را انتخاب کنید.
              در صورتی که تصویر شما گویا باشد می توانید تصویر جواب را با انتخاب دکمه "ارسال جواب" جواب خود را ارسال کنید.
            </li>
            <li class="text-justify">در صورتی که توضیحاتی لازم بود، در قسمت توضیحات وارد کنید</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-6">
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
      <div class="col-sm-6">
        <button :disabled="saving==1" @click="submitForm" class="btn btn-success btn-lg btn-block">
          <font-awesome-icon :icon="['fas','paper-plane']" />ارسال جواب
          <font-awesome-icon v-if="saving==1" spin :icon="['fas','spinner']" class="text-warning" />
        </button>
      </div>
    </div>
    <div id="preview" class="mb-3">
      <img v-if="url" :src="url" class="img-thumbnail mx-auto d-block img-fluid" />
    </div>

    <div class="form-group">
      <h5 class="text-muted">توضیحات جواب</h5>
      <div id="trumbowyg" placeholder="توضیحات جواب"></div>
    </div>

    <div class="row">
      <div class="col-sm-6">
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
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  </section>
</template>

<script>
export default {
  computed: {
    answerCount() {
      if (this.question == undefined) return 0;
      if (this.question.answers == undefined) return 0;
      return this.question.answers.length;
    }
  },
  data() {
    return {
      question: { image: { path: null }, tagList: [] },
      file: "",
      saving: 0,
      description: null,
      url: null
    };
  },
  mounted() {
    this.buildEditor();
    this.$axios
      .get("bepors/" + this.$route.params.id)
      .then(response => {
        this.question = response.data.question;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    submitForm() {
      this.description = $("#trumbowyg").trumbowyg("html");
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("description", this.description);

      this.saving = 1;
      this.$axios
        .post("bepors/answer/" + this.$route.params.id, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          this.saving = 0;
          console.log(response.data);
          this.$toasted.success("جواب ثبت شد.", {
            icon: {
              name: "fa-check"
            }
          });
          this.$router.push({ path: "/bepors" });
        })
        .catch(function() {
          this.saving = 0;
          console.log("FAILURE!!");
        });
    },

    onChangeFileUpload() {
      this.file = this.$refs.file.files[0];
      this.url = URL.createObjectURL(this.file);
    } /*
    goToPage(question) {
      this.$router.push({
        path: "/question/" + question._id
      });
    },
    editQuestion(question) {},
    removeQuestion(question) {
      this.$axios
        .delete("questions/" + question._id)
        .then(response => {
          this.questions.splice(this.questions.indexOf(question), 1);
          this.$toasted.success("سوال حذف شد.", {
            icon: {
              name: "fa-check"
            }
          });
        })
        .catch(function(error) {
          this.$toasted.error("خطا در حذف سوال جدبد!", {
            icon: {
              name: "fa-remove"
            }
          });
        });
      console.log(question);
    },*/,
    saveQuestion() {
      var questionTitle = $("#trumbowyg").trumbowyg("html");
      //questionTitle = questionTitle.trim();
      this.question.body = questionTitle;
      this.question.imagebase64 = base64;
      /*if (questionTitle == "" || questionTitle == null) {
        this.$toasted.error("عنوان سوال را وارد کنید!", {
          icon: {
            name: "fa-remove"
          }
        });
        return false;
      }*/
      this.saving = 1;
      this.$axios
        .post("bepors/questions", { question: this.question })
        .then(response => {
          this.saving = 0;
          this.$toasted.success("سوال جدید ثبت شد.", {
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
    },
    addTag(newTag) {
      this.tagOptions.push(newTag);
      this.question.tagList.push(newTag);
    },
    addBook(newBook) {
      this.bookOptions.push(newBook);
      this.question.book = newBook;
    },
    buildEditor() {
      // MathJax inline configuration
      MathJax.Hub.Config({
        tex2jax: {
          inlineMath: [["$", "$"], ["\\(", "\\)"]]
        }
      });
      $("#trumbowyg").trumbowyg({
        lang: "fa",
        fixedBtnPane: true,
        fixedFullWidth: true,
        semantic: true,
        resetCss: true,
        autoAjustHeight: true,
        autogrow: true,
        btns: [
          ["undo", "redo"], // Only supported in Blink browsers
          ["formatting"],
          ["strong", "em", "del"],
          ["superscript", "subscript"],
          ["link"],
          ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull"],
          ["unorderedList", "orderedList"],
          ["horizontalRule"],
          ["removeformat"],
          ["fullscreen"],
          ["mathml"]
        ]
      });
    }
  }
};
</script>

<style>
#trumbowyg .trumbowyg-box,
#trumbowyg .trumbowyg-editor {
  max-height: 100px !important;
}

#trumbowyg .trumbowyg-editor,
#trumbowyg .trumbowyg-textarea {
  max-heigh: 100px !important;
}
</style>
