<template>
  <div>
    <div class="header is-fixed-top is-full-width">
      <nav class="navbar" role="navigation">
        <div class="navbar-brand">
          <div class="navbar-item">
            <img src="/logo.svg" alt="Logotipos de la Secretaría de Educación Pública y de UNICEF" />
          </div>
        </div>
        <div class="navbar-menu">
          <div class="navbar-end">
            <div class="navbar-item">
              <DropdownVue :items="currentSummaryList" />
            </div>
          </div>
        </div>
      </nav>
      <div class="has-background-secondary-bis">
        <BreadcrumbVue :navigation="navigation" />
      </div>
    </div>
    <section class="section py-2 px-2">
      <div class="container pt-6 is-fluid">
        <div class="columns">
          <div class="column is-10">
            <h1 class="has-text-primary-bis title is-uppercase is-size-4 has-text-weight-bold">Tablero de Análisis Integral</h1>
          </div>
          <div class="column is-2 has-text-right">
            <ExportDropdownVue class="shift-bottom" @print="$emit('startprinting')" />
            <InfoModalVue class="ml-5 mr-3" />
          </div>
        </div>
        <div class="columns">
          <div class="column is-10">
            <AttendanceMapVue
              class="is-full-height is-direction-column"
              :schools-summaries="schoolSummaryList"
              :school="school"
              :summary="currentSummary"
              :attendanceType="attendanceType"
              :inline="true"
              :printable="false"
            />
          </div>
          <div class="column is-2">
            <AdministrativeDivisionIndicatorsVue
              v-if="administrativeDivisionLevel"
              :administrative-division="currentAdministrativeDivision"
              :inline="false"
            />
            <SchoolIndicatorsVue v-else :school="school" />
          </div>
        </div>
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <AttendanceListVue
              class="tile is-child"
              :summaries="currentSummaryList"
              :navigation="navigation"
              :attendanceType="attendanceType"
              :administrative-level="administrativeLevel"
              :attendance-list-sort-options="attendanceListSortOptions"
              :sticky-header="true"
              @sort="$emit('sortattendancelist', $event)"
            />
          </div>
          <div class="tile is-parent is-vertical">
            <AbsenceDetailsVue
              class="tile is-child"
              :administrative-division="currentAdministrativeDivision"
              :school="school"
              :administrative-division-level="administrativeDivisionLevel"
              :attendance-type="absenceDetailsAttendanceType"
              @change="$emit('changeabsenceattendance', $event)"
            />
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <HistoricVue :history-items="currentHistoryItems" :printable="false"></HistoricVue>
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <AdministrativeDivisionDetailsVue v-if="administrativeDivisionLevel" :administrative-division="currentAdministrativeDivision" />
            <SchoolDetailsVue v-else :school="school" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" src="./TemplateWeb.component.ts"></script>
