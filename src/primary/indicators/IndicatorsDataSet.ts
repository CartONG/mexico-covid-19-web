import { Country } from '@/domain/country/Country';
import { Municipality } from '@/domain/municipality/Municipality';
import { State } from '@/domain/state/State';

export interface IndicatorsDataSet {
  schools: { text: string; color: string };
  sinkSufficiencyPercentage: { text: string; color: string };
  soapSufficiencyPercentage: { text: string; color: string };
  abilityToReorganizeSpacePercentage: { text: string; color: string };
}

const toPercentage = (rate: number): string => `${(Math.round(rate * 100 * 10) / 10).toString()} %`;
const validNumber = (toValid: number) => !isNaN(toValid);
const validRate = (rate: number) => validNumber(rate) && rate >= 0 && rate <= 1;

export const toIndicatorDataSet = (entity: Country | State | Municipality | undefined): IndicatorsDataSet => {
  const indicatorsDataSet = {
    schools: { text: '-', color: 'grey-lighter' },
    sinkSufficiencyPercentage: { text: '-', color: 'grey-lighter' },
    soapSufficiencyPercentage: { text: '-', color: 'grey-lighter' },
    abilityToReorganizeSpacePercentage: { text: '-', color: 'grey-lighter' },
  };

  if (entity && entity.report.totalSchools) {
    indicatorsDataSet.schools = { text: entity.report.totalSchools.toString(), color: 'secondary' };
  }

  if (entity && validRate(entity.report.schoolSinkSufficiencyPercentages['1'])) {
    indicatorsDataSet.sinkSufficiencyPercentage = {
      text: toPercentage(entity.report.schoolSinkSufficiencyPercentages['1']),
      color: 'secondary',
    };
  }

  if (entity && validRate(entity.report.schoolSoapSufficiencyPercentages['1'])) {
    indicatorsDataSet.soapSufficiencyPercentage = {
      text: toPercentage(entity.report.schoolSoapSufficiencyPercentages['1']),
      color: 'secondary',
    };
  }

  if (entity && validRate(entity.report.schoolWithAbilityToReorganizeSpacePercentages['1'])) {
    indicatorsDataSet.abilityToReorganizeSpacePercentage = {
      text: toPercentage(entity.report.schoolWithAbilityToReorganizeSpacePercentages['1']),
      color: 'secondary',
    };
  }

  return indicatorsDataSet;
};
