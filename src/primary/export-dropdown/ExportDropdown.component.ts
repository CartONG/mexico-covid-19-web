import { Component, Inject, Prop, Vue } from 'vue-property-decorator';

import { AdministrativeDivision } from '@/domain/administrative-division/AdministrativeDivision';
import { CsvParser } from '@/primary/CsvParser';
import { toAdministrativeDivisionCsvExport } from '@/primary/export-dropdown/AdministrativeDivisionCsvExport';
import { FileDownloader } from '@/primary/FileDownloader';

@Component
export default class DownloadDropdown extends Vue {
  @Prop()
  administrativeDivision!: AdministrativeDivision;

  @Inject()
  csvParser!: () => CsvParser;

  @Inject()
  fileDownloader!: () => FileDownloader;

  downloadCsv() {
    const content = this.csvParser().toCsvString(toAdministrativeDivisionCsvExport(this.administrativeDivision));
    const filename = `${this.administrativeDivision.name || 'México'}.csv`;
    this.fileDownloader().download(filename, content, 'text/csv');
  }
}
