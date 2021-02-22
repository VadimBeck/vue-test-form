<template lang="pug">
  #app
    register-form
    
</template>

<script>
import registerForm from "./components/registerForm.vue";

export default {
  name: "App",
  components: {
    registerForm,
  },
};
</script>

<style lang="scss" src="./styles/app.scss"></style>
