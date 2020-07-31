<template>
  <div class="has-background-white card">
    <header class="card-header">
      <h2 class="card-header-title">{{ attendanceListDataSet.header }}</h2>
    </header>
    <div class="card-content px-0 py-0">
      <div v-if="attendanceListDataSet.items.length === 0" class="has-text-grey px-2 py-2">
        No se han encontrado resultados
      </div>
      <b-table
        class="has-no-background"
        v-else
        :data="attendanceListDataSet.items"
        :default-sort="attendanceListSortOptions"
        :sticky-header="stickyHeader"
        hoverable
        @click="goTo($event.id, $event.name)"
        @sort="sort"
      >
        <template slot-scope="props">
          <b-table-column
            field="name"
            :class="[
              {
                'has-text-weight-bold': props.row.id === `${schoolId}`,
                'has-background-light': props.row.id === `${schoolId}`,
              },
              'is-clickable is-size-6',
            ]"
            :label="attendanceListDataSet.entityColumnName"
            header-class="has-text-secondary-bis is-size-6 is-uppercase"
            custom-key="name"
            sortable
          >
            {{ props.row.name }}
          </b-table-column>
          <b-table-column
            :class="`w150 is-clickable has-text-weight-bold${props.row.id === schoolId ? ' has-background-light' : ''} has-text-centered`"
            field="percentage.value"
            label="Asistencia"
            header-class="has-text-secondary-bis is-size-6 is-uppercase"
            sortable
          >
            <span :class="`has-text-${props.row.percentage.color}`">
              {{ props.row.percentage.text }}
            </span>
          </b-table-column>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script lang="ts" src="./AttendanceList.component.ts"></script>
