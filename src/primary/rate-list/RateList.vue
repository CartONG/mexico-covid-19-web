<template>
  <div class="rate-list has-background-white card">
    <header class="card-header">
      <p class="card-header-title has-text-primary">Porcentaje de {{ selectedRateTypeLabel }} ausentes por {{ levelLabel }}</p>
    </header>
    <div class="card-content">
      <div v-if="summaryDataSets.length === 0" class="has-text-grey px-2 py-2">
        No se han encontrado resultados
      </div>
      <b-table v-else :data="summaryDataSets" :default-sort="['name', 'asc']">
        <template slot-scope="props">
          <b-table-column
            field="name"
            :class="[
              {
                'has-text-weight-bold': props.row.id === `${selectedSchoolId}`,
                'has-background-light': props.row.id === `${selectedSchoolId}`,
              },
            ]"
            :label="levelLabel"
            custom-key="name"
            sortable
          >
            {{ props.row.name }}
          </b-table-column>
          <b-table-column
            v-if="selectedRateType === 'STUDENT_ABSENCE'"
            :class="`w80 has-text-weight-bold${props.row.id === selectedSchoolId ? ' has-background-light' : ''}`"
            field="studentAbsenceRate.value"
            label="Inasistencia"
            sortable
            numeric
          >
            <span :class="`has-text-${props.row.studentAbsenceRate.color}`">
              {{ props.row.studentAbsenceRate.text }}
            </span>
          </b-table-column>
          <b-table-column
            v-else-if="selectedRateType === 'TEACHER_ABSENCE'"
            :class="`w80 has-text-weight-bold${props.row.id === selectedSchoolId ? ' has-background-light' : ''}`"
            field="teacherAbsenceRate.value"
            label="Inasistencia"
            sortable
            numeric
          >
            <span :class="`has-text-${props.row.teacherAbsenceRate.color}`">
              {{ props.row.teacherAbsenceRate.text }}
            </span>
          </b-table-column>
          <b-table-column
            v-else
            :class="`w80 has-text-weight-bold${props.row.id === selectedSchoolId ? ' has-background-light' : ''}`"
            field="adminAbsenceRate.value"
            label="Inasistencia"
            sortable
            numeric
          >
            <span :class="`has-text-${props.row.adminAbsenceRate.color}`">
              {{ props.row.adminAbsenceRate.text }}
            </span>
          </b-table-column>
        </template>
      </b-table>
      <!--
      <table class="table is-fullwidth has-no-background">
        <thead>
          <tr>
            <th>Alumnos</th>
            <th>Asistencia</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="summaryDataSet in summaryDataSets"
            :key="summaryDataSet.id"
            :class="[
              {
                'has-text-weight-bold': summaryDataSet.id === `${selectedSchoolId}`,
                'has-background-light': summaryDataSet.id === `${selectedSchoolId}`,
              },
            ]"
          >
            <td>{{ summaryDataSet.name }}</td>
            <td class="w80 has-text-weight-bold">
              <template v-if="selectedRateType === 'STUDENT_ABSENCE'">
                <span :class="`has-text-${summaryDataSet.studentAbsenceRate.percentageColor}`">{{
                  summaryDataSet.studentAbsenceRate.percentage
                }}</span>
              </template>
              <template v-if="selectedRateType === 'TEACHER_ABSENCE'">
                <span :class="`has-text-${summaryDataSet.teacherAbsenceRate.percentageColor}`">{{
                  summaryDataSet.teacherAbsenceRate.percentage
                }}</span>
              </template>
              <template v-if="selectedRateType === 'PERSONAL_ABSENCE'">
                <span :class="`has-text-${summaryDataSet.adminAbsenceRate.percentageColor}`">{{
                  summaryDataSet.adminAbsenceRate.percentage
                }}</span>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
      -->
    </div>
  </div>
</template>

<script lang="ts" src="./RateList.component.ts"></script>
