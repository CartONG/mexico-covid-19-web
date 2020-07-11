<template>
  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li :class="[{ 'is-active': navigation.stateId === '' }, 'has-text-weight-bold', 'is-size-5']">
        <a href="#" @click.stop.prevent="selectCountry">MÉXICO</a>
      </li>
      <template v-if="navigation.stateId !== ''">
        <li :class="[{ 'is-active': navigation.municipalityId === '' }, 'has-text-weight-bold', 'is-size-5']">
          <a href="#" @click.stop.prevent="selectState(navigation.stateId)">{{ navigation.stateName }}</a>
        </li>
      </template>
      <template v-if="navigation.municipalityId !== ''">
        <li :class="[{ 'is-active': navigation.schoolId === '' }, 'has-text-weight-bold', 'is-size-5']">
          <a href="#" @click.stop.prevent="selectMunicipality(navigation.municipalityId)">{{ navigation.municipalityName }}</a>
        </li>
      </template>
      <template v-if="navigation.schoolId !== ''">
        <li class="is-active has-text-weight-bold is-size-5">
          <a href="#" @click.stop.prevent="">{{ navigation.schoolName }}</a>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script lang="ts" src="./Breadcrumb.component.ts"></script>
