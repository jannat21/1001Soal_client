<template>
  <div>
    <div class="row mb-3">
      <div class="col-md">
        <book-list @input="selectBook" />
      </div>
      <div class="col-md">
        <no-ssr>
          <input
            type="number"
            min="10"
            max="40"
            class="form-control"
            v-model="exam.questionCount"
            placeholder=" تعداد سوال (بین 10 تا 40)"
          />
        </no-ssr>
      </div>
      <div class="col-md">
        <question-level @input="selectLevel" ref="examLevels" :multiple="true" />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md">
        <question-muzu @input="selectMuzu" ref="examMuzu" :multiple="true" />
      </div>
      <div class="col">
        <question-source @input="selectSource" ref="examSource" :multiple="true" />
      </div>
      <div class="col">
        <question-dars @input="selectDars" ref="examDars" :multiple="true" />
      </div>
    </div>

    <div class="row">
      <div class="col-sm-3">
        <no-ssr>
          <button @click="createExam" :disabled="creating==1" class="btn btn-success btn-block">
            &nbsp;
            <font-awesome-icon :icon="['fas', 'list-ol']" />ایجاد آزمون &nbsp;
            <font-awesome-icon v-show="creating==1" icon="spinner" pulse />
          </button>
        </no-ssr>
      </div>
    </div>
    <hr />
    <div class="container">
      <div class="row">
        <div class="col-12">
          <examination :questionList="examination" :examChecked="examChecked" />
        </div>
        <no-ssr>
          <div class="col-12">
            <button
              @click="doCheckExam"
              v-show="examination.length>0"
              :disabled="examChecked"
              class="btn btn-primary btn-lg"
            >
              <font-awesome-icon :icon="['fas', 'check-double']" />بررسی و تصحیح آزمون
            </button>
            <button
              @click="saveExamination"
              class="btn btn-success btn-lg"
              v-show="examChecked==true"
            >
              <font-awesome-icon :icon="['fas','save']" />ذخیره آزمون
            </button>
          </div>
        </no-ssr>
      </div>
    </div>
  </div>
</template>

<script>
import bookList from "@/components/exam/bookList";
import questionLevel from "@/components/exam/compQuestionLevel";
import questionMuzu from "@/components/exam/compQuestionMuzu";
import questionSource from "@/components/exam/compQuestionSource";
import questionDars from "@/components/exam/compQuestionDars";
import examination from "@/components/exam/compExamination";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"])
  },
  components: {
    questionLevel,
    bookList,
    questionMuzu,
    questionSource,
    questionDars,
    examination
  },
  data() {
    return {
      totalExam: null,
      examination: [],
      examChecked: false,
      creating: 0,
      exam: {
        levels: [],
        muzuList: [],
        bookID: null,
        sourceList: [],
        darsList: [],
        questionCount: 10
      },
      items: []
    };
  },
  methods: {
    selectMuzu(muzu) {
      this.exam.muzuList = muzu;
    },
    selectBook(book) {
      if (book) this.exam.bookID = book._id;
      else this.exam.bookID = null;
    },
    selectSource(source) {
      this.exam.sourceList = source;
    },
    selectDars(dars) {
      this.exam.darsList = dars;
    },
    selectLevel(levelList) {
      this.exam.levels = levelList;
    },
    createExam() {
      if (this.exam.bookID == null) {
        this.$toasted.error("لطفاً کتاب مورد نظر را انتخاب کنید.", {
          icon: {
            name: "fa-remove"
          }
        });
        return false;
      }
      if (
        this.exam.questionCount == null ||
        isNaN(this.exam.questionCount) == true
      ) {
        this.$toasted.error("لطفاً تعداد سوالات رابین 10 تا 40 وارد کنید.", {
          icon: {
            name: "fa-remove"
          }
        });
        return false;
      }
      if (this.exam.questionCount < 10 || this.exam.questionCount > 40) {
        this.$toasted.error("لطفاً تعداد سوالات رابین 10 تا 40 وارد کنید.", {
          icon: {
            name: "fa-remove"
          }
        });
        return false;
      }
      console.log(this.exam);
      //this.creating = 1;
      this.examChecked = false;
      this.$axios
        .post("exams/create", this.exam)
        .then(response => {
          this.generateExam(response.data);
          this.creating = 0;
        })
        .catch(function(error) {
          console.log(error);
          this.creating = 0;
        });
    },
    generateExam(examData) {
      var numbers = [1, 2, 3, 4],
        randomItems,
        correctItem = 0;
      this.examination = [];
      for (var i = 0; i < examData.length; i++) {
        var itemsList = [0, 0, 0, 0];
        randomItems = this.shuffle(numbers);
        for (var j = 0; j < randomItems.length; j++) {
          var itemNum = randomItems[j];
          if (itemNum == 4) {
            itemsList[j] = { itemVal: examData[i].answer, _id: 0 };
            correctItem = j + 1;
          } else {
            itemsList[j] = examData[i].items[itemNum - 1];
          }
        }
        //itemsList = [0, 0, 0, 'x'];
        this.examination.push({
          questionIndex: i + 1,
          title: examData[i].title,
          itemsList: itemsList,
          checkedItem: 0,
          correctItem: correctItem,
          isCorrect: 0
        });
      }
    },
    setCheckedItem(question, item_i) {
      //console.log(this.examination);
      question.checkedItem = item_i + 1;
    },
    shuffle(o) {
      for (
        var j, x, i = o.length;
        i;
        j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
      );
      return o;
    },
    doCheckExam() {
      var correctAnswer = 0;
      var inCorrectAnswer = 0;
      var questionCount = this.examination.length;
      for (var i = 0; i < this.examination.length; i++) {
        if (this.examination[i].isCorrect == 1) correctAnswer += 1;
        if (this.examination[i].isCorrect == -1) inCorrectAnswer += 1;
      }
      var whiteAnswer = questionCount - correctAnswer - inCorrectAnswer;
      var examMark =
        ((3 * correctAnswer - inCorrectAnswer) / (questionCount * 3)) * 100;
      this.totalExam = {
        title: "",
        description: "",
        questionCount: questionCount,
        questionList: this.examination,
        correctAnswer: correctAnswer,
        inCorrectAnswer: inCorrectAnswer,
        whiteAnswer: whiteAnswer,
        examMark: examMark
      };
      this.examChecked = true;
    },
    saveExamination() {
      if (this.isAuthenticated) {
        this.$axios
          .post("exams", { exam: this.totalExam })
          .then(response => {
            this.saving = 0;
            this.$toasted.success("آزمون جدید ثبت شد.", {
              icon: {
                name: "fa-check"
              }
            });
          })
          .catch(function(error) {
            this.saving = 0;
            this.$toasted.error("خطا در ثبت آزمون جدبد!", {
              icon: {
                name: "fa-remove"
              }
            });
            console.log(error);
          });
      } else {
        this.$toasted.info('لطفاً وارد سامانه شوید. در صورتی که تاکنون عضو نشده اید، ثبت نام کنید.'); 
      }
    }
  },
  mounted() {
    /*this.$axios
      .get("questions_muzulist")
      .then(response => {
        this.muzuOptions = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });

    this.$axios
      .get("questions_source")
      .then(response => {
        this.sourceOptions = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });

    this.$axios
      .get("questions_dars")
      .then(response => {
        this.darsOptions = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });

    this.$axios
      .get("books")
      .then(response => {
        this.bookOptions = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });*/
  }
};
</script>
