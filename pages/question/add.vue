<template>
  <section>
    <no-ssr>
      <div class="row pb-2 mt-4 mb-2 border-bottom">
        <div class="col">
          <h1 class="text-primary">
            <small class="mr-1">
              <font-awesome-icon class :icon="['fas','question-circle']" />
            </small>افزودن سوال
          </h1>
        </div>
      </div>
    </no-ssr>

    <div class="row mb-2">
      <no-ssr>
        <div class="col-3">
          <button
            @click.prevent="saveQuestion"
            :disabled="saving==1"
            class="btn btn-success btn-block"
          >
            <font-awesome-icon :icon="['far', 'save']" />ذخیره
            <font-awesome-icon
              v-if="saving==1"
              spin
              :icon="['fas','spinner']"
              class="text-warning"
            />
          </button>
        </div>
      </no-ssr>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <no-ssr>
          <textarea class="form-control" v-model="question.title" placeholder="عنوان سوال"></textarea>
          <br />
        </no-ssr>
      </div>
      <div class="col-sm-12">
        <no-ssr>
          <input class="form-control" v-model="question.answer" placeholder="جواب سوال" />
          <br />
        </no-ssr>
      </div>
    </div>

    <div class="row">
      <div class="col-md">
        <no-ssr>
          <multiselect
            dir="rtl"
            label="itemVal"
            v-model="question.items"
            :options="items"
            :close-on-select="false"
            :show-labels="true"
            placeholder="گزینه ها"
            :taggable="true"
            :multiple="true"
            @tag="addItem"
          ></multiselect>
          <br />
        </no-ssr>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <book-list @input="selectBook" />
      </div>
      <div class="col">
        <question-muzu @input="selectMuzu" ref="questionMuzu" />
      </div>
      <div class="col">
        <question-level @input="selectLevel" ref="questionLevel" />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col">
        <question-source @input="selectSource" ref="questionSource" />
      </div>
      <div class="col">
        <question-dars @input="selectDars" ref="questionDars" />
      </div>
    </div>

    <!--<button @click="updateLevel" type="button">Update</button>
        <div class="col-sm-3"></div>
    <div class="col-sm-3">{{question.book}}</div>-->

    <no-ssr>
      <div class="row">
        <div class="col-sm-12" v-if="question.title">
          <label for>عنوان سوال:</label>
          <p v-html="question.title"></p>
        </div>
        <div class="col-sm-12" v-if="question.answer">
          <label for>جواب سوال:</label>
          <p v-html="question.answer"></p>
        </div>
        <div class="col-sm-12">
          <label for>گزینه های سوال:</label>
          <div v-for="(item,index) in question.items" :key="index">
            <p v-html="item"></p>
          </div>
        </div>
      </div>
    </no-ssr>

    <div class="row">
      <div class="col-sm-12">
        <div id="trumbowyg" placeholder="عنوان سوال"></div>
      </div>
      <div class="col-sm-12">
        <button
          @click="setQuestionProperty('title')"
          type="button"
          class="btn btn-info btn-block-sm"
        >عنوان سوال</button>
        <button
          @click="setQuestionProperty('answer')"
          type="button"
          class="btn btn-success btn-block-sm"
        >جواب سوال</button>
        <button
          @click="setQuestionProperty('item')"
          type="button"
          class="btn btn-warning btn-block-sm"
        >گزینه سوال</button>
      </div>
    </div>

    <div class="row mt-2">
      <no-ssr>
        <div class="col-3">
          <button
            @click.prevent="saveQuestion"
            :disabled="saving==1"
            class="btn btn-success btn-block"
          >
            <font-awesome-icon :icon="['far', 'save']" />ذخیره
            <font-awesome-icon
              v-if="saving==1"
              spin
              :icon="['fas','spinner']"
              class="text-warning"
            />
          </button>
        </div>
      </no-ssr>
    </div>

    <!-- TEST-->
    <h1>TEST</h1>
    <div class="row">
      <div class="col">
        <div
          v-for="question in questionList"
          :key="question._id"
          class="list-group-item list-group-item-default"
        >
          <a @click="view(question._id)" class="btn btn-default">View</a>
          <p style="direction:ltr" v-html="question.title"></p>
          <p v-html="question.answer"></p>
          <p v-html="question.items[0].itemVal"></p>
          <p v-html="question.items[1].itemVal"></p>
          <p v-html="question.items[2].itemVal"></p>
          <p v-html="question.muzu"></p>
          <p v-html="question.source"></p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import bookList from "@/components/exam/bookList";
