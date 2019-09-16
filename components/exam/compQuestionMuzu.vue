<template>
  <div>
    <no-ssr>
      <multiselect
        dir="rtl"
        v-model="muzu"
        @input="selectMuzu"
        :options="muzuOptions"
        :multiple="multiple"
        :searchable="true"
        :close-on-select="true"
        :show-labels="false"
        placeholder="موضوع سوال"
        :taggable="true"
        @tag="addMuzu"
      ></multiselect>
    </no-ssr>
  </div>
</template>
<script>
export default {
  props: { multiple: { type: Boolean, default: false } },
  data() {
    return { muzuOptions: [], muzu: null };
  },
  methods: {
    selectMuzu(value, id) {
      this.$emit("input", value);
    },
    addMuzu(newMuzu) {
      this.muzuOptions.push(newMuzu);
      this.muzu = newMuzu;
      this.$emit("input", newMuzu);
    }
  },
  mounted() {
    this.$axios
      .get("questions/muzulist")
      .then(response => {
        this.muzuOptions = response.data.muzuList;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>
