<template>
  <b-autocomplete
    v-model="text"
    class="wrap-item w300"
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
    <template slot-scope="props">
      {{ props.option.name }}
      <!-- <span class="is-lowercase">{{ props.option.level ? ` - ${props.option.level}` : '' }}</span>-->
      <span class="is-lowercase"> - [turno]</span>
    </template>
  </b-autocomplete>
</template>

<script lang="ts" src="./Dropdown.component.ts"></script>
