import { unparse } from 'papaparse';

export class CsvParser {
  constructor() {}

  toCsvString = (json: any) => {
    return unparse([json]);
  };
}
