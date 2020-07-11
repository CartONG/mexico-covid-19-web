export interface PercentageDataSet {
  text: string;
  color: string;
  value: number;
}

const validNumber = (toValid: number) => !isNaN(toValid);
const validRate = (rate: number) => validNumber(rate) && rate >= 0 && rate <= 1;
const toText = (rate: number): string => (validRate(rate) ? `${(Math.round(rate * 100 * 10) / 10).toString()}%` : '-');

const toColor = (rate: number) => {
  if (rate >= 0 && rate <= 0.7) {
    return 'danger-darker';
  }
  if (rate > 0.7 && rate <= 0.8) {
    return 'danger';
  }
  if (rate > 0.8 && rate <= 0.9) {
    return 'warning';
  }
  if (rate > 0.9 && rate <= 0.95) {
    return 'success';
  }
  if (rate > 0.95 && rate <= 1) {
    return 'success-darker';
  }
  return 'grey';
};

export const toPercentageDataSet = (rate: number) => ({
  text: toText(rate),
  color: toColor(rate),
  value: validRate(rate) ? rate : 0,
});
