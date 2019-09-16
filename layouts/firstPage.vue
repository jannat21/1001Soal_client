<template>
  <div style="direction:rtl;">
    <Navbar class="mb-5" />
    <LoginForm />

    <nuxt />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import LoginForm from "@/components/LoginForm";

export default {
  components: { Navbar, LoginForm }
};
</script>
