<template>
  <nav class="breadcrumb has-background-tertiary" aria-label="breadcrumbs">
    <ul>
      <li :class="{ 'is-active': navigation.stateId === '' }">
        <a href="#" @click.stop.prevent="selectCountry">Pais</a>
      </li>
      <template v-if="navigation.stateId !== ''">
        <li :class="{ 'is-active': navigation.municipalityId === '' }">
          <a href="#" @click.stop.prevent="selectState(navigation.stateId)">Entidad</a>
        </li>
      </template>
      <template v-if="navigation.municipalityId !== ''">
        <li :class="{ 'is-active': navigation.schoolId === '' }">
          <a href="#" @click.stop.prevent="selectMunicipality(navigation.municipalityId)">Municipio</a>
        </li>
      </template>
      <template v-if="navigation.schoolId !== ''">
        <li class="is-active">
          <a href="#" @click.stop.prevent="">Escuela</a>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script lang="ts" src="./Breadcrumb.component.ts"></script>
