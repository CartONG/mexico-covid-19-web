export interface NumericDataSet {
  text: string;
  value: number;
}

const validNumber = (toValid: number) => !isNaN(toValid) && toValid >= 0;

export const toNumericDataSet = (numericValue: number) => ({
  text: validNumber(numericValue) ? numericValue.toLocaleString('es-MX') : '-',
  value: validNumber(numericValue) ? numericValue : 0,
});
