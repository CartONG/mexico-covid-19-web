import * as d3 from 'd3';
import { Component, Inject, Vue, Watch } from 'vue-property-decorator';

import { AppStore } from '@/primary/app/AppStore';
import { toAdministrativeDivisionDataset } from '@/primary/common/AdministrativeDivisionDataSet';
import { toSchoolDataSet } from '@/primary/common/SchoolDataSet';

@Component
export default class AbsenceReasonsDetails extends Vue {
  @Inject()
  private appStore!: () => AppStore;

  get navigation() {
    return this.appStore().getNavigation();
  }

  get administrativeDivision() {
    return this.appStore().getCurrentAdministrativeDivision();
  }

  get school() {
    return this.appStore().getSchool();
  }

  get dataSet() {
    return this.navigation.schoolId
      ? toSchoolDataSet(this.school).studentAbsenceMainReasons
      : toAdministrativeDivisionDataset(this.administrativeDivision).studentAbsenceMainReasons;
  }

  @Watch('dataSet')
  dataSetWatcher() {
    console.log('watcher');
    this.toChart(this.dataSet);
  }

  mounted() {
    this.toChart(toAdministrativeDivisionDataset(this.administrativeDivision).studentAbsenceMainReasons);
  }

  toChart(dataset: { [key: string]: { text: string; value: number } }) {
    d3.select('#absence-reasons-details-chart g').remove();

    const data = [dataset['1'], dataset['2'], dataset['3'], dataset['4'], dataset['5']].map(d => d.value);

    const color = d3.scaleOrdinal([
      'rgba(212, 193, 156, 0.7)',
      'rgba(157, 36, 73, 0.7)',
      'rgba(40, 92, 77, 0.7)',
      'rgba(191, 191, 191, 0.7)',
      'rgba(98, 17, 50, 0.7)',
    ]);

    const svg = d3.select('#absence-reasons-details-chart');
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const width = 150 - margin.right - margin.left;
    const height = 150 - margin.top - margin.bottom;
    const radius = Math.min(width, height) / 2;
    const g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
    const pie = d3.pie();

    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius);

    const arcs = g
      .selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs
      .append('path')
      .attr('fill', (d, i) => color(i.toString()))
      .attr('d', arc as any);
  }
}
