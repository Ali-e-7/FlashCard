<template>
  <div>
    <div
      v-if="loading"
      class="h-full w-full bg-gray-100 absolute !bg-opacity-95"
    >
      <v-progress-circular
        class="!absolute !top-[50vh] !right-[50vw]"
        indeterminate
        color="blue"
      />
    </div>
    <nuxt />
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      user: null,
      loading: false,
    };
  },
  mounted() {
    this.checkIsLoggIn();
  },
  methods: {
    ...mapActions({
      getUserInfo: "login/getUserInfo",
    }),
    checkIsLoggIn() {
      this.loading = true;
      this.user = localStorage.getItem("user");

      if (this.user == null) {
        this.$router.push("/login");
      }
      this.loading = false;
    },
  },
};
</script>

<style></style>
