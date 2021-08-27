import { AdministrativeDivision } from '@/domain/administrative-division/AdministrativeDivision';
import { AdministrativeDivisionTypes } from '@/domain/administrative-division/AdministrativeDivisionTypes';
import { LocalDate } from '@/domain/date/LocalDate';

export interface RestAdministrativeDivision {
  id: string;
  nombre: string;
  fechaUltimoReporte: string;
  entidadId: string;
  sostenimiento: { privado: number; publico: number };
  indiceAsistenciaAlumnado: number;
  indiceAsistenciaDocentes: number;
  indiceAsistenciaAdmin: number;
  indiceInasistenciaAlumnas: number;
  indiceInasistenciaAlumnos: number;
  sumaEscuelas: number;
  sumaAlumnado: number;
  sumaAlumnas: number;
  sumaAlumnos: number;
  hayClases: { [key: string]: number };
  sumaHayClases: { [key: string]: number };
  sumaDocentes: number;
  sumaGrupos: number;
  sumaDirector: number;
  sumaSubdirector: number;
  sumaAtps: number;
  sumaEducfis: number;
  sumaAdmin: number;
  sumaIntenden: number;
  sumaOtros: number;
  tipoAbasAgua: { [key: string]: number };
  sumaTipoAbasAgua: { [key: string]: number };
  contServAgua: { [key: string]: number };
  sumaContServAgua: { [key: string]: number };
  aguaLavamanos: { [key: string]: number };
  sumaAguaLavamanos: { [key: string]: number };
  sumaLavamanos: number;
  jabon: { [key: string]: number };
  sumaJabon: { [key: string]: number };
  toallas: { [key: string]: number };
  sumaToallas: { [key: string]: number };
  sanitizante: { [key: string]: number };
  sumaSanitizante: { [key: string]: number };
  botesBasura: { [key: string]: number };
  sumaBotesBasura: { [key: string]: number };
  tipoDrenaje: { [key: string]: number };
  sumaTipoDrenaje: { [key: string]: number };
  sumaEspacios: { [key: string]: number };
  espacios: { [key: string]: number };
  comite: { [key: string]: number };
  sumaComite: { [key: string]: number };
  alterna_asis: { [key: string]: number };
  sumaAlterna_asis: { [key: string]: number };
  sumaInaAlumnas: number;
  sumaInaAlumnos: number;
  causaInaAlum: { [key: string]: number };
  sumaCausaInaAlum: { [key: string]: number };
  sumaInaDocentes: number;
  causaInaDocente: { [key: string]: number };
  sumaCausaInaDocente: { [key: string]: number };
  sumaInaAdministrativos: number;
  causaInaAdmin: { [key: string]: number };
  sumaCausaInaAdmin: { [key: string]: number };
  accion: { visita: number; llamada: number; beca: number; ninguna: number };
  sumaBebederos: number;
  sumaWcalumnas: number;
  sumaWcalumnos: number;
  indiceAlimentos: { [key: string]: number };
  alimentos: { dif: number; etc: number; edo: number; otro: number };
  indiceEscuelaNuestra: { [key: string]: number };
  sumaAccionvisita: number;
  sumaAccionllamada: number;
  sumaAccionbeca: number;
  sumaAccionninguna: number;
  sumaAlimentos: number;
  sumaAlimentosdif: number;
  sumaAlimentosetc: number;
  sumaAlimentosedo: number;
  sumaAlimentosotro: number;
  sumaEscuelanuestra: number;
  contservelectrica: { [key: string]: number };
  sumaContservelectrica: { [key: string]: number };
  internet: { [key: string]: number };
  sumaInternet: { [key: string]: number };
}

const genderPercentage = (gender: number, otherGender: number): number => {
  if (gender === -1 || otherGender === -1) {
    return -1;
  }
  const total = gender + otherGender;
  return total === 0 ? 0 : Math.round((gender / total) * 100) / 100;
};

