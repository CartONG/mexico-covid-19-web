<template>
  <div class="has-background-white card">
    <header class="card-header">
      <p class="card-header-title has-text-primary">Información detallada</p>
    </header>
    <div class="card-content">
      <table class="table is-fullwidth has-no-background">
        <tbody>
          <tr>
            <td>Número de escuelas</td>
            <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.totalSchools }}</td>
          </tr>
          <tr>
            <td>Número de alumnos</td>
            <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.totalStudent }}</td>
          </tr>
          <tr>
            <td>Número de docentes</td>
            <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.totalTeachers }}</td>
          </tr>
          <!--
          <tr>
            <td>Matricula de alumnos de primer grado</td>
            <td class="w80">{{ administrativeDivisionDataSet.studentsFirstGrade }}</td>
          </tr>
          <tr>
            <td>Matricula de alumnos de segundo grado</td>
            <td class="w80">{{ administrativeDivisionDataSet.studentsSecondGrade }}</td>
          </tr>
          <tr>
            <td>Matricula de alumnos de tercer grado</td>
            <td class="w80">{{ administrativeDivisionDataSet.studentsThirdGrade }}</td>
          </tr>
          <tr>
            <td>Matricula de alumnos de cuarto grado</td>
            <td class="w80">{{ administrativeDivisionDataSet.studentsFourthGrade }}</td>
          </tr>
          <tr>
            <td>Matricula de alumnos de quinto grado</td>
            <td class="w80">{{ administrativeDivisionDataSet.studentsFifthGrade }}</td>
          </tr>
          <tr>
            <td>Matricula de alumnos de sexto grado</td>
            <td class="w80">{{ administrativeDivisionDataSet.studentsSixthGrade }}</td>
          </tr>
          <tr>
            <td>Total de Docentes frente a grupo de 1ro.</td>
            <td class="w80">{{ administrativeDivisionDataSet.teachersFirstGrade }}</td>
          </tr>
          <tr>
            <td>Total de Docentes frente a grupo de 2do.</td>
            <td class="w80">{{ administrativeDivisionDataSet.teachersSecondGrade }}</td>
          </tr>
          <tr>
            <td>Total de Docentes frente a grupo de 3ro.</td>
            <td class="w80">{{ administrativeDivisionDataSet.teachersThirdGrade }}</td>
          </tr>
          <tr>
            <td>Total de Docentes frente a grupo de 4to.</td>
            <td class="w80">{{ administrativeDivisionDataSet.teachersFourthGrade }}</td>
          </tr>
          <tr>
            <td>Total de Docentes frente a grupo de 5to.</td>
            <td class="w80">{{ administrativeDivisionDataSet.teachersFifthGrade }}</td>
          </tr>
          <tr>
            <td>Total de Docentes frente a grupo de 6to.</td>
            <td class="w80">{{ administrativeDivisionDataSet.teachersSixthGrade }}</td>
          </tr>
          -->
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" src="./Details.component.ts"></script>
