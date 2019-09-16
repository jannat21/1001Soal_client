<template>
  <div style="direction:rtl;">
    <manager-navbar />
    <nuxt />
  </div>
</template>

<script>
import managerNavbar from "@/components/manager/managerNavbar.vue";
export default {
  components: {
    managerNavbar
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
