<template>
  <div class="has-background-white card">
    <header class="card-header">
      <h2 class="card-header-title has-text-primary">Historial</h2>
      <HistoricInfoModalVue v-if="!printable" class="m-1" />
    </header>
    <div class="tabs">
      <ul v-if="printable">
        <li v-if="historicType === 'GIVES_CLASSES'" class="is-active is-size-6 has-text-weight-bold is-uppercase">
          <a href="#" @click.prevent.stop="$emit('changehistorictype', 'GIVES_CLASSES')">escuelas con clases presenciales</a>
        </li>
        <li v-if="historicType === 'STUDENT_ABSENCE'" class="is-active is-size-6 has-text-weight-bold is-uppercase">
          <a href="#" @click.prevent.stop="$emit('changehistorictype', 'STUDENT_ABSENCE')">Índice de inasistencia de alumnos</a>
        </li>
        <li v-if="historicType === 'TEACHER_ABSENCE'" class="is-active is-size-6 has-text-weight-bold is-uppercase">
          <a href="#" @click.prevent.stop="$emit('changehistorictype', 'TEACHER_ABSENCE')">Índice de asistencia de docentes</a>
        </li>
      </ul>
      <ul v-else>
        <li :class="[{ 'is-active': historicType === 'GIVES_CLASSES' }, 'is-size-6', 'has-text-weight-bold', 'is-uppercase']">
          <a href="#" @click.prevent.stop="$emit('changehistorictype', 'GIVES_CLASSES')">escuelas con clases presenciales</a>
        </li>
        <li :class="[{ 'is-active': historicType === 'STUDENT_ABSENCE' }, 'is-size-6', 'has-text-weight-bold', 'is-uppercase']">
          <a href="#" @click.prevent.stop="$emit('changehistorictype', 'STUDENT_ABSENCE')">Índice de inasistencia de alumnos</a>
        </li>
        <li :class="[{ 'is-active': historicType === 'TEACHER_ABSENCE' }, 'is-size-6', 'has-text-weight-bold', 'is-uppercase']">
          <a href="#" @click.prevent.stop="$emit('changehistorictype', 'TEACHER_ABSENCE')">Índice de asistencia de docentes</a>
        </li>
      </ul>
    </div>
    <div class="card-content">
      <div id="historic-stacked-chart"></div>
      <b-field v-if="administrativeDivisionHistoricDataSet.chartData.length > 0 && !printable">
        <b-slider
          :value="historicInterval"
          :min="0"
          :max="administrativeDivisionHistoricDataSet.chartData.length - 1"
          :step="1"
          :custom-formatter="tooltipLabel"
          ticks
          rounded
          @change="$emit('changehistoricinterval', $event)"
        ></b-slider>
      </b-field>
    </div>
  </div>
</template>

<script lang="ts" src="./AdministrativeDivisionHistoric.component.ts"></script>
