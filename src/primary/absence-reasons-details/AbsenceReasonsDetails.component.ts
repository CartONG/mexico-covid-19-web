import * as d3 from 'd3';
import { Component, Inject, Vue, Watch } from 'vue-property-decorator';

import {
  AbsenceReasonsDetailsDataSet,
  mergedReportToAbsenceReasonsDetailsDataSet,
  toAbsenceReasonsDetailsDataSet,
} from '@/primary/absence-reasons-details/AbsenceReasonsDetailsDataSet';
import { AppStore } from '@/primary/app/AppStore';

@Component
export default class AbsenceReasonsDetails extends Vue {
  @Inject()
  private appStore!: () => AppStore;

  get level() {
    return this.appStore().getLevel();
  }

  get country() {
    return this.appStore().getCountry();
  }

  get state() {
    return this.appStore().getState();
  }

  get municipality() {
    return this.appStore().getMunicipality();
  }

  get school() {
    return this.appStore().getSchool();
  }

  get absenceReasonsDetailsDataSet(): AbsenceReasonsDetailsDataSet | undefined {
    switch (this.level) {
      case 'state':
        return mergedReportToAbsenceReasonsDetailsDataSet(this.state);
      case 'municipality':
        return mergedReportToAbsenceReasonsDetailsDataSet(this.municipality);
      case 'school':
        return toAbsenceReasonsDetailsDataSet(this.school);
    }
    return mergedReportToAbsenceReasonsDetailsDataSet(this.country);
  }

  @Watch('absenceReasonsDetailsDataSet')
  absenceReasonsDetailsDataSetWatcher() {
    this.toChart(this.absenceReasonsDetailsDataSet);
  }

  mounted() {
    this.toChart(mergedReportToAbsenceReasonsDetailsDataSet(this.country));
  }

  toChart(absenceReasonsDetailsDataSet: AbsenceReasonsDetailsDataSet | undefined) {
    d3.select('g').remove();

    if (absenceReasonsDetailsDataSet === undefined) {
      return;
    }

    const data = [
      absenceReasonsDetailsDataSet.noFacility,
      absenceReasonsDetailsDataSet.father,
      absenceReasonsDetailsDataSet.sick,
      absenceReasonsDetailsDataSet.unknown,
    ];

    const color = d3.scaleOrdinal([
      'rgba(212, 193, 156, 0.7)',
      'rgba(157, 36, 73, 0.7)',
      'rgba(40, 92, 77, 0.7)',
      'rgba(191, 191, 191, 0.7)',
    ]);

    const svg = d3.select('svg');
    const width = parseInt(svg.attr('width'));
    const height = parseInt(svg.attr('height'));
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
