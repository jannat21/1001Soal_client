<template>
  <section>
fdfdsfds    <div class="page-header">
      <h1 class="text-info">
        <font-awesome-icon :icon="['fas','question-circle']" />لیست سوالات
      </h1>
    </div>
    <hr />
    <div class="row mb-3">
      <div class="col-sm-6">
        <button @click="$router.push('/bepors/new')" class="btn btn-success btn-lg btn-block">
          <font-awesome-icon :icon="['fas','plus-circle']" />ثبت سوال جدید
        </button>
      </div>
    </div>

    <div class="row d-none d-sm-block" v-if="pageCount>1">
      <div class="col text-center">
        <paginate
          v-model="currentPage"
          :page-count="pageCount"
          :page-range="3"
          :click-handler="pagin"
          :prev-text="'قبلی'"
          :next-text="'بعدی'"
          :container-class="'pagination  pagination-lg justify-content-center'"
          :page-class="'page-item'"
          :page-link-class="'page-link'"
          :prev-class="'page-item'"
          :prev-link-class="'page-link'"
          :next-class="'page-item'"
          :next-link-class="'page-link'"
          :first-last-button="true"
          :first-button-text="'اولین'"
          :last-button-text="'آخرین'"
        ></paginate>
      </div>
    </div>

    <div class="row d-block d-sm-none mb-3 mt-2" v-if="pageCount>1">
      <div class="col">
        <h5 class="text-muted">انتخاب صفحه</h5>
      </div>
      <div class="col">
        <no-ssr>
          <multiselect
            dir="rtl"
            v-model="currentPage"
            :options="mobilePages"
            :searchable="false"
            :close-on-select="true"
            :show-labels="false"
            @input="changeMobilePage"
            placeholder="انتخاب صفحه"
          ></multiselect>
        </no-ssr>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4 d-none d-sm-block">
        <div class="card">
          <div class="card-header">
            <h4 class="text-secondary">
              <font-awesome-icon :icon="['fas','book']" />کتاب ها
            </h4>
          </div>
          <div class="p-0 card-body">
            <ul class="list-group">
              <li
                v-for="book in bookCount"
                :key="book._id"
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                {{book._id}}
                <span class="badge badge-primary badge-pill">{{book.count}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="card mt-1">
          <div class="card-header">
            <h4 class="text-secondary">
              <font-awesome-icon :icon="['fas','list']" />موضوعات
            </h4>
          </div>
          <div class="p-0 card-body">
            <ul class="list-group">
              <li
                v-for="tag in tagCount"
                :key="tag._id"
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                {{tag._id}}
                <span class="badge badge-primary badge-pill">{{tag.count}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div v-for="q in questions" :key="q._id" class="col-md-12 mb-3">
          <a @click="$router.push('/bepors/'+q._id)">
            <div class="card bg-light">
              <div class="card-header">
                <img
                  :src="q.author?'http://localhost:3001/uploads/profile/'+q.author.image:'http://localhost:3001/uploads/profile/unknown.png'"
                  width="30px"
                />
                <span>{{q.author?q.author.name+' '+q.author.family:'ناشناس'}}</span>

                <button
                  @click="$router.push('/bepors/'+q._id)"
                  class="btn btn-secondary float-left"
                >
                  جواب به سوال
                  <span class="badge badge-success rounded-circle">{{q.answerCount}}</span>
                </button>
              </div>
              <img
                v-if="q.image"
                :src="'http://localhost:3001/uploads/'+q.image"
                class="img-thumbnail mx-auto d-block img-fluid"
              />
              <div v-if="q.body" class="card-body">
                <label for>توضیحات:</label>
                <p class="card-text">{{q.body}}</p>
              </div>
              <div v-if="q.book" class="card-body text-secondary">
                <label for>کتاب:</label>
                <p class="card-text">{{q.book}}</p>
              </div>
              <div v-if="q.tagList.length>0" class="card-body text-secondary">
                <label>موضوع:</label>
                <p
                  v-for="tag in q.tagList"
                  :key="tag"
                  class="badge badge-primary badge-pill"
                >{{tag}}</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="row mt-5 d-none d-sm-block" v-if="pageCount>1">
      <div class="col text-center">
        <paginate
          v-model="currentPage"
          :page-count="pageCount"
          :page-range="3"
          :click-handler="pagin"
          :prev-text="'قبلی'"
          :next-text="'بعدی'"
          :container-class="'pagination  pagination-lg justify-content-center'"
          :page-class="'page-item'"
          :page-link-class="'page-link'"
          :prev-class="'page-item'"
          :prev-link-class="'page-link'"
          :next-class="'page-item'"
          :next-link-class="'page-link'"
          :first-last-button="true"
          :first-button-text="'اولین'"
          :last-button-text="'آخرین'"
        ></paginate>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    mobilePages: function() {
      var result = [];
      if (this.pageCount == 0) return result;
      for (var i = 1; i <= this.pageCount; i++) {
        result.push(i);
      }
      return result;
    }
  },
  data() {
    return {
      questions: [],
      limit: 10,
      offset: 0,
      pageCount: 0,
      questionsCount: 0,
      currentPage: 1,
      bookCount: [],
      tagCount: []
    };
  },
  mounted() {
    this.getQuestions();

    this.$axios
      .get("bepors/tagCount")
      .then(response => {
        this.tagCount = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    this.$axios
      .get("bepors/bookCount")
      .then(response => {
        this.bookCount = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    changeMobilePage(value, id) {
      this.pagin(value);
    },
    pagin(pageNum) {
      this.offset = pageNum > 1 ? this.limit * (pageNum - 1) : 0;
      this.currentPage = pageNum;
      this.getQuestions();
    },
    getQuestions() {
      this.$axios
        .get("bepors/questions?limit=" + this.limit + "&offset=" + this.offset)
        .then(response => {
          this.questions = response.data.questions;
          this.questionsCount = response.data.questionsCount;
          this.pageCount = Math.ceil(this.questionsCount / this.limit);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
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
    }
  }
};
</script>
