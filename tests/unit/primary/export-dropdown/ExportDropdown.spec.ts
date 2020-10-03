import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import Buefy from 'buefy';

import { stubCsvParser, stubFileDownloader } from '../../TestUtils';
import { makeAdministrativeDivision } from '../AdministrativeDivision.fixture';
import { makeSchool } from '../School.fixture';

import { AdministrativeDivision } from '@/domain/administrative-division/AdministrativeDivision';
import { AdministrativeDivisionTypes } from '@/domain/administrative-division/AdministrativeDivisionTypes';
import { School } from '@/domain/school/School';
import { CsvParser } from '@/primary/CsvParser';
import { ExportDropdownComponent, ExportDropdownVue } from '@/primary/export-dropdown';
import { toAdministrativeDivisionCsvExportContent } from '@/primary/export-dropdown/AdministrativeDivisionCsvExportContent';
import { toSchoolCsvExportContent } from '@/primary/export-dropdown/SchoolCsvExportContent';
import { FileDownloader } from '@/primary/FileDownloader';

let wrapper: Wrapper<ExportDropdownComponent>;
let component: ExportDropdownComponent;

interface WrapperOptions {
  administrativeDivision: AdministrativeDivision;
  school: School;
  administrativeDivisionLevel: boolean;
  csvParser: CsvParser;
  fileDownloader: FileDownloader;
}

const wrap = (override: Partial<WrapperOptions> = {}) => {
  const options = {
    administrativeDivision: makeAdministrativeDivision({ type: AdministrativeDivisionTypes.MUNICIPALITY }),
    school: makeSchool(),
    administrativeDivisionLevel: true,
    csvParser: stubCsvParser(),
    fileDownloader: stubFileDownloader(),
    ...override,
  };
  const localVue = createLocalVue();
  localVue.use(Buefy);
  wrapper = shallowMount<ExportDropdownComponent>(ExportDropdownVue, {
    localVue,
    propsData: {
      administrativeDivision: options.administrativeDivision,
      school: options.school,
      administrativeDivisionLevel: options.administrativeDivisionLevel,
    },
    provide: {
      csvParser: () => options.csvParser,
      fileDownloader: () => options.fileDownloader,
    },
  });
  component = wrapper.vm;
};

describe('ExportDropdown', () => {
  it('should be a Vue instance', () => {
    wrap();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('should download administrative division data', () => {
    const csvParser = new CsvParser();
    const fileDownloader = stubFileDownloader();
    wrap({ csvParser, fileDownloader });
    component.downloadCsv();
    const [filename, content, contentType] = fileDownloader.download.getCall(0).args;
    expect(filename).toBe('BAJA CALIFORNIA SUR.csv');
    expect(content).toBe(
      csvParser.toCsvString(
        toAdministrativeDivisionCsvExportContent(makeAdministrativeDivision({ type: AdministrativeDivisionTypes.MUNICIPALITY }))
      )
    );
    expect(contentType).toBe('text/csv');
  });

  it('should download school data', () => {
    const csvParser = new CsvParser();
    const fileDownloader = stubFileDownloader();
    wrap({ csvParser, fileDownloader, administrativeDivisionLevel: false });
    component.downloadCsv();
    const [filename, content, contentType] = fileDownloader.download.getCall(0).args;
    expect(filename).toBe('CURSO COMUNITARIO DE EDUCACION PREESCOLAR.csv');
    expect(content).toBe(csvParser.toCsvString(toSchoolCsvExportContent(makeSchool())));
    expect(contentType).toBe('text/csv');
  });

  it('should download country data', () => {
    const csvParser = new CsvParser();
    const fileDownloader = stubFileDownloader();
    wrap({
      csvParser,
      fileDownloader,
      administrativeDivision: makeAdministrativeDivision({ name: '', type: AdministrativeDivisionTypes.COUNTRY }),
    });
    component.downloadCsv();
    const [filename, content, contentType] = fileDownloader.download.getCall(0).args;
    expect(filename).toBe('México.csv');
    expect(content).toBe(
      csvParser.toCsvString(
        toAdministrativeDivisionCsvExportContent(makeAdministrativeDivision({ name: '', type: AdministrativeDivisionTypes.COUNTRY }))
      )
    );
    expect(contentType).toBe('text/csv');
  });
});
