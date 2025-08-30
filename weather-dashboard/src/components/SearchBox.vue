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
import { ref,watch } from 'vue'
import { useDebounce } from '@vueuse/core'


const props = defineProps<{
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'search', value: string): void
}>()

const query = ref('')

const debouncedQuery = useDebounce(query,700);

watch(debouncedQuery,(newVal)=>{
  if(newVal.trim()){
    emit('search', newVal)
  }
})
const onSearch = () => {
  emit('search', query.value)
}
</script>

