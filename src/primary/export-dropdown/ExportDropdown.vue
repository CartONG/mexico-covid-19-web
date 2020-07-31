<template>
  <b-dropdown aria-role="list" position="is-bottom-left">
    <a href="#" @click.prevent="" role="button" slot="trigger">
      <span class="icon has-text-primary">
        <i class="mdi mdi-24px mdi-download"></i>
      </span>
    </a>
    <b-dropdown-item aria-role="listitem" @click="$emit('print')">Descargar en PDF</b-dropdown-item>
  </b-dropdown>
</template>

<script lang="ts" src="./ExportDropdown.component.ts"></script>
