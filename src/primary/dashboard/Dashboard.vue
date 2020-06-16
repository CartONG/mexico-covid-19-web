<template>
  <div class="has-background-secondary">
    <template v-if="state === 'SUCCESS'">
      <SidebarVue />
      <MainVue />
    </template>
  </div>
</template>

<script lang="ts" src="./Dashboard.component.ts"></script>
