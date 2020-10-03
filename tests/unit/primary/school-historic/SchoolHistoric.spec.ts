import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import Buefy from 'buefy';

import { HistoricChartStub, stubHistoricChart } from '../../TestUtils';
import { makeSchoolDailyReport } from '../SchoolDailyReport.fixture';

import { SchoolDailyReport } from '@/domain/school-daily-report/SchoolDailyReport';
import { HistoricType } from '@/primary/HistoricType';
import { SchoolHistoricComponent, SchoolHistoricVue } from '@/primary/school-historic';
import { toSchoolHistoricDataSet } from '@/primary/school-historic/SchoolHistoricDataSet';

let wrapper: Wrapper<SchoolHistoricComponent>;
let component: SchoolHistoricComponent;

interface WrapOptions {
  historicChart: HistoricChartStub;
  printable: boolean;
  schoolDailyReports: SchoolDailyReport[];
  historicType: HistoricType;
}

const wrap = (override: Partial<WrapOptions> = {}) => {
  const localVue = createLocalVue();
  localVue.use(Buefy);
  const options = {
    historicChart: stubHistoricChart(),
    printable: false,
    schoolDailyReports: [],
    historicType: HistoricType.STUDENT_ABSENCE,
    ...override,
  };
  wrapper = shallowMount<SchoolHistoricComponent>(SchoolHistoricVue, {
    localVue,
    propsData: {
      schoolDailyReports: options.schoolDailyReports,
      historicType: options.historicType,
      printable: options.printable,
      historicInterval: [0, 0],
    },
    provide: {
      historicChart: () => options.historicChart,
    },
  });
  component = wrapper.vm;
};

describe('SchoolHistoric', () => {
  it('should be a Vue instance', () => {
    wrap();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('should setup chart', async () => {
    const historicChartStub = stubHistoricChart();
    const dataSet = toSchoolHistoricDataSet([], HistoricType.STUDENT_ABSENCE, 250);
    await wrap({ historicChart: historicChartStub });
    expect(historicChartStub.makeStackedBarChart.calledOnce).toBeTruthy();
    expect(historicChartStub.makeStackedBarChart.getCall(0).args).toEqual(['historic-stacked-chart', [], dataSet.chartOptions]);
  });

  it('should setup chart for print mode', async () => {
    const historicChartStub = stubHistoricChart();
    const dataSet = toSchoolHistoricDataSet([], HistoricType.GIVES_CLASSES, 0);
    await wrap({ historicChart: historicChartStub, printable: true, historicType: HistoricType.GIVES_CLASSES });
    expect(historicChartStub.transformStackedBarChartToImage.calledOnce).toBeTruthy();
    expect(historicChartStub.transformStackedBarChartToImage.getCall(0).args[0]).toBe('historic-stacked-chart');
    expect(historicChartStub.transformStackedBarChartToImage.getCall(0).args[1]).toEqual([]);
    expect(historicChartStub.transformStackedBarChartToImage.getCall(0).args[2]).toEqual(dataSet.chartOptions);
  });

  it('should setup tooltip label', async () => {
    const schoolDailyReports = [makeSchoolDailyReport({ date: '2020-09-01' })];
    await wrap({ schoolDailyReports });
    expect(component.tooltipLabel(0)).toBe('01/09');
  });

  it('should update chart when historic interval is changing', async () => {
    const historicChartStub = stubHistoricChart();
    const schoolDailyReports = [
      makeSchoolDailyReport({ date: '2020-09-01' }),
      makeSchoolDailyReport({ date: '2020-09-02' }),
      makeSchoolDailyReport({ date: '2020-09-03' }),
      makeSchoolDailyReport({ date: '2020-09-04' }),
    ];
    await wrap({ schoolDailyReports, historicChart: historicChartStub });
    await wrapper.setProps({ historicInterval: [0, 1] });
    expect(historicChartStub.updateStackedChart.calledOnce).toBeTruthy();
  });

  it('should update chart when historic type is changing', async () => {
    const historicChartStub = stubHistoricChart();
    const schoolDailyReports = [
      makeSchoolDailyReport({ date: '2020-09-01' }),
      makeSchoolDailyReport({ date: '2020-09-02' }),
      makeSchoolDailyReport({ date: '2020-09-03' }),
      makeSchoolDailyReport({ date: '2020-09-04' }),
    ];
    await wrap({ schoolDailyReports, historicChart: historicChartStub });
    await wrapper.setProps({ historicType: HistoricType.TEACHER_ATTENDANCE });
    expect(historicChartStub.updateStackedChart.calledOnce).toBeTruthy();
  });

  it('should not update chart in print mode', async () => {
    const historicChartStub = stubHistoricChart();
    const schoolDailyReports = [makeSchoolDailyReport({ date: '2020-09-01' }), makeSchoolDailyReport({ date: '2020-09-02' })];
    await wrap({ schoolDailyReports, historicChart: historicChartStub, printable: true });
    await wrapper.setProps({ historicType: HistoricType.TEACHER_ATTENDANCE });
    expect(historicChartStub.updateStackedChart.calledOnce).toBeFalsy();
  });
});
