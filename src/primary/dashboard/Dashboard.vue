<template>
  <div class="app has-background-secondary">
    <template v-if="state === 'SUCCESS'">
      <div class="header">
        <nav class="navbar" role="navigation">
          <div class="navbar-brand">
            <div class="navbar-item">
              <img src="/logo.svg" alt="Logotipos de la Secretaría de Educación Pública y de UNICEF" />
            </div>
          </div>
          <div class="navbar-menu">
            <div class="navbar-end">
              <div class="navbar-item">
                <DropdownVue />
              </div>
            </div>
          </div>
        </nav>
        <div class="has-background-secondary-bis is-fixed-top">
          <BreadcrumbVue />
        </div>
      </div>
      <section class="section py-2 px-2">
        <div class="container is-fluid">
          <div class="columns">
            <div class="column is-10">
              <h1 class="has-text-primary-bis title is-uppercase is-size-4 has-text-weight-bold">Tablero de Análisis Integral</h1>
            </div>
            <div class="column is-2 has-text-right">
              <InfoModalVue />
            </div>
          </div>
          <div class="columns">
            <div class="column is-10">
              <ChoroplethMapVue />
            </div>
            <div class="column is-2">
              <AdministrativeDivisionIndicatorsVue v-if="administrativeDivision" />
              <SchoolIndicatorsVue v-else />
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
