<template>
  <v-app>
    <BarChart :charData="chartAnswer"/>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import BarChart from "../../components/barChart.vue";
export default {
  components: { BarChart },
  data() {
    return {
      result: null,
      chartAnswer: {
          labels:null,
          datasets: [ { data: null } ]
        },
    };
  },
  mounted() {
    this.getResultAsnwers()
  },
  methods: {
    ...mapActions({
      getResult: "cards/getResult",
    }),
    getResultAsnwers() {
      this.getResult().then((respone) => {
        this.result = respone.data;
        this.chartAnswer.labels = Object.keys(this.result)
        this.chartAnswer.datasets.data = Object.value(this.result)
        
      });
    },
  },
};
</script>

<style></style>
