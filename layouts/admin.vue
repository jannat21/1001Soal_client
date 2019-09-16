<template>
  <div >
    <Navbar class="mb-5" />
    <div class="container">
      <nuxt />
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/admin/Navbar";

export default {
  middlware:['checkadmin'],
  components: { Navbar }
};
</script>

<style>
* {
  font-family: "Noto Naskh Arabic", tahoma;
}
html {
  font-family: "Noto Naskh Arabic", tahoma;
  direction: rtl;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
