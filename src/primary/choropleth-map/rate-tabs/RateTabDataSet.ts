import { RateTypes } from '@/primary/RateTypes';

export interface RateTabDataSet {
  text: string;
  percentage: string;
  percentageColor: string;
  rateType: RateTypes;
}

const toPercentage = (rate: number): string => `${(Math.round(rate * 100 * 10) / 10).toString()} %`;

export const toRateTabDataSet = (text: string, rateType: RateTypes, rate: number): RateTabDataSet => {
  let classes: string[] = [];
  let percentage = '-';
  let percentageColor = 'unknown';

  if (rate >= 0 && rate <= 0.25) {
    percentage = toPercentage(rate);
    percentageColor = 'success';
  }

  if (rate > 0.25 && rate < 0.75) {
    percentage = toPercentage(rate);
    percentageColor = 'warning';
  }

  if (rate >= 0.75 && rate <= 1) {
    percentage = toPercentage(rate);
    percentageColor = 'danger';
  }

  return { percentageColor, text, percentage, rateType };
};
