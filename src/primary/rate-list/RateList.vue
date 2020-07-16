<template>
  <div class="rate-list has-background-white card">
    <header class="card-header">
      <h2 class="card-header-title">Porcentaje de {{ selectedRateTypeLabel }} presentes por {{ levelLabel }}</h2>
    </header>
    <div class="card-content px-0 py-0">
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
            header-class="has-text-secondary-bis is-size-6 is-uppercase"
            custom-key="name"
            sortable
          >
            {{ props.row.name }}
          </b-table-column>
          <b-table-column
            v-if="selectedRateType === 'STUDENT'"
            :class="
              `w150 is-clickable has-text-weight-bold${props.row.id === selectedSchoolId ? ' has-background-light' : ''} has-text-centered`
            "
            field="studentAttendance.percentage.value"
            label="Asistencia"
            header-class="has-text-secondary-bis is-size-6 is-uppercase"
            sortable
          >
            <span :class="`has-text-${props.row.studentAttendance.percentage.color}`">
              {{ props.row.studentAttendance.percentage.text }}
            </span>
          </b-table-column>
          <b-table-column
            v-else-if="selectedRateType === 'TEACHER'"
            :class="
              `w150 is-clickable has-text-weight-bold${props.row.id === selectedSchoolId ? ' has-background-light' : ''} has-text-centered`
            "
            field="teacherAttendance.percentage.value"
            label="Asistencia"
            header-class="has-text-secondary-bis is-size-6 is-uppercase"
            sortable
          >
            <span :class="`has-text-${props.row.teacherAttendance.percentage.color}`">
              {{ props.row.teacherAttendance.percentage.text }}
            </span>
          </b-table-column>
          <b-table-column
            v-else
            :class="
              `w150 is-clickable has-text-weight-bold${props.row.id === selectedSchoolId ? ' has-background-light' : ''} has-text-centered`
            "
            field="adminAttendance.percentage.value"
            label="Asistencia"
            header-class="has-text-secondary-bis is-size-6 is-uppercase"
            sortable
          >
            <span :class="`has-text-${props.row.adminAttendance.percentage.color}`">
              {{ props.row.adminAttendance.percentage.text }}
            </span>
          </b-table-column>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script lang="ts" src="./RateList.component.ts"></script>
