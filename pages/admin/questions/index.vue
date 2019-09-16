<template>
  <div style="direction:rtl;">
    <h1>
      <font-awesome-icon :icon="['fas','question']" />لیست سوالات
    </h1>
    <button
      type="button"
      class="btn btn-success mb-1"
      data-toggle="modal"
      data-target="#bookModal"
    >کتاب جدید</button>

    <div class="row">
      <div class="col">
        <div
          v-for="question in questions"
          :key="question._id"
          class="list-group-item list-group-item-default"
        >
          <a @click="view(question._id)" class="btn btn-default">View</a>
          <p style="direction:ltr" >{{question.bookID}}</p>
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

    <!-- The Modal -->
    <div class="modal fade" id="bookModal">
      <div class="modal-dialog modal-dialog-centered modal-md">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">کتاب جدید</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <!-- Modal body -->
          <div class="modal-body">
            <div class="d-flex justify-content-center">
              <form @submit.prevent="createBook" class>
                <div class="form-group">
                  <label class="control-label" for>نام کتاب:</label>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text text-primary">
                        <font-awesome-icon :icon="['fas','book']" />
                      </span>
                    </div>
                    <input class="form-control" v-model="bookForm.title" placeholder="نام کتاب" />
                  </div>
                </div>

                <div class="form-group">
                  <label class>گروه:</label>
                  <div class="input-group">
                    <multiselect
                      dir="rtl"
                      v-model="bookForm.group"
                      :options="['ریاضیات','فیزیک','شیمی','ادبیات']"
                      placeholder="گروه"
                      :show-labels="false"
                      :multiple="false"
                    ></multiselect>
                  </div>
                </div>
                <div class>
                  <div class="form-group">
                    <button @click="createBook" class="btn btn-primary btn-block">ایجاد</button>
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
      questions: [],
      saving: 0,
      bookForm: { title: null, group: null }
    };
  },
  methods: {
    createBook() {
      console.log("book form:", this.bookForm);
      this.saving = 1;
      this.$axios
        .post("books", { book: this.bookForm })
        .then(response => {
          this.saving = 0;
          this.$toasted.success("کتاب جدید ثبت شد.", {
            icon: {
              name: "fa-check"
            }
          });
        })
        .catch(function(error) {
          this.saving = 0;
          this.$toasted.error("خطا در ثبت کتلب جدبد!", {
            icon: {
              name: "fa-remove"
            }
          });
          console.log(error);
        });
    },
    updateBook(book) {
      console.log(book);
      this.$axios
        .put("books/" + book._id, { book: book })
        .then(response => {
          this.saving = 0;
          this.$toasted.success("کتاب ویرایش ثبت شد.", {
            icon: {
              name: "fa-check"
            }
          });
        })
        .catch(function(error) {
          this.saving = 0;
          this.$toasted.error("خطا در ویرایش کتاب!", {
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
      .get("questions")
      .then(response => {
        this.questions = response.data.questions;
      })
      .catch(function(error) {
        this.saving = 0;
        this.$toasted.error("خطا در دریافت لیست کتاب ها!", {
          icon: {
            name: "fa-remove"
          }
        });
      });
  }
};
</script>
