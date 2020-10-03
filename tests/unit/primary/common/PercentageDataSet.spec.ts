import { toPercentageDataSet } from '@/primary/common/PercentageDataSet';

const expectColor = (value: number, expectedColor: string) => {
  expect(toPercentageDataSet(value).color).toBe(expectedColor);
};

describe('PercentageDataSet', () => {
  it('should set color', () => {
    expectColor(-1, 'unknown');
    expectColor(0.6, 'danger-darker');
    expectColor(0.75, 'danger');
    expectColor(0.85, 'warning');
    expectColor(0.92, 'success');
    expectColor(0.97, 'success-darker');
    expectColor(1.1, 'unknown');
  });
});
