<template>
  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul class="horizontal-scroll-mobile">
      <li :class="[{ 'is-active': breadcrumbDataSet.country.active }, 'has-text-weight-bold', `is-size-${printable ? '6' : '5'}`]">
        <a href="#" @click.stop.prevent="backToCountry"> {{ breadcrumbDataSet.country.name }}</a>
      </li>
      <li
        v-if="breadcrumbDataSet.state.visible"
        :class="[{ 'is-active': breadcrumbDataSet.state.active }, 'has-text-weight-bold', `is-size-${printable ? '6' : '5'}`]"
      >
        <a href="#" @click.stop.prevent="backToState({ id: breadcrumbDataSet.state.id, name: breadcrumbDataSet.state.name })">
          {{ breadcrumbDataSet.state.name }}
        </a>
      </li>
      <li
        v-if="breadcrumbDataSet.municipality.visible"
        :class="[{ 'is-active': breadcrumbDataSet.municipality.active }, 'has-text-weight-bold', `is-size-${printable ? '6' : '5'}`]"
      >
        <a
          href="#"
          @click.stop.prevent="backToMunicipality({ id: breadcrumbDataSet.municipality.id, name: breadcrumbDataSet.municipality.name })"
        >
          {{ breadcrumbDataSet.municipality.name }}
        </a>
      </li>
      <li v-if="breadcrumbDataSet.school.visible" :class="`is-active has-text-weight-bold is-size-${printable ? '6' : '5'}`">
        <a href="#" @click.stop.prevent="">{{ breadcrumbDataSet.school.name }}</a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" src="./Breadcrumb.component.ts"></script>
