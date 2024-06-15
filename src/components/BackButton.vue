<template>
  <div class="navigation mb-4">
    <button class="back-button text-primary hover:underline" @click="goBack">Back</button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}
</script>
