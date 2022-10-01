<template>
  <v-app>
    <div class="w-8/12 m-auto">
      <BarChart :chartAnswer="chartData" />
    </div>
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
      chartData: {
        labels: [],
        datasets: [{ data: [] }],
      },
    };
  },
  mounted() {
    this.getResultAsnwers();
  },
  methods: {
    ...mapActions({
      getResult: "cards/getResult",
    }),
    async getResultAsnwers() {
      await this.getResult().then((respone) => {
        this.result = respone.data;
        this.chartData.labels = Object.keys(this.result);
        this.chartData.datasets[0].data = Object.values(this.result);
      });
    },
  },
};
</script>

<style></style>
