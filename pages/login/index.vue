<template>
  <div class="bg-gray-800 h-[100vh] flex justify-center items-center">
    <client-only>
      <div
        class="w-full md:w-6/12 lg:w-4/12 bg-white text-blue-900 rounded-md p-3"
      >
        <h1 class="text-xl font-bold">ثبت نام کاربر</h1>
        <v-divider class="my-5" />
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="model.firstName"
            placeholder="نام"
            outlined
            :rules="nameRules"
            dense
          />
          <v-text-field
            v-model="model.lastName"
            placeholder="نام خانوادگی"
            outlined
            :rules="familyRules"
            dense
          />
          <v-text-field
            v-model="model.email"
            dense
            placeholder="ایمیل"
            outlined
          />
        </v-form>

        <v-divider class="mb-5" />
        <div class="flex justify-between">
          <v-btn
            class="mb-2 !bg-gray-100 !text-gray-700 w-3/12"
            color="blue"
            outlined
            @click="clear"
            >پاک سازی فرم</v-btn
          >
          <v-btn
            class="mb-2 !bg-green-100 !text-green-700 w-3/12"
            color="blue"
            outlined
            @click="startGame"
            >شروع</v-btn
          >
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      valid: true,
      model: {
        firstName: "",
        lastName: "",
        email: "",
      },
      nameRules: [
        (v) => !!v || "نام خود را وارد کنید",
        (v) => (v && v.length <= 20) || "Name must be less than 10 characters",
      ],
      familyRules: [
        (v) => !!v || "نام خانوادگی خود را وارد کنید",
        (v) => (v && v.length <= 20) || "Name must be less than 10 characters",
      ],
      // emailRules: [
      //   (v) => !!v || "E-mail is required",
      //   (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      // ],
    };
  },

  methods: {
    ...mapActions({
      logIn: "login/logIn",
    }),
    startGame() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.logIn(this.model)
          .then(() => {
            localStorage.removeItem("user");
            localStorage.setItem("user", JSON.stringify(this.model));
            this.$router.push("/");
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    clear() {
      Object.keys(this.model).map((el) => {
        this.model[el] = "";
      });
    },
  },
};
</script>

<style></style>
