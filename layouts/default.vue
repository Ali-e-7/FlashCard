<template>
  <div>
    <div
      v-if="loading"
      class="h-full w-full bg-[#d2ebf7] absolute !bg-opacity-95"
    >
      <v-progress-circular
        class="!absolute !top-[50vh] !right-[50vw]"
        indeterminate
        color="blue"
      />
    </div>
    <Header
      class="w-full rounded-bl-3xl rounded-br-3xl fixed top-0"
      v-if="$nuxt.$route.name !== 'login' && user"
      :user="user"
    ></Header>
    <nuxt />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Header from "../components/header.vue";
export default {
  data() {
    return {
      user: null,
      loading: false,
    };
  },
  computed: {
    Header,
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
      this.user = JSON.parse(localStorage.getItem("user"));
      if (!this.user) {
        this.$router.push("/login");
      }
      this.loading = false;
    },
  },
};
</script>

<style></style>
