<template>
  <b-autocomplete
    v-model="text"
    :data="filteredItems"
    field="name"
    placeholder=""
    icon="magnify"
    clearable
    open-on-focus
    clear-on-select
    @select="selectItem"
  >
    <template slot="empty">No se han encontrado resultados</template>
  </b-autocomplete>
</template>

<script lang="ts" src="./Dropdown.component.ts"></script>
