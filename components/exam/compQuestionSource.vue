<template>
  <div>
    <no-ssr>
      <multiselect
        dir="rtl"
        @input="selectSource"
        v-model="source"
        :options="sourceOptions"
        :multiple="multiple"
        :show-labels="false"
        :taggable="true"
        @tag="addSource"
        placeholder="منبع"
      ></multiselect>
    </no-ssr>
  </div>
</template>

<script>
export default {
  props: { multiple: { type: Boolean, default: false } },
  data() {
    return { sourceOptions: [], source: null };
  },
  methods: {
    addSource(newSource) {
      this.sourceOptions.push(newSource);
      this.source = newSource;
      this.$emit("input", newSource);
    },
    selectSource(value, id) {
      this.$emit("input", value);
    }
  },
  mounted() {
    this.$axios
      .get("questions/sourceList")
      .then(response => {
        this.sourceOptions = response.data.sourceList;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>

