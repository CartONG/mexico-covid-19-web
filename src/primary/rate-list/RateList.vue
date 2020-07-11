<template>
  <div class="rate-list has-background-white card">
    <header class="card-header">
      <h2 class="card-header-title">Porcentaje de {{ selectedRateTypeLabel }} presentes por {{ levelLabel }}</h2>
    </header>
    <div class="card-content">
      <div v-if="summaryDataSets.length === 0" class="has-text-grey px-2 py-2">
        No se han encontrado resultados
      </div>
      <b-table v-else :data="summaryDataSets" :default-sort="['name']" sticky-header hoverable @click="select($event.id)">
        <template slot-scope="props">
          <b-table-column
            field="name"
            :class="[
              {
                'has-text-weight-bold': props.row.id === `${selectedSchoolId}`,
                'has-background-light': props.row.id === `${selectedSchoolId}`,
              },
              'is-clickable is-size-6',
            ]"
            :label="tableLabel"
            header-class="has-text-secondary-bis is-size-5 is-uppercase"
            custom-key="name"
            sortable
          >
            {{ props.row.name }}
          </b-table-column>
          <b-table-column
            v-if="selectedRateType === 'STUDENT_ABSENCE'"
            :class="
              `w150 is-clickable has-text-weight-bold${props.row.id === selectedSchoolId ? ' has-background-light' : ''} has-text-centered`
            "
            field="studentAttendance.value"
            label="Asistencia"
            header-class="has-text-secondary-bis is-size-5 is-uppercase"
            sortable
          >
            <span :class="`has-text-${props.row.studentAttendance.color}`">
              {{ props.row.studentAttendance.text }}
            </span>
          </b-table-column>
          <b-table-column
            v-else-if="selectedRateType === 'TEACHER_ABSENCE'"
            :class="
              `w150 is-clickable has-text-weight-bold${props.row.id === selectedSchoolId ? ' has-background-light' : ''} has-text-centered`
            "
            field="teacherAttendance.value"
            label="Asistencia"
            header-class="has-text-secondary-bis is-size-5 is-uppercase"
            sortable
          >
            <span :class="`has-text-${props.row.teacherAttendance.color}`">
              {{ props.row.teacherAttendance.text }}
            </span>
          </b-table-column>
          <b-table-column
            v-else
            :class="
              `w150 is-clickable has-text-weight-bold${props.row.id === selectedSchoolId ? ' has-background-light' : ''} has-text-centered`
            "
            field="adminAttendance.value"
            label="Asistencia"
            header-class="has-text-secondary-bis is-size-5 is-uppercase"
            sortable
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
