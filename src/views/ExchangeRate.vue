<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { lobeChat } from '@lobehub/chat-plugin-sdk/es/client';
import type { CurrencyResponseData } from "@/types";
import LineChart from "@/components/LineChart.vue";

// init currencyData
const currencyData = ref<CurrencyResponseData>();

onMounted(async () => {
  // Fetch plugin message from LobeChat
  lobeChat.getPluginMessage().then((e: CurrencyResponseData) => {
    currencyData.value = e;
  });
});
</script>

<template>
<LineChart :is-light-theme="false" :src-data="currencyData" />
</template>

<style scoped>

</style>