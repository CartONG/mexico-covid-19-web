<template>
  <nav class="breadcrumb has-background-tertiary" aria-label="breadcrumbs">
    <ul>
      <li :class="{ 'is-active': selection === null }"><a href="#" @click.stop.prevent="select('country')">Pais</a></li>
      <template v-if="selection && selection.stateId !== ''">
        <li :class="{ 'is-active': selection.municipalityId === '' }"><a href="#" @click.stop.prevent="select('state')">Entidad</a></li>
      </template>
      <template v-if="selection && selection.municipalityId !== ''">
        <li :class="{ 'is-active': selection.schoolId === '' }"><a href="#" @click.stop.prevent="select('municipality')">Municipio</a></li>
      </template>
      <template v-if="selection && selection.schoolId !== ''">
        <li class="is-active"><a href="#" @click.stop.prevent="">Escuela</a></li>
      </template>
    </ul>
  </nav>
</template>

<script lang="ts" src="./Breadcrumb.component.ts"></script>
