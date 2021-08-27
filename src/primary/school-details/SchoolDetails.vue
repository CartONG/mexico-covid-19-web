<template>
  <div>
    <div class="has-background-white card mb-4">
      <header class="card-header py-2 px-2">
        <h2 class="has-text-weight-bold has-text-primary is-uppercase">Motivo por el que la escuela no tiene clases presenciales</h2>
      </header>
      <div class="card-content px-0 py-0">
        <p v-if="schoolDataSet.givesClasses.shortText === 'Si'" class="px-2 py-2">No aplicable</p>
        <p v-else class="px-2 py-2">{{ schoolDataSet.givesClasses.longText }}</p>
      </div>
    </div>
    <div class="has-background-white card mb-4">
      <header class="card-header py-2 px-2">
        <h2 class="has-text-weight-bold has-text-primary is-uppercase">Comentarios realizados por la escuela</h2>
      </header>
      <div class="card-content px-0 py-0">
        <p v-if="schoolDataSet.comments === ''" class="px-2 py-2">Sin comentarios</p>
        <template v-else>
          <p class="px-2 py-2">{{ schoolDataSet.comments }}</p>
          <p class="px-2 py-2 is-size-7 is-italic has-text-grey">
            Las opiniones aquí vertidas no reflejan la posición de la Secretaría de Educación Pública o del Fondo de Naciones Unidas para la
            Infancia UNICEF
          </p>
        </template>
      </div>
    </div>
    <div v-if="printable" class="columns has-page-break-before"><div class="column is-12"></div></div>
    <b-collapse class="card mb-4" animation="slide" aria-id="indiceDeAsistencia" :open="printable">
      <div slot="trigger" slot-scope="props" class="card-header py-1" role="button" aria-controls="indiceDeAsistencia">
        <table class="table is-fullwidth has-no-background">
          <tbody>
            <tr>
              <td class="has-text-weight-bold has-text-primary is-uppercase">índice de asistencia</td>
              <td class="w120 has-text-weight-bold has-text-secondary-bis is-uppercase w80 has-text-right opacity-6">Porcentaje</td>
              <td v-if="!printable" class="w40 has-text-right">
                <a class="card-header-icon px-0 py-0">
                  <span class="icon is-small"><i :class="`mdi mdi-chevron-${props.open ? 'down' : 'up'} is-size-3`"></i></span>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-content px-0 py-0">
        <table class="table is-fullwidth has-no-background">
          <tbody>
            <tr>
              <td>Asistencia del alumnado</td>
              <td :class="`w120 has-text-right has-text-weight-bold has-text-${schoolDataSet.studentAttendance.color}`">
                {{ schoolDataSet.studentAttendance.text }}
              </td>
              <td v-if="!printable" class="w40"></td>
            </tr>
            <tr>
              <td class="pl-2">- Inasistencia de niñas sobre el alumnado esperado</td>
              <td class="w120 has-text-right has-text-weight-bold">
                {{ schoolDataSet.femaleStudentAbsencePercentageOverStudentAbsence.text }}
              </td>
              <td v-if="!printable" class="w40"></td>
            </tr>
            <tr>
              <td class="pl-2">- Inasistencia de niños sobre el alumnado esperado</td>
              <td class="w120 has-text-right has-text-weight-bold">
                {{ schoolDataSet.maleStudentAbsencePercentageOverStudentAbsence.text }}
              </td>
              <td v-if="!printable" class="w40"></td>
            </tr>
            <tr>
              <td>Asistencia de docentes</td>
              <td :class="`w120 has-text-right has-text-weight-bold has-text-${schoolDataSet.teacherAttendance.color}`">
                {{ schoolDataSet.teacherAttendance.text }}
              </td>
              <td v-if="!printable" class="w40"></td>
            </tr>
            <tr>
              <td>Asistencia de personal distinto a docentes</td>
              <td :class="`w120 has-text-right has-text-weight-bold has-text-${schoolDataSet.adminAttendance.color}`">
                {{ schoolDataSet.adminAttendance.text }}
              </td>
              <td v-if="!printable" class="w40"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-collapse>
    <div :class="{ 'horizontal-scroll': !printable }">
      <b-collapse class="card mb-4 mw400" animation="slide" aria-id="causasDeInasistenciaDeAlumnos" :open="printable">
        <div slot="trigger" slot-scope="props" class="card-header py-1" role="button" aria-controls="causasDeInasistenciaDeAlumnos">
          <table class="table is-fullwidth has-no-background">
            <tbody>
              <tr>
                <td class="has-text-weight-bold has-text-primary is-uppercase">
                  Causas de inasistencia de alumnos
                </td>
                <td class="w120 has-text-weight-bold has-text-secondary-bis is-uppercase w80 has-text-right opacity-6">Número</td>
                <td class="w120 has-text-weight-bold has-text-secondary-bis is-uppercase w80 has-text-right opacity-6">Porcentaje</td>
                <td v-if="!printable" class="w40 has-text-right">
                  <a class="card-header-icon px-0 py-0">
                    <span class="icon is-small"><i :class="`mdi mdi-chevron-${props.open ? 'down' : 'up'} is-size-3`"></i></span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card-content px-0 py-0">
          <table class="table is-fullwidth has-no-background">
            <tbody>
              <tr>
                <td>La escuela no cuenta con instalaciones para el lavado de manos con agua y jabón</td>
                <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.studentAbsenceMainReasons['1'].text }}</td>
                <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.studentAbsenceMainReasonsPercentages['1'].text }}</td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Los padres de familia no enviaron a sus hijos a la escuela</td>
                <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.studentAbsenceMainReasons['2'].text }}</td>
                <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.studentAbsenceMainReasonsPercentages['2'].text }}</td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Reportaron enfermos a los alumnos que no asistieron</td>
                <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.studentAbsenceMainReasons['3'].text }}</td>
                <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.studentAbsenceMainReasonsPercentages['3'].text }}</td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Se desconocen las causas</td>
                <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.studentAbsenceMainReasons['4'].text }}</td>
                <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.studentAbsenceMainReasonsPercentages['4'].text }}</td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Otras causas</td>
                <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.studentAbsenceMainReasons['5'].text }}</td>
                <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.studentAbsenceMainReasonsPercentages['5'].text }}</td>
                <td v-if="!printable" class="w40"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-collapse>
    </div>
    <div :class="{ 'horizontal-scroll': !printable }">
      <b-collapse class="card mb-4 mw400" animation="slide" aria-id="causasDeInasistenciaDeDocentes" :open="printable">
        <div slot="trigger" slot-scope="props" class="card-header py-1" role="button" aria-controls="causasDeInasistenciaDeDocentes">
          <table class="table is-fullwidth has-no-background">
            <tbody>
              <tr>
                <td class="has-text-weight-bold has-text-primary is-uppercase">
                  Causas de inasistencia de docentes
                </td>
                <td class="w120 has-text-weight-bold has-text-secondary-bis is-uppercase w80 has-text-right opacity-6">Número</td>
                <td class="w120 has-text-weight-bold has-text-secondary-bis is-uppercase w80 has-text-right opacity-6">Porcentaje</td>
                <td v-if="!printable" class="w40 has-text-right">
                  <a class="card-header-icon px-0 py-0">
                    <span class="icon is-small"><i :class="`mdi mdi-chevron-${props.open ? 'down' : 'up'} is-size-3`"></i></span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card-content px-0 py-0">
          <table class="table is-fullwidth has-no-background">
            <tbody>
              <tr>
                <td>La escuela no cuenta con instalaciones para el lavado de manos con agua y jabón</td>
                <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.teacherAbsenceMainReasons['1'].text }}</td>
                <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.teacherAbsenceMainReasonsPercentages['1'].text }}</td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Se reportaron enfermos</td>
                <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.teacherAbsenceMainReasons['2'].text }}</td>
                <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.teacherAbsenceMainReasonsPercentages['2'].text }}</td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>No se sabe las causas</td>
                <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.teacherAbsenceMainReasons['3'].text }}</td>
                <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.teacherAbsenceMainReasonsPercentages['3'].text }}</td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Otras causas</td>
                <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.teacherAbsenceMainReasons['4'].text }}</td>
                <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.teacherAbsenceMainReasonsPercentages['4'].text }}</td>
                <td v-if="!printable" class="w40"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-collapse>
    </div>
    <div v-if="printable" class="columns has-page-break-before"><div class="column is-12"></div></div>
    <div :class="{ 'horizontal-scroll': !printable }">
      <b-collapse class="card mb-4 mw400" animation="slide" aria-id="causasDeInasistenciaDelPersonal" :open="printable">
        <div slot="trigger" slot-scope="props" class="card-header py-1" role="button" aria-controls="causasDeInasistenciaDelPersonal">
          <table class="table is-fullwidth has-no-background">
            <tbody>
              <tr>
                <td class="has-text-weight-bold has-text-primary is-uppercase">
                  Causas de inasistencia del personal
                </td>
                <td class="w120 has-text-weight-bold has-text-secondary-bis is-uppercase w80 has-text-right opacity-6">Número</td>
                <td class="w120 has-text-weight-bold has-text-secondary-bis is-uppercase w80 has-text-right opacity-6">Porcentaje</td>
                <td v-if="!printable" class="w40 has-text-right">
                  <a class="card-header-icon px-0 py-0">
                    <span class="icon is-small"><i :class="`mdi mdi-chevron-${props.open ? 'down' : 'up'} is-size-3`"></i></span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card-content px-0 py-0">
          <table class="table is-fullwidth has-no-background">
            <tbody>
              <tr>
                <td>La escuela no cuenta con instalaciones para el lavado de manos con agua y jabón</td>
                <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.adminAbsenceMainReasons['1'].text }}</td>
                <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.adminAbsenceMainReasonsPercentages['1'].text }}</td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Se reportaron enfermos</td>
                <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.adminAbsenceMainReasons['2'].text }}</td>
                <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.adminAbsenceMainReasonsPercentages['2'].text }}</td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>No se sabe las causas</td>
                <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.adminAbsenceMainReasons['3'].text }}</td>
                <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.adminAbsenceMainReasonsPercentages['3'].text }}</td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Otras causas</td>
                <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.adminAbsenceMainReasons['4'].text }}</td>
                <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.adminAbsenceMainReasonsPercentages['4'].text }}</td>
                <td v-if="!printable" class="w40"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-collapse>
    </div>
    <b-collapse class="card mb-4" animation="slide" aria-id="organizaciónEscolar" :open="printable">
      <div slot="trigger" slot-scope="props" class="card-header py-1" role="button" aria-controls="organizaciónEscolar">
        <table class="table is-fullwidth has-no-background">
          <tbody>
            <tr>
              <td class="has-text-weight-bold has-text-primary is-uppercase">Organización escolar</td>
              <td v-if="!printable" class="w40 has-text-right">
                <a class="card-header-icon px-0 py-0">
                  <span class="icon is-small"><i :class="`mdi mdi-chevron-${props.open ? 'down' : 'up'} is-size-3`"></i></span>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-content px-0 py-0">
        <table class="table is-fullwidth has-no-background">
          <tbody>
            <tr>
              <td>Se tiene instalado el comité de higiene</td>
              <td>
                {{ schoolDataSet.hasHygieneCommittee }}
              </td>
            </tr>
            <tr>
              <td>La escuela alterna la asistencia de los alumnos</td>
              <td>
                {{ schoolDataSet.alternatesAttendance }}
              </td>
            </tr>
            <tr>
              <td>La escuela puede reorganizar los espacios educativos</td>
              <td>
                {{ schoolDataSet.hasAbilityToReorganizeSpace }}
              </td>
            </tr>
            <tr>
              <td>Acciones para reincorporar a los alumnos con inasistencias</td>
              <td>
                {{ schoolDataSet.takenActions }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-collapse>
    <div v-if="printable" class="columns has-page-break-before"><div class="column is-12"></div></div>
    <b-collapse class="card mb-4" animation="slide" aria-id="conditioneSsanitariasElementales" :open="printable">
      <div slot="trigger" slot-scope="props" class="card-header py-1" role="button" aria-controls="conditioneSsanitariasElementales">
        <table class="table is-fullwidth has-no-background">
          <tbody>
            <tr>
              <td class="has-text-weight-bold has-text-primary is-uppercase">condiciones sanitarias elementales en la escuela</td>
              <td v-if="!printable" class="w40 has-text-right">
                <a class="card-header-icon px-0 py-0">
                  <span class="icon is-small"><i :class="`mdi mdi-chevron-${props.open ? 'down' : 'up'} is-size-3`"></i></span>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-content px-0 py-0">
        <table class="table is-fullwidth has-no-background">
          <tbody>
            <tr>
              <td>Abastecimiento de agua</td>
              <td>
                {{ schoolDataSet.waterSupply }}
              </td>
            </tr>
            <tr>
              <td>Frecuencia del abastecimiento de agua</td>
              <td>
                {{ schoolDataSet.waterServiceContinuity }}
              </td>
            </tr>
            <tr>
              <td>Disponibilidad de agua para el lavado frecuente de manos</td>
              <td>
                {{ schoolDataSet.waterForHandWashing.longText }}
              </td>
            </tr>
            <tr>
              <td>Disponibilidad de jabón para el lavado de manos</td>
              <td>
                {{ schoolDataSet.soapSufficiency.longText }}
              </td>
            </tr>
            <tr>
              <td>Disponibilidad de toallas para el secado de manos (papel o tela)</td>
              <td>
                {{ schoolDataSet.towelSufficiency }}
              </td>
            </tr>
            <tr>
              <td>Disponibilidad de alcohol en gel al 70%</td>
              <td>
                {{ schoolDataSet.sanitizerSufficiency }}
              </td>
            </tr>
            <tr>
              <td>Disponibilidad de botes de basura</td>
              <td>
                {{ schoolDataSet.binSufficiency }}
              </td>
            </tr>
            <tr>
              <td>Existencia de drenaje</td>
              <td>
                {{ schoolDataSet.hasSepticSystem }}
              </td>
            </tr>
            <tr>
              <td>Número de lavamanos funcionales</td>
              <td class="has-text-weight-bold">
                {{ schoolDataSet.functionalSinkCount.text }}
              </td>
            </tr>
            <tr>
              <td>Número de bebederos funcionales</td>
              <td class="has-text-weight-bold">
                {{ schoolDataSet.drinkers.text }}
              </td>
            </tr>
            <tr>
              <td>Número de baños funcionales para alumnas</td>
              <td class="has-text-weight-bold">
                {{ schoolDataSet.femaleStudentToilets.text }}
              </td>
            </tr>
            <tr>
              <td>Número de baños funcionales para alumnos</td>
              <td class="has-text-weight-bold">
                {{ schoolDataSet.maleStudentToilets.text }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-collapse>
    <b-collapse class="card mb-4" animation="slide" aria-id="programasAdheridosALaEscuela" :open="printable">
      <div slot="trigger" slot-scope="props" class="card-header py-1" role="button" aria-controls="programasAdheridosALaEscuela">
        <table class="table is-fullwidth has-no-background">
          <tbody>
            <tr>
              <td class="has-text-weight-bold has-text-primary is-uppercase">Programas adheridos a la escuela</td>
              <td v-if="!printable" class="w40 has-text-right">
                <a class="card-header-icon px-0 py-0">
                  <span class="icon is-small"><i :class="`mdi mdi-chevron-${props.open ? 'down' : 'up'} is-size-3`"></i></span>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-content px-0 py-0">
        <table class="table is-fullwidth has-no-background">
          <tbody>
            <tr>
              <td>Reciben el apoyo de alimentación en la escuela</td>
              <td>
                {{ schoolDataSet.foodSupport }}
              </td>
            </tr>
            <tr>
              <td>Quienes proporcionan los alimentos</td>
              <td>
                {{ schoolDataSet.foodSupportType }}
              </td>
            </tr>
            <tr v-if="schoolDataSet.foodSupportComment !== ''">
              <td>Sí otros, quién da el apoyo de alimentación</td>
              <td>
                {{ schoolDataSet.foodSupportComment }}
              </td>
            </tr>
            <tr>
              <td>La escuela pertenece al programa La Escuela es nuestra</td>
              <td>
                {{ schoolDataSet.theSchoolIsOurs }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-collapse>
    <div v-if="printable" class="columns has-page-break-before"><div class="column is-12"></div></div>
    <div :class="{ 'horizontal-scroll': !printable }">
      <b-collapse class="card mb-4 mw400" animation="slide" aria-id="estadísticaBásicaSobreMatrícula" :open="printable">
        <div slot="trigger" slot-scope="props" class="card-header py-1" role="button" aria-controls="estadísticaBásicaSobreMatrícula">
          <table class="table is-fullwidth has-no-background">
            <tbody>
              <tr>
                <td class="has-text-weight-bold has-text-primary is-uppercase">
                  Estadística básica sobre matrícula
                </td>
                <td class="w120 has-text-weight-bold has-text-secondary-bis is-uppercase w80 has-text-right opacity-6">Número</td>
                <td class="w120 has-text-weight-bold has-text-secondary-bis is-uppercase w80 has-text-right opacity-6">Porcentaje</td>
                <td v-if="!printable" class="w40 has-text-right">
                  <a class="card-header-icon px-0 py-0">
                    <span class="icon is-small"><i :class="`mdi mdi-chevron-${props.open ? 'down' : 'up'} is-size-3`"></i></span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card-content px-0 py-0">
          <table class="table is-fullwidth has-no-background">
            <tbody>
              <tr>
                <td>Total de alumnos</td>
                <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.students.text }}</td>
                <td class="w120 has-text-right has-text-weight-bold">100%</td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td class="pl-2">- de los cuales alumnas</td>
                <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.femaleStudent.text }}</td>
                <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.femaleStudentPercentage.text }}</td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td class="pl-2">- de los cuales alumnos</td>
                <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.maleStudent.text }}</td>
                <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.maleStudentPercentage.text }}</td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Grupos</td>
                <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.assistants.text }}</td>
                <td class="w120 has-text-right has-text-weight-bold">-</td>
                <td v-if="!printable" class="w40"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-collapse>
    </div>
    <b-collapse class="card mb-4" animation="slide" aria-id="estadísticasBásicasDelPersonal" :open="printable">
      <div slot="trigger" slot-scope="props" class="card-header py-1" role="button" aria-controls="estadísticasBásicasDelPersonal">
        <table class="table is-fullwidth has-no-background">
          <tbody>
            <tr>
              <td class="has-text-weight-bold has-text-primary is-uppercase">
                Estadísticas básicas del personal
              </td>
              <td class="w120 has-text-weight-bold has-text-secondary-bis is-uppercase w80 has-text-right opacity-6">Número</td>
              <td v-if="!printable" class="w40 has-text-right">
                <a class="card-header-icon px-0 py-0">
                  <span class="icon is-small"><i :class="`mdi mdi-chevron-${props.open ? 'down' : 'up'} is-size-3`"></i></span>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-content px-0 py-0">
        <table class="table is-fullwidth has-no-background">
          <tbody>
            <tr>
              <td>Docentes</td>
              <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.teachers.text }}</td>
              <td v-if="!printable" class="w40"></td>
            </tr>
            <tr>
              <td>Directores</td>
              <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.directors.text }}</td>
              <td v-if="!printable" class="w40"></td>
            </tr>
            <tr>
              <td>Subdirectores</td>
              <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.subDirectors.text }}</td>
              <td v-if="!printable" class="w40"></td>
            </tr>
            <tr>
              <td>Asesores Técnicos Pedagógicos</td>
              <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.technicalPedagogicalAdvisers.text }}</td>
              <td v-if="!printable" class="w40"></td>
            </tr>
            <tr>
              <td>Docentes de Educación Física</td>
              <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.physicalEducationTeachers.text }}</td>
              <td v-if="!printable" class="w40"></td>
            </tr>
            <tr>
              <td>Personal Administrativo</td>
              <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.admins.text }}</td>
              <td v-if="!printable" class="w40"></td>
            </tr>
            <tr>
              <td>Personal de intendencia</td>
              <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.quartermasters.text }}</td>
              <td v-if="!printable" class="w40"></td>
            </tr>
            <tr>
              <td>Otro tipo de personal</td>
              <td class="w120 has-text-right has-text-weight-bold">{{ schoolDataSet.others.text }}</td>
              <td v-if="!printable" class="w40"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-collapse>
    <b-collapse class="card mb-4" animation="slide" aria-id="serviciosBasicos" :open="printable">
      <div slot="trigger" slot-scope="props" class="card-header py-1" role="button" aria-controls="serviciosBasicos">
        <table class="table is-fullwidth has-no-background">
          <tbody>
            <tr>
              <td class="has-text-weight-bold has-text-primary is-uppercase">Servicios básicos</td>
              <td v-if="!printable" class="w40 has-text-right">
                <a class="card-header-icon px-0 py-0">
                  <span class="icon is-small"><i :class="`mdi mdi-chevron-${props.open ? 'down' : 'up'} is-size-3`"></i></span>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-content px-0 py-0">
        <table class="table is-fullwidth has-no-background">
          <tbody>
            <tr>
              <td>Fuente principal de energía eléctrica</td>
              <td>
                {{ schoolDataSet.electricitySource }}
              </td>
            </tr>
            <tr>
              <td>Acceso a internet</td>
              <td>
                {{ schoolDataSet.internetAccess }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-collapse>
  </div>
</template>

<script lang="ts" src="./SchoolDetails.component.ts"></script>
