<template>
  <div div class="h-[100vh]" v-if="data">
    <!---Loading--->
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
    <!---Question--->
    <div class="!h-[50vh] !bg-blue-900 rounded-bl-[35rem] rounded-br-[35rem]">
      <div class="h-full flex flex-col justify-center items-center">
        <div
          class="question w-4/12 p-8 border border-dashed border-white rounded-3xl"
        >
          <h2 class="text-white text-center">
            <h3>{{ data.question }}</h3>
          </h2>
        </div>
        <div class="pagination w-8/12 h-30 my-5 mx-auto">
          <v-pagination
            v-model="pagination.page"
            :length="pagination.pages"
            circle
            @input="next"
          />
        </div>
        <div v-if="data" class="w-4/12 h-30 my-5">
          <p v-if="data.state == 1" class="text-center text-green-500">
            درست حدس زدید
          </p>
          <p v-else-if="data.state == 2" class="text-center text-red-500">
            اشتباه حدس زدید
          </p>
          <p v-else class="text-center text-white">در انتظار پاسخ شما</p>
        </div>
      </div>
    </div>
    <!---Answer--->
    <div class="pt-5">
      <div class="w-4/12 mx-auto">
        <div v-for="city in data.answers" :key="city.id" class="my-6">
          <v-btn
            block
            elevation="0"
            class="!py-7 answer !bg-blue-900 !text-white"
            @click="selectAnswer(data, city)"
          >
            <h3 class="text-lg">
              {{ city.title }}
            </h3>
          </v-btn>
        </div>
      </div>
    </div>

    <div
      class="w-full bg-blue-900 fixed bottom-0 rounded-tl-3xl rounded-tr-3xl"
    >
      <div class="conatiner !h-30 my-5">
        <v-row class="w-6/12 justify-around !mx-auto">
          <v-col cols="2"
            ><v-btn
              block
              outlined
              class="!text-white mx-5 rounded-2xl"
              @click="next(pagination.page + 1)"
              >بعدی</v-btn
            ></v-col
          >
          <v-col cols="2"
            ><v-btn
              block
              outlined
              class="!text-white mx-5 rounded-2xl"
              @click="endGame"
              >پایان</v-btn
            ></v-col
          >
          <v-col cols="2"
            ><v-btn
              block
              outlined
              class="!text-white mx-5"
              @click="next(pagination.page - 1)"
              >قبلی</v-btn
            ></v-col
          >
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import http from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      user: null,
      data: null,
      loading: false,
      answer: null,
      pagination: {
        page: 1,
        pages: 10,
        perPage: 5,
        visible: 5,
      },
      _page_limit: 10,
      currentPage: 0,
      totalModel: null,
    };
  },

  mounted() {
    this.getData(1, 1, 1);
  },

  methods: {
    ...mapActions({
      getQuestions: "cards/getQuestions",
      setAnswers: "cards/setAnswers",
      sendTotalGame: "cards/sendTotalGame",
      getResult: "cards/getResult",
      editTotal: "cards/editTotal",
    }),
    getData(page, end, increase) {
      this.loading = true;
      this.getQuestions({ page: page, end: end }).then((response) => {
        this.currentPage += increase;
        this.data = response.data[0];
        this.loading = false;
        this.getResult().then((response) => {
          this.totalModel = response.data;
        });
      });
    },
    selectAnswer(item, answer) {
      if (!item.disable) {
        const state = item.correctAnswer.id === answer.id ? 1 : 2;
        if (state == 1) {
          this.totalModel.correct += 1;
          this.totalModel.notAnswer -= 1;
        } else {
          this.totalModel.wrong += 1;
          this.totalModel.notAnswer -= 1;
        }
        this.editTotal(this.totalModel).then((response) => {
          this.totalModel = response.data;
        });
        console.log(
          "🚀 ~ file: index.vue ~ line 120 ~ this.editTotal ~ this.totalModel",
          this.totalModel
        );
        this.setAnswers({
          ...item,
          userAnswer: answer,
          disable: true,
          state: state,
        }).then((response) => {
          this.data = response.data;
        });
      }
    },
    next(page) {
      this.getData(page, 1, 1);
    },
    endGame() {
      this.sendTotalGame(this.totalModel).then(() => {
        this.$router.push("/result");
      });
    },
  },
};
</script>

<style scoped>
.answer {
  border-radius: 3rem;
}
</style>
