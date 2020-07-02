export interface PercentageDataSet {
  text: string;
  color: string;
  value: number;
}

const validNumber = (toValid: number) => !isNaN(toValid);
const validRate = (rate: number) => validNumber(rate) && rate >= 0 && rate <= 1;
const toText = (rate: number): string => (validRate(rate) ? `${(Math.round(rate * 100 * 10) / 10).toString()} %` : '-');

const toColor = (rate: number) => {
  if (rate >= 0 && rate <= 0.25) {
    return 'danger';
  }

  if (rate > 0.25 && rate < 0.75) {
    return 'warning';
  }

  if (rate >= 0.75 && rate <= 1) {
    return 'success';
  }

  return 'unknown';
};

export const toPercentageDataSet = (rate: number) => ({
  text: toText(rate),
  color: toColor(rate),
  value: validRate(rate) ? rate : 0,
});
