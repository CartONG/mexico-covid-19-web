import { Component, Inject, Prop, Vue } from 'vue-property-decorator';

import { AdministrativeDivision } from '@/domain/administrative-division/AdministrativeDivision';
import { School } from '@/domain/school/School';
import { CsvParser } from '@/primary/CsvParser';
import { toAdministrativeDivisionCsvExportContent } from '@/primary/export-dropdown/AdministrativeDivisionCsvExportContent';
import { toSchoolCsvExportContent } from '@/primary/export-dropdown/SchoolCsvExportContent';
import { FileDownloader } from '@/primary/FileDownloader';

@Component
export default class DownloadDropdown extends Vue {
  @Prop()
  administrativeDivision!: AdministrativeDivision;

  @Prop()
  school!: School;

  @Prop()
  administrativeDivisionLevel!: boolean;

  @Inject()
  csvParser!: () => CsvParser;

  @Inject()
  fileDownloader!: () => FileDownloader;

  downloadCsv() {
    const content = this.administrativeDivisionLevel
      ? toAdministrativeDivisionCsvExportContent(this.administrativeDivision)
      : toSchoolCsvExportContent(this.school);
    const contentString = this.csvParser().toCsvString(content);
    const filename = this.administrativeDivisionLevel ? `${this.administrativeDivision.name || 'México'}.csv` : `${this.school.name}.csv`;
    this.fileDownloader().download(filename, contentString, 'text/csv');
  }
}
