<!--
 * 测试模板
 * @author: snailuu
 * @since: 2024-10-11
 * test.vue
-->
<template>
  <div class="test-container">
    <h1>页面</h1>
  </div>
</template>

<script setup lang="ts">
import { useTestStore } from '@/store/module/test.ts';
import { storeToRefs } from 'pinia';
const testStore = useTestStore();
const { list, index } = storeToRefs(testStore);
const { addList } = testStore;

console.log(list.value, index.value);
addList(45);
console.log(list.value, index.value);
</script>

<style scoped lang="less"></style>
