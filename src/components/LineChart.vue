<script setup lang="ts">
import { darkTheme } from "@/assets/chart-theme/dark.ts";
import { lightTheme } from "@/assets/chart-theme/light.ts";
import type { CurrencyResponseData } from "@/types";

import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  MarkLineComponent,
  ToolboxComponent
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { EChartsOption } from 'echarts';

import {ref, provide, defineProps, watchEffect} from 'vue';

// define props
const { isLightTheme = false, srcData } = defineProps<{
  isLightTheme: boolean;
  srcData: CurrencyResponseData | undefined;
}>()

// register chart components
use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  MarkLineComponent,
  ToolboxComponent
]);

// set theme
provide(THEME_KEY, isLightTheme ? lightTheme : darkTheme);

const isDataLoaded = ref(false);
const option = ref<EChartsOption>({
  series: [],

  // grid
  grid: {
    left: '3%',
    right: '10%',
    bottom: '7%',
    top: '15%',
    containLabel: true
  },

  // toolbox
  toolbox: {
    show: true,
    feature: {
      saveAsImage: {}
    }
  },

  // tooltip
  tooltip: {
    show: true,
    trigger: 'axis',
  },

  // set xy axixs
  xAxis: {
    name: '时间',
    nameLocation: 'middle',
    nameGap: 30,
    type: 'time',
    boundaryGap:false,
  },
  yAxis: {
    name: '价格',
    nameLocation: 'end',
    nameGap: 15,
    min: function (value: { min: number }) {
      return value.min - 10;
    },
    type: 'value',
  },

  // set legend
  legend: {
    type: 'plain',
    show: true,
    left: 'middle',
    // right: 25,
    top: '5%',
  },
});

watchEffect(() => {
  // update chart data
  if (srcData && srcData.message === 'success') {
    isDataLoaded.value = true;

    // iterate over the data and update the chart
    srcData.data.forEach((currency) => {
      // Check if "price_sell" exists in the series
      const hasPriceSell = currency.series.some(item => "price_sell" in item);

      // Check if "price_buy" exists in the series
      const hasPriceBuy = currency.series.some(item => "price_buy" in item);

      // Extract data for plotting
      if (hasPriceSell) {
        option.value.series?.push({
          name: currency.currencyCNName + ' 卖出价',
          type: 'line',
          data: currency.series.map(item => [item.timestamp, item.price_sell]),
          // Add a mark line for the average sell price if there is only one currency
          markLine: srcData.data.length === 1? {
            symbol: 'none',
            data: [{ type: 'average', name: '平均卖出价' }]
          } : undefined,
          smooth:true,
        });
      }
      if (hasPriceBuy) {
        option.value.series?.push({
          name: currency.currencyCNName + ' 买入价',
          type: 'line',
          data: currency.series.map(item => [item.timestamp, item.price_buy]),
          // Add a mark line for the average buy price if there is only one currency
          markLine: srcData.data.length === 1? {
            symbol: 'none',
            data: [{ type: 'average', name: '平均买入价' }]
          } : undefined,
          smooth:true,
        });
      }
    });

    // set title
    option.value.title = {
      text: srcData.data.length > 1? '货币汇率走势图': srcData.data[0].currencyENName + '-CNY 汇率走势图',
      left: '3%',
      top: '3%',
      textStyle: {
        fontFamily: 'Arial',
      }
    };
  }
});
</script>

<template>
  <div v-if="isDataLoaded">
    <v-chart class="chart" :option="option" :theme="darkTheme" autoresize />
  </div>
  <div v-else class="flex flex-col justify-center items-center h-screen">
    <div class="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
    <div class="mt-2 text-gray-700 text-lg">Loading data...</div>
  </div>
</template>

<style scoped>
.chart {
  height: 100vh;
}
</style>