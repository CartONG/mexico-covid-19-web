import { AdministrativeDivision } from '@/domain/administrative-division/AdministrativeDivision';
import { School } from '@/domain/school/School';

export interface IndicatorsDataSet {
  school: { label: string; text: string; color: string };
  sinkSufficiency: { label: string; text: string; color: string };
  soapSufficiency: { label: string; text: string; color: string };
  abilityToReorganizeSpace: { label: string; text: string; color: string };
}

const SUFFICIENCY_LABELS = ['', 'Suficiente', 'Insuficiente', 'No cuenta'];
const YES_NO_LABELS = ['', 'Si', 'No'];

const toPercentage = (rate: number): string => `${(Math.round(rate * 100 * 10) / 10).toString()} %`;
const validNumber = (toValid: number) => !isNaN(toValid);
const validRate = (rate: number) => validNumber(rate) && rate >= 0 && rate <= 1;
const validSufficiencyValue = (value: number) => validNumber(value) && value >= 1 && value <= 3;
const validYesNoValue = (value: number) => validNumber(value) && value >= 1 && value <= 2;

export const mergedReportToIndicatorDataSet = (entity: AdministrativeDivision | undefined): IndicatorsDataSet => {
  const indicatorsDataSet = {
    school: { label: 'Total de escuelas', text: '-', color: 'grey-lighter' },
    sinkSufficiency: { label: 'Existencia de lavamanos en la escuela', text: '-', color: 'grey-lighter' },
    soapSufficiency: { label: 'Existencia de Jabón para lavado de manos', text: '-', color: 'grey-lighter' },
    abilityToReorganizeSpace: { label: 'La escuela puede reoganizar los espacios educativos', text: '-', color: 'grey-lighter' },
  };

  if (entity && entity.schools) {
    indicatorsDataSet.school = { ...indicatorsDataSet.school, text: entity.schools.toString(), color: 'secondary' };
  }

  if (entity && validRate(entity.schoolSinkSufficiency['1'])) {
    indicatorsDataSet.sinkSufficiency = {
      ...indicatorsDataSet.sinkSufficiency,
      text: toPercentage(entity.schoolSinkSufficiency['1']),
      color: 'secondary',
    };
  }

  if (entity && validRate(entity.schoolSoapSufficiency['1'])) {
    indicatorsDataSet.soapSufficiency = {
      ...indicatorsDataSet.soapSufficiency,
      text: toPercentage(entity.schoolSoapSufficiency['1']),
      color: 'secondary',
    };
  }

  if (entity && validRate(entity.schoolWithAbilityToReorganizeSpace['1'])) {
    indicatorsDataSet.abilityToReorganizeSpace = {
      ...indicatorsDataSet.abilityToReorganizeSpace,
      text: toPercentage(entity.schoolWithAbilityToReorganizeSpace['1']),
      color: 'secondary',
    };
  }

  return indicatorsDataSet;
};

export const toIndicatorDataSet = (school: School | undefined): IndicatorsDataSet => {
  const indicatorsDataSet = {
    school: { label: 'Hay clases', text: '-', color: 'grey-lighter' },
    sinkSufficiency: { label: 'Existencia de lavamanos en la escuela', text: '-', color: 'grey-lighter' },
    soapSufficiency: { label: 'Existencia de Jabón para lavado de manos', text: '-', color: 'grey-lighter' },
    abilityToReorganizeSpace: { label: 'La escuela puede reoganizar los espacios educativos', text: '-', color: 'grey-lighter' },
  };

  if (school && validNumber(school.givesClasses)) {
    indicatorsDataSet.school = {
      ...indicatorsDataSet.school,
      text: school.givesClasses === 1 ? 'Si' : 'No',
      color: 'secondary',
    };
  }

  if (school && validSufficiencyValue(school.sinkSufficiency)) {
    indicatorsDataSet.sinkSufficiency = {
      ...indicatorsDataSet.sinkSufficiency,
      text: SUFFICIENCY_LABELS[school.sinkSufficiency],
      color: 'secondary',
    };
  }

  if (school && validSufficiencyValue(school.soapSufficiency)) {
    indicatorsDataSet.soapSufficiency = {
      ...indicatorsDataSet.soapSufficiency,
      text: SUFFICIENCY_LABELS[school.soapSufficiency],
      color: 'secondary',
    };
  }

  if (school && validYesNoValue(school.hasAbilityToReorganizeSpace)) {
    indicatorsDataSet.abilityToReorganizeSpace = {
      ...indicatorsDataSet.abilityToReorganizeSpace,
      text: YES_NO_LABELS[school.hasAbilityToReorganizeSpace],
      color: 'secondary',
    };
  }

  return indicatorsDataSet;
};
