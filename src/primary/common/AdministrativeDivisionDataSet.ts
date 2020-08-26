import { AdministrativeDivision } from '@/domain/administrative-division/AdministrativeDivision';
import { NumericDataSet, toNumericDataSet } from '@/primary/common/NumericDataSet';
import { PercentageDataSet, toPercentageDataSet } from '@/primary/common/PercentageDataSet';

export interface AdministrativeDivisionDataSet {
  support: { private: PercentageDataSet; public: PercentageDataSet };
  studentAttendance: PercentageDataSet;
  teacherAttendance: PercentageDataSet;
  adminAttendance: PercentageDataSet;
  maleStudentAbsencePercentageOverStudentAbsence: PercentageDataSet;
  femaleStudentAbsencePercentageOverStudentAbsence: PercentageDataSet;
  schools: string;
  students: NumericDataSet;
  femaleStudents: NumericDataSet;
  maleStudents: NumericDataSet;
  maleStudentPercentage: PercentageDataSet;
  femaleStudentPercentage: PercentageDataSet;
  teachers: string;
  assistants: string;
  directors: string;
  subDirectors: string;
  technicalPedagogicalAdvisers: string;
  physicalEducationTeachers: string;
  admins: string;
  quartermasters: string;
  others: string;
  schoolGivingClasses: {
    '1': NumericDataSet;
    '2': NumericDataSet;
    '3': NumericDataSet;
    '4': NumericDataSet;
    '5': NumericDataSet;
    '6': NumericDataSet;
    '7': NumericDataSet;
  };
  schoolGivingClassesPercentages: {
    '1': PercentageDataSet;
    '2': PercentageDataSet;
    '3': PercentageDataSet;
    '4': PercentageDataSet;
    '5': PercentageDataSet;
    '6': PercentageDataSet;
    '7': PercentageDataSet;
  };
  schoolWaterSupply: {
    '1': NumericDataSet;
    '2': NumericDataSet;
    '3': NumericDataSet;
    '4': NumericDataSet;
  };
  schoolWaterSupplyPercentages: {
    '1': PercentageDataSet;
    '2': PercentageDataSet;
    '3': PercentageDataSet;
    '4': PercentageDataSet;
  };
  schoolWaterServiceContinuity: {
    '1': NumericDataSet;
    '2': NumericDataSet;
    '3': NumericDataSet;
    '4': NumericDataSet;
  };
  schoolWaterServiceContinuityPercentages: {
    '1': PercentageDataSet;
    '2': PercentageDataSet;
    '3': PercentageDataSet;
    '4': PercentageDataSet;
  };
  schoolWithWaterForHandWashing: {
    '1': NumericDataSet;
    '2': NumericDataSet;
  };
  schoolWithWaterForHandWashingPercentages: {
    '1': PercentageDataSet;
    '2': PercentageDataSet;
  };
  schoolSinkSufficiency: {
    '1': NumericDataSet;
    '2': NumericDataSet;
    '3': NumericDataSet;
  };
  schoolSinkSufficiencyPercentages: {
    '1': PercentageDataSet;
    '2': PercentageDataSet;
    '3': PercentageDataSet;
  };
  schoolSoapSufficiency: {
    '1': NumericDataSet;
    '2': NumericDataSet;
    '3': NumericDataSet;
  };
  schoolSoapSufficiencyPercentages: {
    '1': PercentageDataSet;
    '2': PercentageDataSet;
    '3': PercentageDataSet;
  };
  schoolTowelSufficiency: {
    '1': NumericDataSet;
    '2': NumericDataSet;
    '3': NumericDataSet;
  };
  schoolTowelSufficiencyPercentages: {
    '1': PercentageDataSet;
    '2': PercentageDataSet;
    '3': PercentageDataSet;
  };
  schoolSanitizerSufficiency: {
    '1': NumericDataSet;
    '2': NumericDataSet;
    '3': NumericDataSet;
  };
  schoolSanitizerSufficiencyPercentages: {
    '1': PercentageDataSet;
    '2': PercentageDataSet;
    '3': PercentageDataSet;
  };
  schoolBinSufficiency: {
    '1': NumericDataSet;
    '2': NumericDataSet;
    '3': NumericDataSet;
  };
  schoolBinSufficiencyPercentages: {
    '1': PercentageDataSet;
    '2': PercentageDataSet;
    '3': PercentageDataSet;
  };
  schoolWithSepticSystem: {
    '1': NumericDataSet;
    '2': NumericDataSet;
  };
  schoolWithSepticSystemPercentages: {
    '1': PercentageDataSet;
    '2': PercentageDataSet;
  };
  schoolWithAbilityToReorganizeSpace: {
    '1': NumericDataSet;
    '2': NumericDataSet;
  };
  schoolWithAbilityToReorganizeSpacePercentages: {
    '1': PercentageDataSet;
    '2': PercentageDataSet;
  };
  hygieneCommittee: {
    '1': NumericDataSet;
    '2': NumericDataSet;
  };
  hygieneCommitteePercentages: {
    '1': PercentageDataSet;
    '2': PercentageDataSet;
  };
  alternatesAttendance: {
    '1': NumericDataSet;
    '2': NumericDataSet;
  };
  alternatesAttendancePercentages: {
    '1': PercentageDataSet;
    '2': PercentageDataSet;
  };
  absentFemaleStudents: string;
  absentMaleStudents: string;
  studentAbsenceMainReasons: {
    '1': NumericDataSet;
    '2': NumericDataSet;
    '3': NumericDataSet;
    '4': NumericDataSet;
    '5': NumericDataSet;
  };
  studentAbsenceMainReasonsPercentages: {
    '1': PercentageDataSet;
    '2': PercentageDataSet;
    '3': PercentageDataSet;
    '4': PercentageDataSet;
    '5': PercentageDataSet;
  };
  absentTeachers: string;
  teacherAbsenceMainReasons: {
    '1': NumericDataSet;
    '2': NumericDataSet;
    '3': NumericDataSet;
    '4': NumericDataSet;
  };
  teacherAbsenceMainReasonsPercentages: {
    '1': PercentageDataSet;
    '2': PercentageDataSet;
    '3': PercentageDataSet;
    '4': PercentageDataSet;
  };
  absentAdmins: string;
  adminsAbsenceMainReasons: {
    '1': NumericDataSet;
    '2': NumericDataSet;
    '3': NumericDataSet;
    '4': NumericDataSet;
  };
  adminsAbsenceMainReasonsPercentages: {
    '1': PercentageDataSet;
    '2': PercentageDataSet;
    '3': PercentageDataSet;
    '4': PercentageDataSet;
  };
  takenActionsPercentages: {
    visits: PercentageDataSet;
    calls: PercentageDataSet;
    scholarship: PercentageDataSet;
    none: PercentageDataSet;
  };
  drinkers: NumericDataSet;
  maleStudentToilets: NumericDataSet;
  femaleStudentToilets: NumericDataSet;
  foodSupportPercentages: {
    '1': PercentageDataSet;
    '2': PercentageDataSet;
  };
  foodSupportTypePercentages: {
    dif: PercentageDataSet;
    fullTimeProgram: PercentageDataSet;
    state: PercentageDataSet;
    others: PercentageDataSet;
  };
  theSchoolIsOursPercentages: {
    '1': PercentageDataSet;
    '2': PercentageDataSet;
  };
}

