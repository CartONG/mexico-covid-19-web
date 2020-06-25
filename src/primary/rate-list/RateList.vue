<template>
  <div class="rate-list has-background-white card">
    <header class="card-header">
      <p class="card-header-title has-text-primary">Porcentaje de {{ selectedRateTypeLabel }} ausentes por {{ levelLabel }}</p>
    </header>
    <div class="card-content px-0 py-0">
      <div v-if="summaryDataSets.length === 0" class="has-text-grey px-2 py-2">
        No se han encontrado resultados
      </div>
      <table class="table is-fullwidth has-no-background">
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
            <td class="w80">
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
    </div>
  </div>
</template>

<script lang="ts" src="./RateList.component.ts"></script>