import questionLevel from "@/components/exam/compQuestionLevel";
import questionMuzu from "@/components/exam/compQuestionMuzu";
import questionSource from "@/components/exam/compQuestionSource";
import questionDars from "@/components/exam/compQuestionDars";

export default {
  components: {
    questionLevel,
    bookList,
    questionMuzu,
    questionSource,
    questionDars
  },
  data() {
    return {
      saving: 0,
      question: {
        title: null,
        answer: null,
        level: null,
        muzu: null,
        bookID: null,
        source: null,
        items: [],
        dars: null
      },
      items: [],
      questionList: []
    };
  },
  mounted() {
    this.buildEditor();
    this.$axios
      .get("questions")
      .then(response => {
        this.questionList = response.data.questions;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    setQuestionProperty(property) {
      var htmlVal = $("#trumbowyg").trumbowyg("html");
      if (property == "title") this.question.title = htmlVal;
      if (property == "answer") this.question.answer = htmlVal;
      if (property == "item") this.question.items.push({ itemVal: htmlVal });
      $("#trumbowyg").trumbowyg("html", "");
    },
    updateLevel() {
      this.$refs.questionLevel.clearLevel();
    },
    selectMuzu(muzu) {
      this.question.muzu = muzu;
    },
    selectBook(book) {
      if (book) this.question.bookID = book._id;
      else this.question.bookID = null;
    },
    selectSource(source) {
      this.question.source = source;
    },
    selectDars(dars) {
      this.question.dars = dars;
    },
    selectLevel(levelList) {
      this.question.level = levelList;
    },
    /*goToPage(question) {
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
    },*/
    saveQuestion() {
      //var questionTitle = $("#trumbowyg").trumbowyg("html");
      ///this.htmlx = questionTitle;
      //questionTitle = questionTitle.trim();
      if (this.question.title == "" || this.question.title == null) {
        this.$toasted.error("عنوان سوال را وارد کنید!", {
          icon: { name: "fa-remove" }
        });
        return false;
      }
      if (this.question.answer == undefined) {
        this.$toasted.error("جواب سوال را وارد کنید!", {
          icon: {
            name: "fa-remove"
          }
        });
        return false;
      }
      this.question.answer = this.question.answer.trim();
      if (this.question.answer == "" || this.question.answer == null) {
        this.$toasted.error("جواب سوال را وارد کنید!", {
          icon: {
            name: "fa-remove"
          }
        });
        return false;
      }

      if (this.question.items.length < 3) {
        this.$toasted.error("گزینه های سوال را وارد کنید!", {
          icon: {
            name: "fa-remove"
          }
        });
        return false;
      }

      if (this.question.bookID == null) {
        this.$toasted.error("عنوان کتاب را وارد کنید.", {
          icon: {
            name: "fa-remove"
          }
        });
        return false;
      }
      /*var questionData = {
        title: questionTitle,
        answer: this.question.answer,
        level: this.question.level,
        muzu: this.question.muzu,
        source: this.question.source,
        bookName: this.question.book.name,
        bookID: this.question.book._id,
        dars: this.question.dars,
        items: this.question.items
      };*/
      console.log(this.question);
      this.saving = 1;
      this.$axios
        .post("questions", { question: this.question })
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
    addItem(newItem) {
      this.items.push({ itemVal: newItem });
      this.question.items.push({ itemVal: newItem });
    },
    view(questionID) {
      this.$router.push({
        path: "/question/" + questionID
      });
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
          ["viewHTML"],
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
          ["base64"],
          ["mathml"],
          ["emoji"]
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
