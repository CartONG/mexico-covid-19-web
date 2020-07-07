<template>
  <div class="has-background-secondary">
    <template v-if="state === 'SUCCESS'">
      <section class="section py-2 px-2">
        <div class="container is-fluid">
          <h1 class="has-text-primary main-title">Tablero de Análisis Integral</h1>
          <div class="columns has-background-tertiary no-print">
            <div class="column is-10 py-0">
              <BreadcrumbVue />
            </div>
            <div class="column is-2">
              <DropdownVue />
            </div>
          </div>
          <div class="columns">
            <div class="column is-10">
              <ChoroplethMapVue />
            </div>
            <div class="column is-2">
              <IndicatorsVue />
              <!--
              <AdministrativeDivisionIndicatorsVue />
              <SchoolIndicatorsVue />
              -->
            </div>
          </div>
          <div class="columns is-desktop">
            <div class="column">
              <RateListVue />
            </div>
            <div class="column">
              <AbsenceReasonsDetailsVue></AbsenceReasonsDetailsVue>
            </div>
          </div>
          <div class="columns">
            <div class="column is-12">
              <HistoricVue></HistoricVue>
            </div>
          </div>
          <div class="columns">
            <div class="column is-12">
              <AdministrativeDivisionDetailsVue v-if="administrativeDivision" />
              <SchoolDetailsVue v-else />
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script lang="ts" src="./Dashboard.component.ts"></script>
