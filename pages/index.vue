<template>
  <div div class="bg-gray-800 h-[100vh] flex justify-center items-center">
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
    <div class="w-full md:w-6/12 lg:w-4/12 p-2">

    <VCard v-if="data" >
      <div
        class="question !flex !justify-center !items-center border border-dashed border-2 border-purple-500 !h-30 py-5 mb-5 rounded-md"
      >
        <h3>{{ data.question }}</h3>
      </div>
      <v-row class="flex justify-around !m-0">
        <v-col
          cols="5"
          v-for="city in data.answers"
          :key="city.id"
          class="answer"
        >
          <v-btn block  @click="selectAnswer(data, city)">
            {{ city.title }}
          </v-btn>
        </v-col>
      </v-row>

    </VCard>
    <VCard class=" mt-5">
      <div class="pagination w-8/12 h-30 my-5 mx-auto">
        <v-pagination
          v-model="pagination.page"
          :length="pagination.pages"
          circle
          @input="next"
        />
      </div>
      <div v-if="data" class="w-4/12 h-30 my-5 mx-auto">
        <p v-if="data.state == 1">درست حدس زدید</p>
        <p v-else-if="data.state == 2">اشتباه حدس زدید</p>
        <p v-else>در انتظار پاسخ شما</p>
      </div>
    </VCard>
    <div class="button !h-30 my-5">
      <v-row class="justify-around">
        <v-col cols="3"><v-btn block @click="next(pagination.page+1)">بعدی</v-btn></v-col>
        <v-col cols="3"><v-btn block @click="end">پایان</v-btn></v-col>
        <v-col cols="3"><v-btn block @click="next(pagination.page-1)">قبلی</v-btn></v-col>
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
      totalModel: {
        correct: 0,
        wrong: 0,
        notAnswer:0,
        totalAnswer: 10,
      },
    };
  },

  mounted() {
    this.getData(1, 1, 1);
  },

  methods: {
    ...mapActions({
      getQuestions: "cards/getQuestions",
      setAnswers: "cards/setAnswers",
      totalGame: "cards/totalGame",
    }),
    getData(page, end, increase) {
      this.loading = true;
      this.getQuestions({ page: page, end: end }).then((response) => {
        this.currentPage += increase;
        this.data = response.data[0];
        this.loading = false;
      });
    },
    selectAnswer(item, answer) {
      if (!item.disable) {
        const state = item.correctAnswer.id === answer.id ? 1 : 2;
        if (state == 1) {
          this.totalModel.correct += 1;
          this.totalModel.totalAnswer -= 1;
        } else {
          this.totalModel.wrong += 1;
          this.totalModel.totalAnswer -= 1;
        }
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
      this.totalGame(this.totalModel).then(()=> {
        this.$router.push('/result')
      })

    }
  },
};
</script>

<style></style>
