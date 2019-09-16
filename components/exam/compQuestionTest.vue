<template>
  <div>
    <div class="card mb-3">
      <div :class="testHeaderClass" class="card-header">
        <span>{{index+1}}-</span>
        <span v-html="question.title"></span>
      </div>
      <div class="card-body">
        <p
          :class="getItemClass(item_i)"
          @click="setCheckedItem(item_i)"
          v-for="(item,item_i) in question.itemsList"
          :key="item_i"
          style="cursor:pointer;"
        >
          <font-awesome-icon v-show="!getItemIconClass(item_i)" :icon="['far', 'square']" />
          <font-awesome-icon v-show="getItemIconClass(item_i) " :icon="['far', 'check-square']" />
          <span v-html="item.itemVal"></span>
        </p>
        <button
          class="btn btn-default btn-sm"
          :disabled="!question.checkedItem>0"
          @click="removeItem"
        >
          <font-awesome-icon :icon="['fas', 'eraser']" />حذف گزینه انتخابی
        </button>
      </div>
      <div class="card-footer"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "compQuestionTest",
  computed: {
    testHeaderClass() {
      if (this.examChecked == false) {
        return "";
      }
      if (this.examChecked == true) {
        if (this.question.isCorrect == 0) {
          return "bg-warning";
        }
        if (this.question.isCorrect == 1) {
          return "bg-success";
        }
        if (this.question.isCorrect == -1) {
          return "bg-danger";
        }
      }
    }
  },
  data() {
    return {};
  },
  props: {
    question: { type: Object, required: true },
    index: { type: Number, required: true },
    examChecked: { type: Boolean, default: false }
  },
  methods: {
    getItemClass(item_i) {
      var classStr = "";
      if (this.question.checkedItem == item_i + 1) {
        classStr += "font-weight-bold ";
        if (this.examChecked == true) {
          if (this.question.isCorrect == -1) {
            classStr += "text-danger ";
          }
        }
      }
      if (this.examChecked == true) {
        if (this.question.correctItem == item_i + 1) {
          classStr += "text-success ";
        }
      }

      return classStr;
    },
    setCheckedItem(item_i) {
      if (this.examChecked) {
        return false;
      }
      this.question.checkedItem = item_i + 1;
      if (this.question.checkedItem == this.question.correctItem) {
        this.question.isCorrect = 1;
      } else {
        this.question.isCorrect = -1;
      }
    },
    getItemIconClass(item_i) {
      if (item_i + 1 == this.question.checkedItem) {
        return true;
      } else {
        return false;
      }
    },
    removeItem() {
      if (this.examChecked) {
        return false;
      }
      this.question.checkedItem = 0;
      this.question.isCorrect = 0;
    }
  }
};
</script>
