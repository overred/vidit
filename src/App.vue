<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'

const router = useRouter()
router.push({
  hash: '#56'
})

</script>

<template>
  <VApp full-height>
    <VLayout>
      <VAppBar>
        <template #prepend>
          <VIcon class="ml-2" icon="mdi-multimedia"></VIcon>
        </template>
        <template #title>
          <div>
            <div class="text-h6" style="line-height: 1rem;">VIDIT Price</div>
            <div class="text-caption text-medium-emphasis" style="line-height: 1rem;">Video Editor Price Calculator</div>
          </div>
        </template>
      </VAppBar>
      <VMain class="d-flex flex-column justify-start align-center">
        <VContainer class="container px-0 px-sm-5 px-md-7">
          <RouterView />
        </VContainer>
      </VMain>
      <VFooter app>
        <div class="d-flex flex-column align-center" style="width: 100%;">
          <div class="text-caption">

          </div>
          <div class="text-caption text-medium-emphasis my-2">
            {{ new Date().getFullYear() }} — Разработал
            <a href="https://github.com/jkulvich" style="color: inherit;" target="_blank">
              Кулагин Юрий
            </a>
            под лицензией MIT
          </div>
        </div>
      </VFooter>
    </VLayout>
  </VApp>
</template>

<style lang="scss" scoped>
.container {
  max-width: 700px;
}
</style>
