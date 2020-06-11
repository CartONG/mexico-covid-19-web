<template>
  <div>
    <template v-if="state === 'SUCCESS'">
      <SidebarVue />
      <MainVue />
    </template>
  </div>
</template>

<script lang="ts" src="./Dashboard.component.ts"></script>
