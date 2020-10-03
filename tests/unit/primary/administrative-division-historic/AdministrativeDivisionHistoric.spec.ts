import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import Buefy from 'buefy';

import { HistoricChartStub, stubHistoricChart } from '../../TestUtils';
import { makeAdministrativeDivisionDailyReport } from '../AdministrativeDivisionDailyReport.fixture';

import { AdministrativeDivisionDailyReport } from '@/domain/administrative-division-daily-report/AdministrativeDivisionDailyReport';
import { AdministrativeDivisionHistoricComponent, AdministrativeDivisionHistoricVue } from '@/primary/administrative-division-historic';
import { toAdministrativeDivisionHistoricDataSet } from '@/primary/administrative-division-historic/AdministrativeDivisionHistoricDataSet';
import { HistoricType } from '@/primary/HistoricType';

let wrapper: Wrapper<AdministrativeDivisionHistoricComponent>;
let component: AdministrativeDivisionHistoricComponent;

interface WrapOptions {
  historicChart: HistoricChartStub;
  printable: boolean;
  administrativeDivisionDailyReports: AdministrativeDivisionDailyReport[];
}

const wrap = (override: Partial<WrapOptions> = {}) => {
  const localVue = createLocalVue();
  localVue.use(Buefy);
  const options = {
    historicChart: stubHistoricChart(),
    printable: false,
    administrativeDivisionDailyReports: [],
    ...override,
  };
  wrapper = shallowMount<AdministrativeDivisionHistoricComponent>(AdministrativeDivisionHistoricVue, {
    localVue,
    propsData: {
      administrativeDivisionDailyReports: options.administrativeDivisionDailyReports,
      historicType: HistoricType.STUDENT_ABSENCE,
      printable: options.printable,
      historicInterval: [0, 0],
    },
    provide: {
      historicChart: () => options.historicChart,
    },
  });
  component = wrapper.vm;
};

describe('AdministrativeDivisionHistoric', () => {
  it('should be a Vue instance', () => {
    wrap();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('should setup chart', async () => {
    const historicChartStub = stubHistoricChart();
    const dataSet = toAdministrativeDivisionHistoricDataSet([], HistoricType.STUDENT_ABSENCE, 250);
    await wrap({ historicChart: historicChartStub });
    expect(historicChartStub.makeStackedBarChart.calledOnce).toBeTruthy();
    expect(historicChartStub.makeStackedBarChart.getCall(0).args).toEqual(['historic-stacked-chart', [], dataSet.chartOptions]);
  });

  it('should setup chart for print mode', async () => {
    const historicChartStub = stubHistoricChart();
    const dataSet = toAdministrativeDivisionHistoricDataSet([], HistoricType.STUDENT_ABSENCE, 0);
    await wrap({ historicChart: historicChartStub, printable: true });
    expect(historicChartStub.transformStackedBarChartToImage.calledOnce).toBeTruthy();
    expect(historicChartStub.transformStackedBarChartToImage.getCall(0).args[0]).toBe('historic-stacked-chart');
    expect(historicChartStub.transformStackedBarChartToImage.getCall(0).args[1]).toEqual([]);
    expect(historicChartStub.transformStackedBarChartToImage.getCall(0).args[2]).toEqual(dataSet.chartOptions);
  });

  it('should setup tooltip label', async () => {
    const administrativeDivisionDailyReports = [makeAdministrativeDivisionDailyReport({ date: '2020-09-01' })];
    await wrap({ administrativeDivisionDailyReports });
    expect(component.tooltipLabel(0)).toBe('01/09');
  });

  it('should update chart when historic interval is changing', async () => {
    const historicChartStub = stubHistoricChart();
    const administrativeDivisionDailyReports = [
      makeAdministrativeDivisionDailyReport({ date: '2020-09-01' }),
      makeAdministrativeDivisionDailyReport({ date: '2020-09-02' }),
      makeAdministrativeDivisionDailyReport({ date: '2020-09-03' }),
      makeAdministrativeDivisionDailyReport({ date: '2020-09-04' }),
    ];
    await wrap({ administrativeDivisionDailyReports, historicChart: historicChartStub });
    await wrapper.setProps({ historicInterval: [0, 1] });
    expect(historicChartStub.updateStackedChart.calledOnce).toBeTruthy();
  });

  it('should update chart when historic type is changing', async () => {
    const historicChartStub = stubHistoricChart();
    const administrativeDivisionDailyReports = [
      makeAdministrativeDivisionDailyReport({ date: '2020-09-01' }),
      makeAdministrativeDivisionDailyReport({ date: '2020-09-02' }),
      makeAdministrativeDivisionDailyReport({ date: '2020-09-03' }),
      makeAdministrativeDivisionDailyReport({ date: '2020-09-04' }),
    ];
    await wrap({ administrativeDivisionDailyReports, historicChart: historicChartStub });
    await wrapper.setProps({ historicType: HistoricType.TEACHER_ATTENDANCE });
    expect(historicChartStub.updateStackedChart.calledOnce).toBeTruthy();
  });

  it('should not update chart in print mode', async () => {
    const historicChartStub = stubHistoricChart();
    const administrativeDivisionDailyReports = [
      makeAdministrativeDivisionDailyReport({ date: '2020-09-01' }),
      makeAdministrativeDivisionDailyReport({ date: '2020-09-02' }),
    ];
    await wrap({ administrativeDivisionDailyReports, historicChart: historicChartStub, printable: true });
    await wrapper.setProps({ historicType: HistoricType.TEACHER_ATTENDANCE });
    expect(historicChartStub.updateStackedChart.calledOnce).toBeFalsy();
  });
});
