<template>
  <div class="!bg-[#d2ebf7] py-3">
    <div class="contaner flex justify-around">
      <h3 class="!text-gray-500">{{ user.firstName }} {{ user.lastName }}</h3>
      <div v-if="$nuxt.$route === 'result'">نتایج مسابقه</div>
      <div v-else>مسابقه</div>
      <nuxt-link to="/login" @click="logOut">خروج</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
    },
  },

  methods: {
    logOut() {
      localStorage.removeItem("user");
    },
  },
};
</script>

<style></style>
