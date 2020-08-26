<template>
  <div>
    <section class="section py-2 px-2">
      <div class="container is-fluid">
        <div class="columns is-hidden-desktop">
          <div class="column is-12">
            <ExportDropdownVue class="shift-bottom" @print="$emit('startprinting')" />
            <InfoModalVue class="ml-5 mr-3" />
          </div>
        </div>
        <div class="columns is-hidden-desktop">
          <div class="column is-12 has-text-primary-bis has-text-weight-bold">
            {{ lastUpdateDate }}
          </div>
        </div>
        <div class="columns">
          <div class="column is-6">
            <h1 class="has-text-primary-bis title is-uppercase is-size-4 has-text-weight-bold">Tablero de Análisis Integral</h1>
          </div>
          <div class="column is-4 has-text-right has-text-primary-bis has-text-weight-bold is-hidden-touch">
            {{ lastUpdateDate }}
          </div>
          <div class="column is-2 has-text-right is-hidden-touch">
            <ExportDropdownVue
              class="shift-bottom"
              :administrative-division-level="administrativeDivisionLevel"
              :administrative-division="currentAdministrativeDivision"
              :school="school"
              @print="$emit('startprinting')"
            />
            <InfoModalVue class="ml-5 mr-3" />
          </div>
        </div>
        <div class="columns is-desktop">
          <div class="column is-10-desktop is-12-tablet">
            <AttendanceMapVue
              class="is-full-height is-direction-column"
              :schools-summaries="schoolSummaryList"
              :school="school"
              :summary="currentSummary"
              :attendanceType="attendanceType"
              :inline="true"
              :printable="false"
              :map-extent="mapExtent"
              @destroy="$emit('savemapextent', $event.extent)"
            />
          </div>
          <div class="column is-2-desktop is-12-tablet">
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
            <AdministrativeDivisionHistoricVue
              v-if="administrativeDivisionLevel && administrativeDivisionDailyReports.length > 0"
              :administrative-division-daily-reports="administrativeDivisionDailyReports"
              :historic-type="historicType"
              :historic-interval="historicInterval"
              :printable="false"
              @changehistorictype="$emit('changehistorictype', $event)"
              @changehistoricinterval="$emit('changehistoricinterval', $event)"
            />
            <SchoolHistoricVue
              v-if="!administrativeDivisionLevel && schoolDailyReports.length > 0"
              :school-daily-reports="schoolDailyReports"
              :historic-type="historicType"
              :historic-interval="historicInterval"
              :printable="false"
              @changehistorictype="$emit('changehistorictype', $event)"
              @changehistoricinterval="$emit('changehistoricinterval', $event)"
            />
          </div>
        </div>
        <div class="columns">
          <div class="column is-12 has-text-right">
            <DetailsInfoModalVue />
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <AdministrativeDivisionDetailsVue
              v-if="administrativeDivisionLevel"
              :administrative-division="currentAdministrativeDivision"
              :printable="false"
            />
            <SchoolDetailsVue v-else :school="school" :printable="false" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" src="./TemplateWeb.component.ts"></script>