export const toAdministrativeDivision = (
  restAdministrativeDivision: RestAdministrativeDivision,
  type: AdministrativeDivisionTypes
): AdministrativeDivision => ({
  id: `${restAdministrativeDivision.entidadId || ''}${restAdministrativeDivision.id}`,
  name: restAdministrativeDivision.nombre,
  lastUpdateDate: LocalDate.of(restAdministrativeDivision.fechaUltimoReporte),
  type: type,
  stateId: restAdministrativeDivision.entidadId || '',
  support: {
    private: restAdministrativeDivision.sostenimiento.privado,
    public: restAdministrativeDivision.sostenimiento.publico,
  },
  studentAttendance: restAdministrativeDivision.indiceAsistenciaAlumnado,
  teacherAttendance: restAdministrativeDivision.indiceAsistenciaDocentes,
  adminAttendance: restAdministrativeDivision.indiceAsistenciaAdmin,
  maleStudentAbsencePercentageOverStudentAbsence: restAdministrativeDivision.indiceInasistenciaAlumnos,
  femaleStudentAbsencePercentageOverStudentAbsence: restAdministrativeDivision.indiceInasistenciaAlumnas,
  schools: restAdministrativeDivision.sumaEscuelas,
  students: restAdministrativeDivision.sumaAlumnado,
  femaleStudents: restAdministrativeDivision.sumaAlumnas,
  maleStudents: restAdministrativeDivision.sumaAlumnos,
  maleStudentPercentage: genderPercentage(restAdministrativeDivision.sumaAlumnos, restAdministrativeDivision.sumaAlumnas),
  femaleStudentPercentage: genderPercentage(restAdministrativeDivision.sumaAlumnas, restAdministrativeDivision.sumaAlumnos),
  teachers: restAdministrativeDivision.sumaDocentes,
  assistants: restAdministrativeDivision.sumaGrupos,
  directors: restAdministrativeDivision.sumaDirector,
  subDirectors: restAdministrativeDivision.sumaSubdirector,
  technicalPedagogicalAdvisers: restAdministrativeDivision.sumaAtps,
  physicalEducationTeachers: restAdministrativeDivision.sumaEducfis,
  admins: restAdministrativeDivision.sumaAdmin,
  quartermasters: restAdministrativeDivision.sumaIntenden,
  others: restAdministrativeDivision.sumaOtros,
  schoolGivingClasses: restAdministrativeDivision.sumaHayClases,
  schoolGivingClassesPercentages: restAdministrativeDivision.hayClases,
  schoolWaterSupply: restAdministrativeDivision.sumaTipoAbasAgua,
  schoolWaterSupplyPercentages: restAdministrativeDivision.tipoAbasAgua,
  schoolWaterServiceContinuity: restAdministrativeDivision.sumaContServAgua,
  schoolWaterServiceContinuityPercentages: restAdministrativeDivision.contServAgua,
  schoolWithWaterForHandWashing: restAdministrativeDivision.sumaAguaLavamanos,
  schoolWithWaterForHandWashingPercentages: restAdministrativeDivision.aguaLavamanos,
  schoolFunctionalSinkCount: restAdministrativeDivision.sumaLavamanos,
  schoolSoapSufficiency: restAdministrativeDivision.sumaJabon,
  schoolSoapSufficiencyPercentages: restAdministrativeDivision.jabon,
  schoolTowelSufficiency: restAdministrativeDivision.sumaToallas,
  schoolTowelSufficiencyPercentages: restAdministrativeDivision.toallas,
  schoolSanitizerSufficiency: restAdministrativeDivision.sumaSanitizante,
  schoolSanitizerSufficiencyPercentages: restAdministrativeDivision.sanitizante,
  schoolBinSufficiency: restAdministrativeDivision.sumaBotesBasura,
  schoolBinSufficiencyPercentages: restAdministrativeDivision.botesBasura,
  schoolWithSepticSystem: restAdministrativeDivision.sumaTipoDrenaje,
  schoolWithSepticSystemPercentages: restAdministrativeDivision.tipoDrenaje,
  schoolWithAbilityToReorganizeSpace: restAdministrativeDivision.sumaEspacios,
  schoolWithAbilityToReorganizeSpacePercentages: restAdministrativeDivision.espacios,
  hygieneCommittee: restAdministrativeDivision.sumaComite,
  hygieneCommitteePercentages: restAdministrativeDivision.comite,
  alternatesAttendance: restAdministrativeDivision.sumaAlterna_asis,
  alternatesAttendancePercentages: restAdministrativeDivision.alterna_asis,
  absentFemaleStudents: restAdministrativeDivision.sumaInaAlumnas,
  absentMaleStudents: restAdministrativeDivision.sumaInaAlumnos,
  studentAbsenceMainReasons: restAdministrativeDivision.sumaCausaInaAlum || {},
  studentAbsenceMainReasonsPercentages: restAdministrativeDivision.causaInaAlum || {},
  absentTeachers: restAdministrativeDivision.sumaInaDocentes,
  teacherAbsenceMainReasons: restAdministrativeDivision.sumaCausaInaDocente || {},
  teacherAbsenceMainReasonsPercentages: restAdministrativeDivision.causaInaDocente || {},
  absentAdmins: restAdministrativeDivision.sumaInaAdministrativos,
  adminAbsenceMainReasons: restAdministrativeDivision.sumaCausaInaAdmin || {},
  adminAbsenceMainReasonsPercentages: restAdministrativeDivision.causaInaAdmin || {},
  takenActions: {
    visits: restAdministrativeDivision.sumaAccionvisita,
    calls: restAdministrativeDivision.sumaAccionllamada,
    scholarship: restAdministrativeDivision.sumaAccionbeca,
    none: restAdministrativeDivision.sumaAccionninguna,
  },
  takenActionsPercentages: {
    visits: restAdministrativeDivision.accion.visita,
    calls: restAdministrativeDivision.accion.llamada,
    scholarship: restAdministrativeDivision.accion.beca,
    none: restAdministrativeDivision.accion.ninguna,
  },
  drinkers: restAdministrativeDivision.sumaBebederos,
  maleStudentToilets: restAdministrativeDivision.sumaWcalumnos,
  femaleStudentToilets: restAdministrativeDivision.sumaWcalumnas,
  foodSupport: {
    '1': restAdministrativeDivision.sumaAlimentos,
    '2': restAdministrativeDivision.sumaEscuelas - restAdministrativeDivision.sumaAlimentos,
  },
  foodSupportPercentages: restAdministrativeDivision.indiceAlimentos,
  foodSupportType: {
    dif: restAdministrativeDivision.sumaAlimentosdif,
    fullTimeProgram: restAdministrativeDivision.sumaAlimentosetc,
    state: restAdministrativeDivision.sumaAlimentosedo,
    others: restAdministrativeDivision.sumaAlimentosotro,
  },
  foodSupportTypePercentages: {
    dif: restAdministrativeDivision.alimentos.dif,
    fullTimeProgram: restAdministrativeDivision.alimentos.etc,
    state: restAdministrativeDivision.alimentos.edo,
    others: restAdministrativeDivision.alimentos.otro,
  },
  theSchoolIsOurs: {
    '1': restAdministrativeDivision.sumaEscuelanuestra,
    '2': restAdministrativeDivision.sumaEscuelas - restAdministrativeDivision.sumaEscuelanuestra,
  },
  theSchoolIsOursPercentages: restAdministrativeDivision.indiceEscuelaNuestra,
  electricitySources: restAdministrativeDivision.sumaContservelectrica,
  electricitySourcesPercentages: restAdministrativeDivision.contservelectrica,
  internetAccess: restAdministrativeDivision.sumaInternet,
  internetAccessPercentages: restAdministrativeDivision.internet,
});
