import { CsvParser } from '@/primary/CsvParser';

describe('CsvParser', () => {
  it('should parse JSON', () => {
    const json = { name: 'name 1', value: 'value 1' };
    const csvParser = new CsvParser();
    const split = csvParser.toCsvString(json).split('\n');
    expect(split[1]).toBe('name 1,value 1');
  });
});