export const toAdministrativeDivisionDataset = (
  administrativeDivision: AdministrativeDivision | undefined
): AdministrativeDivisionDataSet =>
  administrativeDivision
    ? {
        support: {
          private: toPercentageDataSet(administrativeDivision.support.private),
          public: toPercentageDataSet(administrativeDivision.support.public),
        },
        studentAttendance: toPercentageDataSet(administrativeDivision.studentAttendance),
        teacherAttendance: toPercentageDataSet(administrativeDivision.teacherAttendance),
        adminAttendance: toPercentageDataSet(administrativeDivision.adminAttendance),
        maleStudentAbsencePercentageOverStudentAbsence: toPercentageDataSet(
          administrativeDivision.maleStudentAbsencePercentageOverStudentAbsence
        ),
        femaleStudentAbsencePercentageOverStudentAbsence: toPercentageDataSet(
          administrativeDivision.femaleStudentAbsencePercentageOverStudentAbsence
        ),
        schools: administrativeDivision.schools.toLocaleString('es-MX'),
        students: toNumericDataSet(administrativeDivision.students),
        femaleStudents: toNumericDataSet(administrativeDivision.femaleStudents),
        maleStudents: toNumericDataSet(administrativeDivision.maleStudents),
        femaleStudentPercentage: toPercentageDataSet(administrativeDivision.femaleStudentPercentage),
        maleStudentPercentage: toPercentageDataSet(administrativeDivision.maleStudentPercentage),
        teachers: administrativeDivision.teachers.toLocaleString('es-MX'),
        assistants: administrativeDivision.assistants.toLocaleString('es-MX'),
        directors: administrativeDivision.directors.toLocaleString('es-MX'),
        subDirectors: administrativeDivision.subDirectors.toLocaleString('es-MX'),
        technicalPedagogicalAdvisers: administrativeDivision.technicalPedagogicalAdvisers.toLocaleString('es-MX'),
        physicalEducationTeachers: administrativeDivision.physicalEducationTeachers.toLocaleString('es-MX'),
        admins: administrativeDivision.admins.toLocaleString('es-MX'),
        quartermasters: administrativeDivision.quartermasters.toLocaleString('es-MX'),
        others: administrativeDivision.others.toLocaleString('es-MX'),
        schoolGivingClasses: {
          '1': toNumericDataSet(administrativeDivision.schoolGivingClasses['1']),
          '2': toNumericDataSet(administrativeDivision.schoolGivingClasses['2']),
          '3': toNumericDataSet(administrativeDivision.schoolGivingClasses['3']),
          '4': toNumericDataSet(administrativeDivision.schoolGivingClasses['4']),
          '5': toNumericDataSet(administrativeDivision.schoolGivingClasses['5']),
          '6': toNumericDataSet(administrativeDivision.schoolGivingClasses['6']),
          '7': toNumericDataSet(administrativeDivision.schoolGivingClasses['7']),
        },
        schoolGivingClassesPercentages: {
          '1': toPercentageDataSet(administrativeDivision.schoolGivingClassesPercentages['1']),
          '2': toPercentageDataSet(administrativeDivision.schoolGivingClassesPercentages['2']),
          '3': toPercentageDataSet(administrativeDivision.schoolGivingClassesPercentages['3']),
          '4': toPercentageDataSet(administrativeDivision.schoolGivingClassesPercentages['4']),
          '5': toPercentageDataSet(administrativeDivision.schoolGivingClassesPercentages['5']),
          '6': toPercentageDataSet(administrativeDivision.schoolGivingClassesPercentages['6']),
          '7': toPercentageDataSet(administrativeDivision.schoolGivingClassesPercentages['7']),
        },
        schoolWaterSupply: {
          '1': toNumericDataSet(administrativeDivision.schoolWaterSupply['1']),
          '2': toNumericDataSet(administrativeDivision.schoolWaterSupply['2']),
          '3': toNumericDataSet(administrativeDivision.schoolWaterSupply['3']),
          '4': toNumericDataSet(administrativeDivision.schoolWaterSupply['4']),
        },
        schoolWaterSupplyPercentages: {
          '1': toPercentageDataSet(administrativeDivision.schoolWaterSupplyPercentages['1']),
          '2': toPercentageDataSet(administrativeDivision.schoolWaterSupplyPercentages['2']),
          '3': toPercentageDataSet(administrativeDivision.schoolWaterSupplyPercentages['3']),
          '4': toPercentageDataSet(administrativeDivision.schoolWaterSupplyPercentages['4']),
        },
        schoolWaterServiceContinuity: {
          '1': toNumericDataSet(administrativeDivision.schoolWaterServiceContinuity['1']),
          '2': toNumericDataSet(administrativeDivision.schoolWaterServiceContinuity['2']),
          '3': toNumericDataSet(administrativeDivision.schoolWaterServiceContinuity['3']),
          '4': toNumericDataSet(administrativeDivision.schoolWaterServiceContinuity['4']),
        },
        schoolWaterServiceContinuityPercentages: {
          '1': toPercentageDataSet(administrativeDivision.schoolWaterServiceContinuityPercentages['1']),
          '2': toPercentageDataSet(administrativeDivision.schoolWaterServiceContinuityPercentages['2']),
          '3': toPercentageDataSet(administrativeDivision.schoolWaterServiceContinuityPercentages['3']),
          '4': toPercentageDataSet(administrativeDivision.schoolWaterServiceContinuityPercentages['4']),
        },
        schoolWithWaterForHandWashing: {
          '1': toNumericDataSet(administrativeDivision.schoolWithWaterForHandWashing['1']),
          '2': toNumericDataSet(administrativeDivision.schoolWithWaterForHandWashing['2']),
        },
        schoolWithWaterForHandWashingPercentages: {
          '1': toPercentageDataSet(administrativeDivision.schoolWithWaterForHandWashingPercentages['1']),
          '2': toPercentageDataSet(administrativeDivision.schoolWithWaterForHandWashingPercentages['2']),
        },
        schoolSinkSufficiency: {
          '1': toNumericDataSet(administrativeDivision.schoolSinkSufficiency['1']),
          '2': toNumericDataSet(administrativeDivision.schoolSinkSufficiency['2']),
          '3': toNumericDataSet(administrativeDivision.schoolSinkSufficiency['3']),
        },
        schoolSinkSufficiencyPercentages: {
          '1': toPercentageDataSet(administrativeDivision.schoolSinkSufficiencyPercentages['1']),
          '2': toPercentageDataSet(administrativeDivision.schoolSinkSufficiencyPercentages['2']),
          '3': toPercentageDataSet(administrativeDivision.schoolSinkSufficiencyPercentages['3']),
        },
        schoolSoapSufficiency: {
          '1': toNumericDataSet(administrativeDivision.schoolSoapSufficiency['1']),
          '2': toNumericDataSet(administrativeDivision.schoolSoapSufficiency['2']),
          '3': toNumericDataSet(administrativeDivision.schoolSoapSufficiency['3']),
        },
        schoolSoapSufficiencyPercentages: {
          '1': toPercentageDataSet(administrativeDivision.schoolSoapSufficiencyPercentages['1']),
          '2': toPercentageDataSet(administrativeDivision.schoolSoapSufficiencyPercentages['2']),
          '3': toPercentageDataSet(administrativeDivision.schoolSoapSufficiencyPercentages['3']),
        },
        schoolTowelSufficiency: {
          '1': toNumericDataSet(administrativeDivision.schoolTowelSufficiency['1']),
          '2': toNumericDataSet(administrativeDivision.schoolTowelSufficiency['2']),
          '3': toNumericDataSet(administrativeDivision.schoolTowelSufficiency['3']),
        },
        schoolTowelSufficiencyPercentages: {
          '1': toPercentageDataSet(administrativeDivision.schoolTowelSufficiencyPercentages['1']),
          '2': toPercentageDataSet(administrativeDivision.schoolTowelSufficiencyPercentages['2']),
          '3': toPercentageDataSet(administrativeDivision.schoolTowelSufficiencyPercentages['3']),
        },
        schoolSanitizerSufficiency: {
          '1': toNumericDataSet(administrativeDivision.schoolSanitizerSufficiency['1']),
          '2': toNumericDataSet(administrativeDivision.schoolSanitizerSufficiency['2']),
          '3': toNumericDataSet(administrativeDivision.schoolSanitizerSufficiency['3']),
        },
        schoolSanitizerSufficiencyPercentages: {
          '1': toPercentageDataSet(administrativeDivision.schoolSanitizerSufficiencyPercentages['1']),
          '2': toPercentageDataSet(administrativeDivision.schoolSanitizerSufficiencyPercentages['2']),
          '3': toPercentageDataSet(administrativeDivision.schoolSanitizerSufficiencyPercentages['3']),
        },
        schoolBinSufficiency: {
          '1': toNumericDataSet(administrativeDivision.schoolBinSufficiency['1']),
          '2': toNumericDataSet(administrativeDivision.schoolBinSufficiency['2']),
          '3': toNumericDataSet(administrativeDivision.schoolBinSufficiency['3']),
        },
        schoolBinSufficiencyPercentages: {
          '1': toPercentageDataSet(administrativeDivision.schoolBinSufficiencyPercentages['1']),
          '2': toPercentageDataSet(administrativeDivision.schoolBinSufficiencyPercentages['2']),
          '3': toPercentageDataSet(administrativeDivision.schoolBinSufficiencyPercentages['3']),
        },
        schoolWithSepticSystem: {
          '1': toNumericDataSet(administrativeDivision.schoolWithSepticSystem['1']),
          '2': toNumericDataSet(administrativeDivision.schoolWithSepticSystem['2']),
        },
        schoolWithSepticSystemPercentages: {
          '1': toPercentageDataSet(administrativeDivision.schoolWithSepticSystemPercentages['1']),
          '2': toPercentageDataSet(administrativeDivision.schoolWithSepticSystemPercentages['2']),
        },
        schoolWithAbilityToReorganizeSpace: {
          '1': toNumericDataSet(administrativeDivision.schoolWithAbilityToReorganizeSpace['1']),
          '2': toNumericDataSet(administrativeDivision.schoolWithAbilityToReorganizeSpace['2']),
        },
        schoolWithAbilityToReorganizeSpacePercentages: {
          '1': toPercentageDataSet(administrativeDivision.schoolWithAbilityToReorganizeSpacePercentages['1']),
          '2': toPercentageDataSet(administrativeDivision.schoolWithAbilityToReorganizeSpacePercentages['2']),
        },
        hygieneCommittee: {
          '1': toNumericDataSet(administrativeDivision.hygieneCommittee['1']),
          '2': toNumericDataSet(administrativeDivision.hygieneCommittee['2']),
        },
        hygieneCommitteePercentages: {
          '1': toPercentageDataSet(administrativeDivision.hygieneCommitteePercentages['1']),
          '2': toPercentageDataSet(administrativeDivision.hygieneCommitteePercentages['2']),
        },
        alternatesAttendance: {
          '1': toNumericDataSet(administrativeDivision.alternatesAttendance['1']),
          '2': toNumericDataSet(administrativeDivision.alternatesAttendance['2']),
        },
        alternatesAttendancePercentages: {
          '1': toPercentageDataSet(administrativeDivision.alternatesAttendancePercentages['1']),
          '2': toPercentageDataSet(administrativeDivision.alternatesAttendancePercentages['2']),
        },
        absentFemaleStudents: administrativeDivision.absentFemaleStudents.toString(),
        absentMaleStudents: administrativeDivision.absentMaleStudents.toString(),
        studentAbsenceMainReasons: {
          '1': toNumericDataSet(administrativeDivision.studentAbsenceMainReasons['1']),
          '2': toNumericDataSet(administrativeDivision.studentAbsenceMainReasons['2']),
          '3': toNumericDataSet(administrativeDivision.studentAbsenceMainReasons['3']),
          '4': toNumericDataSet(administrativeDivision.studentAbsenceMainReasons['4']),
          '5': toNumericDataSet(administrativeDivision.studentAbsenceMainReasons['5']),
        },
        studentAbsenceMainReasonsPercentages: {
          '1': toPercentageDataSet(administrativeDivision.studentAbsenceMainReasonsPercentages['1']),
          '2': toPercentageDataSet(administrativeDivision.studentAbsenceMainReasonsPercentages['2']),
          '3': toPercentageDataSet(administrativeDivision.studentAbsenceMainReasonsPercentages['3']),
          '4': toPercentageDataSet(administrativeDivision.studentAbsenceMainReasonsPercentages['4']),
          '5': toPercentageDataSet(administrativeDivision.studentAbsenceMainReasonsPercentages['5']),
        },
        absentTeachers: administrativeDivision.absentTeachers.toString(),
        teacherAbsenceMainReasons: {
          '1': toNumericDataSet(administrativeDivision.teacherAbsenceMainReasons['1']),
          '2': toNumericDataSet(administrativeDivision.teacherAbsenceMainReasons['2']),
          '3': toNumericDataSet(administrativeDivision.teacherAbsenceMainReasons['3']),
          '4': toNumericDataSet(administrativeDivision.teacherAbsenceMainReasons['4']),
        },
        teacherAbsenceMainReasonsPercentages: {
          '1': toPercentageDataSet(administrativeDivision.teacherAbsenceMainReasonsPercentages['1']),
          '2': toPercentageDataSet(administrativeDivision.teacherAbsenceMainReasonsPercentages['2']),
          '3': toPercentageDataSet(administrativeDivision.teacherAbsenceMainReasonsPercentages['3']),
          '4': toPercentageDataSet(administrativeDivision.teacherAbsenceMainReasonsPercentages['4']),
        },
        absentAdmins: administrativeDivision.absentAdmins.toString(),
        adminsAbsenceMainReasons: {
          '1': toNumericDataSet(administrativeDivision.adminAbsenceMainReasons['1']),
          '2': toNumericDataSet(administrativeDivision.adminAbsenceMainReasons['2']),
          '3': toNumericDataSet(administrativeDivision.adminAbsenceMainReasons['3']),
          '4': toNumericDataSet(administrativeDivision.adminAbsenceMainReasons['4']),
        },
        adminsAbsenceMainReasonsPercentages: {
          '1': toPercentageDataSet(administrativeDivision.adminAbsenceMainReasonsPercentages['1']),
          '2': toPercentageDataSet(administrativeDivision.adminAbsenceMainReasonsPercentages['2']),
          '3': toPercentageDataSet(administrativeDivision.adminAbsenceMainReasonsPercentages['3']),
          '4': toPercentageDataSet(administrativeDivision.adminAbsenceMainReasonsPercentages['4']),
        },
        takenActionsPercentages: {
          visits: toPercentageDataSet(administrativeDivision.takenActionsPercentages.visits),
          calls: toPercentageDataSet(administrativeDivision.takenActionsPercentages.calls),
          scholarship: toPercentageDataSet(administrativeDivision.takenActionsPercentages.scholarship),
          none: toPercentageDataSet(administrativeDivision.takenActionsPercentages.none),
        },
        drinkers: toNumericDataSet(administrativeDivision.drinkers),
        maleStudentToilets: toNumericDataSet(administrativeDivision.maleStudentToilets),
        femaleStudentToilets: toNumericDataSet(administrativeDivision.femaleStudentToilets),
        foodSupportPercentages: {
          '1': toPercentageDataSet(administrativeDivision.foodSupportPercentages['1']),
          '2': toPercentageDataSet(administrativeDivision.foodSupportPercentages['2']),
        },
        foodSupportTypePercentages: {
          dif: toPercentageDataSet(administrativeDivision.foodSupportTypePercentages.dif),
          fullTimeProgram: toPercentageDataSet(administrativeDivision.foodSupportTypePercentages.fullTimeProgram),
          state: toPercentageDataSet(administrativeDivision.foodSupportTypePercentages.state),
          others: toPercentageDataSet(administrativeDivision.foodSupportTypePercentages.others),
        },
        theSchoolIsOursPercentages: {
          '1': toPercentageDataSet(administrativeDivision.theSchoolIsOursPercentages['1']),
          '2': toPercentageDataSet(administrativeDivision.theSchoolIsOursPercentages['2']),
        },
      }
    : {
        support: { private: toPercentageDataSet(-1), public: toPercentageDataSet(-1) },
        studentAttendance: toPercentageDataSet(-1),
        teacherAttendance: toPercentageDataSet(-1),
        adminAttendance: toPercentageDataSet(-1),
        maleStudentAbsencePercentageOverStudentAbsence: toPercentageDataSet(-1),
        femaleStudentAbsencePercentageOverStudentAbsence: toPercentageDataSet(-1),
        schools: '-',
        students: toNumericDataSet(-1),
        femaleStudents: toNumericDataSet(-1),
        maleStudents: toNumericDataSet(-1),
        femaleStudentPercentage: toPercentageDataSet(-1),
        maleStudentPercentage: toPercentageDataSet(-1),
        teachers: '-',
        assistants: '-',
        directors: '-',
        subDirectors: '-',
        technicalPedagogicalAdvisers: '-',
        physicalEducationTeachers: '-',
        admins: '-',
        quartermasters: '-',
        others: '-',
        schoolGivingClasses: {
          '1': toNumericDataSet(-1),
          '2': toNumericDataSet(-1),
          '3': toNumericDataSet(-1),
          '4': toNumericDataSet(-1),
          '5': toNumericDataSet(-1),
          '6': toNumericDataSet(-1),
          '7': toNumericDataSet(-1),
        },
        schoolGivingClassesPercentages: {
          '1': toPercentageDataSet(-1),
          '2': toPercentageDataSet(-1),
          '3': toPercentageDataSet(-1),
          '4': toPercentageDataSet(-1),
          '5': toPercentageDataSet(-1),
          '6': toPercentageDataSet(-1),
          '7': toPercentageDataSet(-1),
        },
        schoolWaterSupply: {
          '1': toNumericDataSet(-1),
          '2': toNumericDataSet(-1),
          '3': toNumericDataSet(-1),
          '4': toNumericDataSet(-1),
        },
        schoolWaterSupplyPercentages: {
          '1': toPercentageDataSet(-1),
          '2': toPercentageDataSet(-1),
          '3': toPercentageDataSet(-1),
          '4': toPercentageDataSet(-1),
        },
        schoolWaterServiceContinuity: {
          '1': toNumericDataSet(-1),
          '2': toNumericDataSet(-1),
          '3': toNumericDataSet(-1),
          '4': toNumericDataSet(-1),
        },
        schoolWaterServiceContinuityPercentages: {
          '1': toPercentageDataSet(-1),
          '2': toPercentageDataSet(-1),
          '3': toPercentageDataSet(-1),
          '4': toPercentageDataSet(-1),
        },
        schoolWithWaterForHandWashing: {
          '1': toNumericDataSet(-1),
          '2': toNumericDataSet(-1),
        },
        schoolWithWaterForHandWashingPercentages: {
          '1': toPercentageDataSet(-1),
          '2': toPercentageDataSet(-1),
        },
        schoolSinkSufficiency: {
          '1': toNumericDataSet(-1),
          '2': toNumericDataSet(-1),
          '3': toNumericDataSet(-1),
        },
        schoolSinkSufficiencyPercentages: {
          '1': toPercentageDataSet(-1),
          '2': toPercentageDataSet(-1),
          '3': toPercentageDataSet(-1),
        },
        schoolSoapSufficiency: {
          '1': toNumericDataSet(-1),
          '2': toNumericDataSet(-1),
          '3': toNumericDataSet(-1),
        },
        schoolSoapSufficiencyPercentages: {
          '1': toPercentageDataSet(-1),
          '2': toPercentageDataSet(-1),
          '3': toPercentageDataSet(-1),
        },
        schoolTowelSufficiency: {
          '1': toNumericDataSet(-1),
          '2': toNumericDataSet(-1),
          '3': toNumericDataSet(-1),
        },
        schoolTowelSufficiencyPercentages: {
          '1': toPercentageDataSet(-1),
          '2': toPercentageDataSet(-1),
          '3': toPercentageDataSet(-1),
        },
        schoolSanitizerSufficiency: {
          '1': toNumericDataSet(-1),
          '2': toNumericDataSet(-1),
          '3': toNumericDataSet(-1),
        },
        schoolSanitizerSufficiencyPercentages: {
          '1': toPercentageDataSet(-1),
          '2': toPercentageDataSet(-1),
          '3': toPercentageDataSet(-1),
        },
        schoolBinSufficiency: {
          '1': toNumericDataSet(-1),
          '2': toNumericDataSet(-1),
          '3': toNumericDataSet(-1),
        },
        schoolBinSufficiencyPercentages: {
          '1': toPercentageDataSet(-1),
          '2': toPercentageDataSet(-1),
          '3': toPercentageDataSet(-1),
        },
        schoolWithSepticSystem: {
          '1': toNumericDataSet(-1),
          '2': toNumericDataSet(-1),
        },
        schoolWithSepticSystemPercentages: {
          '1': toPercentageDataSet(-1),
          '2': toPercentageDataSet(-1),
        },
        schoolWithAbilityToReorganizeSpace: {
          '1': toNumericDataSet(-1),
          '2': toNumericDataSet(-1),
        },
        schoolWithAbilityToReorganizeSpacePercentages: {
          '1': toPercentageDataSet(-1),
          '2': toPercentageDataSet(-1),
        },
        hygieneCommittee: {
          '1': toNumericDataSet(-1),
          '2': toNumericDataSet(-1),
        },
        hygieneCommitteePercentages: {
          '1': toPercentageDataSet(-1),
          '2': toPercentageDataSet(-1),
        },
        alternatesAttendance: {
          '1': toNumericDataSet(-1),
          '2': toNumericDataSet(-1),
        },
        alternatesAttendancePercentages: {
          '1': toPercentageDataSet(-1),
          '2': toPercentageDataSet(-1),
        },
        absentFemaleStudents: '-',
        absentMaleStudents: '-',
        studentAbsenceMainReasons: {
          '1': toNumericDataSet(-1),
          '2': toNumericDataSet(-1),
          '3': toNumericDataSet(-1),
          '4': toNumericDataSet(-1),
          '5': toNumericDataSet(-1),
        },
        studentAbsenceMainReasonsPercentages: {
          '1': toPercentageDataSet(-1),
          '2': toPercentageDataSet(-1),
          '3': toPercentageDataSet(-1),
          '4': toPercentageDataSet(-1),
          '5': toPercentageDataSet(-1),
        },
        absentTeachers: '-',
        teacherAbsenceMainReasons: {
          '1': toNumericDataSet(-1),
          '2': toNumericDataSet(-1),
          '3': toNumericDataSet(-1),
          '4': toNumericDataSet(-1),
        },
        teacherAbsenceMainReasonsPercentages: {
          '1': toPercentageDataSet(-1),
          '2': toPercentageDataSet(-1),
          '3': toPercentageDataSet(-1),
          '4': toPercentageDataSet(-1),
        },
        absentAdmins: '-',
        adminsAbsenceMainReasons: {
          '1': toNumericDataSet(-1),
          '2': toNumericDataSet(-1),
          '3': toNumericDataSet(-1),
          '4': toNumericDataSet(-1),
        },
        adminsAbsenceMainReasonsPercentages: {
          '1': toPercentageDataSet(-1),
          '2': toPercentageDataSet(-1),
          '3': toPercentageDataSet(-1),
          '4': toPercentageDataSet(-1),
        },
        takenActionsPercentages: {
          visits: toPercentageDataSet(-1),
          calls: toPercentageDataSet(-1),
          scholarship: toPercentageDataSet(-1),
          none: toPercentageDataSet(-1),
        },
        drinkers: toNumericDataSet(-1),
        maleStudentToilets: toNumericDataSet(-1),
        femaleStudentToilets: toNumericDataSet(-1),
        foodSupportPercentages: {
          '1': toPercentageDataSet(-1),
          '2': toPercentageDataSet(-1),
        },
        foodSupportTypePercentages: {
          dif: toPercentageDataSet(-1),
          fullTimeProgram: toPercentageDataSet(-1),
          state: toPercentageDataSet(-1),
          others: toPercentageDataSet(-1),
        },
        theSchoolIsOursPercentages: {
          '1': toPercentageDataSet(-1),
          '2': toPercentageDataSet(-1),
        },
      };
