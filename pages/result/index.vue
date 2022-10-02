<template>
  <div class="h-[100vh] flex justify-center items-center">
    <div class="w-8/12">
      <BarChart :chartAnswer="chartData" />
    </div>
  </div>
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
