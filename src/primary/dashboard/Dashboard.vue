<template>
  <section class="section">
    <div class="container is-fluid">
      <template v-if="state === 'SUCCESS'">
        <div class="columns">
          <div class="column is-2">
            <DropdownVue />
          </div>
        </div>
        <div class="columns">
          <div class="column is-9">
            <ChoroplethMapVue />
          </div>
          <div class="column is-3"></div>
        </div>
      </template>
    </div>
  </section>
</template>

<script lang="ts" src="./Dashboard.component.ts"></script>
