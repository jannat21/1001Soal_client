<template>
  <div>
    <no-ssr>
      <multiselect
        dir="rtl"
        @input="selectDars"
        v-model="dars"
        :options="darsOptions"
        :multiple="multiple"
        :show-labels="false"
        :taggable="true"
        @tag="addDars"
        placeholder="درس/بخش"
      ></multiselect>
    </no-ssr>
  </div>
</template>
<script>
export default {
  props: { multiple: { type: Boolean, default: false } },
  data() {
    return {
      darsOptions: [],
      dars: null
    };
  },
  methods: {
    selectDars(value, id) {
      this.$emit("input", value);
    },
    addDars(newDars) {
      this.darsOptions.push(newDars);
      this.dars = newDars;
      this.$emit("input", newDars);
    }
  },
  mounted() {
    this.$axios
      .get("questions/darsList")
      .then(response => {
        this.darsOptions = response.data.darsList;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>
