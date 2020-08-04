<template>
  <div class="app has-background-secondary">
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
        @startprinting="isPrinting = true"
        @sortattendancelist="attendanceListSortOptions = $event"
        @changeabsenceattendance="absenceDetailsAttendanceType = $event"
        @changehistorictype="historicType = $event"
        @changehistoricinterval="historicInterval = $event"
      ></TemplateWebVue>
    </template>
  </div>
</template>

<script lang="ts" src="./Dashboard.component.ts"></script>
