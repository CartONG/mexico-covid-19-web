<template>
  <nav class="tabs shadowless no-border attendance-tabs is-fullwidth">
    <ul>
      <li :class="[{ 'is-active': attendanceType === 'STUDENT' }, 'is-full-height']">
        <a class="is-full-height" @click.prevent.stop="selectAttendanceType('STUDENT')">
          <AttendanceCardVue :attendance="summaryDataSet.studentAttendance" :inline="inline" :printable="printable" />
        </a>
      </li>
      <li :class="[{ 'is-active': attendanceType === 'TEACHER' }, 'is-full-height']">
        <a class="is-full-height" @click.prevent.stop="selectAttendanceType('TEACHER')">
          <AttendanceCardVue :attendance="summaryDataSet.teacherAttendance" :inline="inline" :printable="printable" />
        </a>
      </li>
      <li :class="[{ 'is-active': attendanceType === 'PERSONAL' }, 'is-full-height']">
        <a class="is-full-height" @click.prevent.stop="selectAttendanceType('PERSONAL')">
          <AttendanceCardVue :attendance="summaryDataSet.adminAttendance" :inline="inline" :printable="printable" />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" src="./AttendanceTabs.component.ts"></script>
