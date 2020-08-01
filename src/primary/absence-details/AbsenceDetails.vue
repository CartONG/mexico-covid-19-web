<template>
  <div class="has-background-white card">
    <header class="card-header">
      <h2 class="card-header-title">Causas generales del total de inasistencia</h2>
    </header>
    <div class="tabs">
      <ul>
        <li :class="[{ 'is-active': attendanceType === 'STUDENT' }, 'is-size-6', 'has-text-weight-bold']">
          <a href="#" @click.prevent.stop="change('STUDENT')">ALUMNOS</a>
        </li>
        <li :class="[{ 'is-active': attendanceType === 'TEACHER' }, 'is-size-6', 'has-text-weight-bold']">
          <a href="#" @click.prevent.stop="change('TEACHER')">DOCENTES</a>
        </li>
        <li :class="[{ 'is-active': attendanceType === 'PERSONAL' }, 'is-size-6', 'has-text-weight-bold']">
          <a href="#" @click.prevent.stop="change('PERSONAL')">PERSONAL*</a>
        </li>
      </ul>
    </div>
    <div class="card-content">
      <div class="columns is-mobile">
        <div class="column is-4 has-text-centered">
          <svg id="absence-details-chart" viewBox="0 0 150 150" perserveAspectRatio="xMinYMid meet"></svg>
        </div>
        <div class="column is-8">
          <table class="table">
            <tr v-for="legendItem in absenceDetailsDataSet.legendItems" :key="legendItem.text">
              <td><i :class="`square-${legendItem.color}`"></i></td>
              <td>{{ legendItem.text }}</td>
              <td class="has-text-weight-bold has-text-centered has-text-secondary">{{ legendItem.value }}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="h20 has-text-weight-bold">
        {{ absenceDetailsDataSet.appendix }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./AbsenceDetails.component.ts"></script>
