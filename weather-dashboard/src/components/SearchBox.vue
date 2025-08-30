<template>
  <div class="w-full max-w-xl mx-auto">
    <aInputSearch
        v-model:value="query"
        :placeholder="placeholder"
        enter-button="Search"
        allow-clear
        @search="onSearch"
        size="large"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'search', value: string): void
}>()

const query = ref('')

const onSearch = () => {
  emit('search', query.value)
}
</script>

