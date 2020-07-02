<template>
  <div class="rate-list has-background-white card">
    <header class="card-header">
      <p class="card-header-title has-text-primary">Porcentaje de {{ selectedRateTypeLabel }} presentes por {{ levelLabel }}</p>
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
            field="studentAttendance.value"
            label="Asistencia"
            sortable
            numeric
          >
            <span :class="`has-text-${props.row.studentAttendance.color}`">
              {{ props.row.studentAttendance.text }}
            </span>
          </b-table-column>
          <b-table-column
            v-else-if="selectedRateType === 'TEACHER_ABSENCE'"
            :class="`w80 has-text-weight-bold${props.row.id === selectedSchoolId ? ' has-background-light' : ''}`"
            field="teacherAttendance.value"
            label="Asistencia"
            sortable
            numeric
          >
            <span :class="`has-text-${props.row.teacherAttendance.color}`">
              {{ props.row.teacherAttendance.text }}
            </span>
          </b-table-column>
          <b-table-column
            v-else
            :class="`w80 has-text-weight-bold${props.row.id === selectedSchoolId ? ' has-background-light' : ''}`"
            field="adminAttendance.value"
            label="Asistencia"
            sortable
            numeric
          >
            <span :class="`has-text-${props.row.adminAttendance.color}`">
              {{ props.row.adminAttendance.text }}
            </span>
          </b-table-column>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script lang="ts" src="./RateList.component.ts"></script>
