<template>
  <div class="app dashboard has-background-secondary">
    <div v-if="componentState === 'PENDING'">
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
    <template v-if="componentState === 'SUCCESS'">
      <div class="header is-fixed-top is-full-width">
        <nav class="navbar has-shadow" role="navigation">
          <div class="navbar-brand">
            <div class="navbar-item">
              <img src="/logo.svg" alt="Logotipos de la Secretaría de Educación Pública y de UNICEF" />
            </div>
          </div>
          <div v-if="!isPrinting" class="navbar-menu">
            <div class="navbar-end">
              <div class="navbar-item">
                <DropdownVue :items="currentSummaryList" :administrative-level="administrativeLevel" />
              </div>
            </div>
          </div>
        </nav>
        <div v-if="!isPrinting" class="is-hidden-desktop has-background-white px-1 py-1 has-text-centered">
          <DropdownVue :items="currentSummaryList" :administrative-level="administrativeLevel" />
        </div>
        <div v-if="!isPrinting" class="has-background-secondary-bis">
          <BreadcrumbVue :navigation="navigation" />
        </div>
      </div>
      <TemplatePrintVue
        v-if="isPrinting"
        :currentSummaryList="currentSummaryList"
        :stateSummaryList="stateSummaryList"
        :municipalitySummaryList="municipalitySummaryList"
        :schoolSummaryList="schoolSummaryList"
        :school="school"
        :school-daily-reports="schoolDailyReports"
        :currentSummary="currentSummary"
        :administrativeDivisionLevel="administrativeDivisionLevel"
        :currentAdministrativeDivision="administrativeDivision"
        :administrative-division-daily-reports="administrativeDivisionDailyReports"
        :navigation="navigation"
        :attendance-type="attendanceType"
        :administrative-level="administrativeLevel"
        :attendance-list-sort-options="attendanceListSortOptions"
        :absence-details-attendance-type="absenceDetailsAttendanceType"
        :historic-type="historicType"
        :historic-interval="historicInterval"
        :map-extent="mapExtent"
        @endprinting="isPrinting = false"
      ></TemplatePrintVue>
      <TemplateWebVue
        v-else
        :currentSummaryList="currentSummaryList"
        :stateSummaryList="stateSummaryList"
        :municipalitySummaryList="municipalitySummaryList"
        :schoolSummaryList="schoolSummaryList"
        :school="school"
        :school-daily-reports="schoolDailyReports"
        :currentSummary="currentSummary"
        :administrativeDivisionLevel="administrativeDivisionLevel"
        :currentAdministrativeDivision="administrativeDivision"
        :administrative-division-daily-reports="administrativeDivisionDailyReports"
        :navigation="navigation"
        :attendance-type="attendanceType"
        :administrative-level="administrativeLevel"
        :attendance-list-sort-options="attendanceListSortOptions"
        :absence-details-attendance-type="absenceDetailsAttendanceType"
        :historic-type="historicType"
        :historic-interval="historicInterval"
        :map-extent="mapExtent"
        @startprinting="isPrinting = true"
        @sortattendancelist="attendanceListSortOptions = $event"
        @changeabsenceattendance="absenceDetailsAttendanceType = $event"
        @changehistorictype="historicType = $event"
        @changehistoricinterval="historicInterval = $event"
        @savemapextent="mapExtent = $event"
      ></TemplateWebVue>
    </template>
  </div>
</template>

<script lang="ts" src="./Dashboard.component.ts"></script>
