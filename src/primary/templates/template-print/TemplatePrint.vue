<template>
  <div>
    <div class="no-print">
      <b-modal :active="true" full-screen :can-cancel="false">
        <section class="hero is-white is-fullheight">
          <div class="hero-body">
            <div class="container has-text-centered pulse-color-primary">
              <span class="icon is-large">
                <i class="mdi mdi-48px mdi-download"></i>
              </span>
            </div>
          </div>
        </section>
      </b-modal>
    </div>
    <div class="header">
      <nav class="navbar" role="navigation">
        <div class="navbar-brand">
          <div class="navbar-item">
            <img src="/logo.svg" alt="Logotipos de la Secretaría de Educación Pública y de UNICEF" />
          </div>
        </div>
      </nav>
      <div class="has-background-secondary-bis">
        <BreadcrumbVue :navigation="navigation" />
      </div>
    </div>
    <section class="section py-2 px-2">
      <div class="container w16cm">
        <div class="columns">
          <div class="column is-12">
            <h1 class="has-text-primary-bis title is-uppercase is-size-4 has-text-weight-bold">Tablero de Análisis Integral</h1>
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <AttendanceMapVue
              class="h16cm is-direction-column"
              :schools-summaries="schoolSummaryList"
              :school="school"
              :summary="currentSummary"
              :attendanceType="attendanceType"
              :inline="false"
              :printable="true"
              @ready="printer().print()"
            />
          </div>
        </div>
        <div class="columns has-page-break-before"><div class="column is-12"></div></div>
        <div class="columns">
          <div class="column is-12">
            <AdministrativeDivisionIndicatorsVue
              v-if="administrativeDivisionLevel"
              :administrative-division="currentAdministrativeDivision"
              :inline="true"
            />
            <SchoolIndicatorsVue v-else :school="school" :inline="true" />
          </div>
        </div>
        <div class="columns is-desktop">
          <div class="column is-12">
            <AbsenceDetailsVue
              :administrative-division="currentAdministrativeDivision"
              :school="school"
              :administrative-division-level="administrativeDivisionLevel"
              :attendance-type="absenceDetailsAttendanceType"
            />
          </div>
        </div>
        <div class="columns has-page-break-before"><div class="column is-12"></div></div>
        <div class="columns">
          <div class="column is-12">
            <AdministrativeDivisionHistoricVue
              v-if="administrativeDivisionLevel && administrativeDivisionDailyReports.length > 0"
              :administrative-division-daily-reports="administrativeDivisionDailyReports"
              :historic-type="historicType"
              :historic-interval="historicInterval"
              :printable="true"
            />
            <SchoolHistoricVue
              v-if="!administrativeDivisionLevel && schoolDailyReports.length > 0"
              :school-daily-reports="schoolDailyReports"
              :historic-type="historicType"
              :historic-interval="historicInterval"
              :printable="true"
            />
          </div>
        </div>
        <div class="columns has-page-break-before"><div class="column is-12"></div></div>
        <div class="columns">
          <div class="column is-12">
            <AdministrativeDivisionDetailsVue
              v-if="administrativeDivisionLevel"
              :administrative-division="currentAdministrativeDivision"
              :printable="true"
            />
            <SchoolDetailsVue v-else :school="school" :printable="true" />
          </div>
        </div>
        <div v-for="(chunk, index) in currentSummariesChunks" :key="index">
          <div class="columns has-page-break-before"><div class="column is-12"></div></div>
          <div class="columns">
            <div class="column is-12">
              <AttendanceListVue
                :summaries="chunk"
                :navigation="navigation"
                :attendanceType="attendanceType"
                :administrative-level="administrativeLevel"
                :attendance-list-sort-options="attendanceListSortOptions"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" src="./TemplatePrint.component.ts"></script>
