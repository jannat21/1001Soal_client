<template>
  <section>
    <div class="page-header">
      <h1 class="text-info">
        <font-awesome-icon :icon="['fas','question-circle']" />ثبت سوال / اشکال
      </h1>
    </div>
    <hr />
    <div class="row">
      <div class="col text-muted">
        <div class="alert alert-secondary">
          <h3>راهنمای ثبت سوال / اشکال</h3>
          <ul>
            <li class="text-justify">
              ساده ترین راه جهت ارسال سوال و یا اشکال درسی، ارسال عکس آن می باشد. با انتخاب و کلیک بر روی دکمه "انتخاب تصویر سوال" عکس سوال خود را انتخاب کنید.
              در صورتی که تصویر شما گویا باشد می توانید تصویر سوال را با انتخاب دکمه "ارسال سوال"، سوال خود را ارسال کنید.
            </li>
            <li class="text-justify">در صورتی که توضیحاتی لازم بود، در قسمت توضیحات وارد کنید</li>
            <li
              class="text-justify"
            >دو قسمت موضوع و کتاب دلخواه است و تکمیل این دو قسمت کمک به افراد در پاسخ به سوال شما می کند.</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-6">
        <div class="image-upload">
          <label for="file" class="btn btn-primary btn-lg btn-block">
            <font-awesome-icon :icon="['fas','camera']" />انتخاب تصویر سوال
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
          <font-awesome-icon :icon="['fas','paper-plane']" />ارسال سوال
          <font-awesome-icon v-if="saving==1" spin :icon="['fas','spinner']" class="text-warning" />
        </button>
      </div>
    </div>
    <div id="preview" class="mb-3">
      <img v-if="url" :src="url" class="img-thumbnail mx-auto d-block img-fluid" />
    </div>

    <div class="form-group">
      <h5 class="text-muted">توضیحات سوال</h5>
      <div id="trumbowyg" placeholder="توضیحات سوال"></div>
    </div>

    <div class="row mb-5">
      <div class="col-md">
        <no-ssr>
          <h5 class="text-muted">موضوع سوال</h5>
          <multiselect
            dir="rtl"
            v-model="question.tagList"
            :options="tagOptions"
            :searchable="true"
            :close-on-select="true"
            :show-labels="false"
            placeholder="موضوع سوال"
            :taggable="true"
            :multiple="true"
            @tag="addTag"
          ></multiselect>
        </no-ssr>
      </div>
      <div class="col-md">
        <no-ssr>
          <h5 class="text-muted">کتاب</h5>
          <multiselect
            dir="rtl"
            v-model="question.book"
            :options="bookOptions"
            :searchable="true"
            :close-on-select="true"
            :show-labels="false"
            placeholder="کتاب"
            :taggable="true"
            @tag="addBook"
          ></multiselect>
        </no-ssr>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-6">
        <div class="col">
          <button
            :disabled="saving==1"
            @click="submitForm"
            class="btn btn-success btn-lg btn-block"
          >
            <font-awesome-icon :icon="['fas','paper-plane']" />ارسال سوال
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
  data() {
    return {
      file: "",
      questions: [],
      saving: 0,
      question: {
        book: null,
        body: null,
        tagList: []
      },
      tagOptions: [],
      bookOptions: [],
      url: null
    };
  },
  mounted() {
    this.buildEditor();

    // get tag list
    this.$axios
      .get("bepors/tags")
      .then(response => {
        this.tagOptions = response.data.tagList;
      })
      .catch(function(error) {
        console.log(error);
      });

    //get books
    this.$axios
      .get("bepors/books")
      .then(response => {
        this.bookOptions = response.data.books;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    submitForm() {
      var questionTitle = $("#trumbowyg").trumbowyg("html");
      this.question.body = questionTitle;
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("question", JSON.stringify(this.question));

      this.saving = 1;
      this.$axios
        .post("bepors/questions", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          this.saving = 0;
          console.log(response.data);
          this.$toasted.success("سوال جدید ثبت شد.", {
            icon: {
              name: "fa-check"
            }
          });
          this.$router.push({path:'/bepors'});
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
