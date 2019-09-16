<template>
  <div style="direction:rtl;">
    <teacher-navbar />
    <nuxt />
  </div>
</template>

<script>
import teacherNavbar from "@/components/teacher/teacherNavbar.vue";
export default {
  components: {
    teacherNavbar
  },
  middleware: "auth"
};
</script>


<style scoped>
* {
  font-family: "Noto Naskh Arabic", tahoma;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
