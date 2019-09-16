<template>
  <no-ssr>
    <multiselect
      dir="rtl"
      v-model="level"
      :options="options"
      placeholder="سطح سوال"
      :show-labels="false"
      :multiple="multiple"
      @input="selectLevel"
    ></multiselect>
  </no-ssr>
</template>

<script>
export default {
  props: { multiple: { type: Boolean, default: false } },
  data() {
    return { options: ["ساده", "متوسط", "دشوار"], level: null };
  },
  methods: {
    selectLevel(value, id) {
      this.$emit("input", value);
    },
    clearLevel() {
      this.level = null;
    }
  }
};
</script>
