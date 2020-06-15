<template>
  <nav class="breadcrumb has-background-tertiary" aria-label="breadcrumbs">
    <ul>
      <li :class="{ 'is-active': stateSelection.stateId === '' }">
        <a href="#" @click.stop.prevent="selectCountry">Pais</a>
      </li>
      <template v-if="stateSelection.stateId !== ''">
        <li :class="{ 'is-active': municipalitySelection.municipalityId === '' }">
          <a href="#" @click.stop.prevent="selectState">Entidad</a>
        </li>
      </template>
      <template v-if="municipalitySelection.municipalityId !== ''">
        <li :class="{ 'is-active': schoolSelection.schoolId === '' }">
          <a href="#" @click.stop.prevent="selectMunicipality">Municipio</a>
        </li>
      </template>
      <template v-if="schoolSelection.schoolId !== ''">
        <li class="is-active">
          <a href="#" @click.stop.prevent="">Escuela</a>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script lang="ts" src="./Breadcrumb.component.ts"></script>
