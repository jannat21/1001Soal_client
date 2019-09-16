<template>
  <div>
    <compQuestionTest
      :question="question"
      :index="index"
      v-for="(question,index) in questionList"
      :key="question._id"
      :examChecked="examChecked"
    />
  </div>
</template>
<script>
import compQuestionTest from "@/components/exam/compQuestionTest";
export default {
  name: "compExamination",
  components: { compQuestionTest },
  props: {
    questionList: { type: Array, required: true },
    examChecked: { type: Boolean, default: false }
  }
};
</script>