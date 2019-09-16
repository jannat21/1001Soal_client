<template>
  <div>
    <no-ssr>
      <multiselect
        @input="selectBook"
        dir="rtl"
        v-model="book"
        label="title"
        :options="bookOptions"
        :show-labels="false"
        placeholder="کتاب"
      ></multiselect>
    </no-ssr>
  </div>
</template>
<script>
export default {
  data() {
    return {
      book: null,
      bookOptions: []
    };
  },
  methods: {
    selectBook(value, id) {
      this.$emit("input", value);
    }
  },
  mounted() {
    this.$axios
      .get("books")
      .then(response => {
        this.bookOptions = response.data.books;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>
