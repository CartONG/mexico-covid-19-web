import '@/styles/main.scss';

import axios from 'axios';
import Buefy from 'buefy';
import Vue from 'vue';
import Vuex, { Store } from 'vuex';

import { AppVue } from './primary/app';

import { AttendanceType } from '@/domain/AttendanceType';
import { AppStore } from '@/primary/app/AppStore';
import { appStoreOptions } from '@/primary/app/appStoreOptions';
import { AttendanceWebmapping } from '@/primary/attendance-webmapping/AttendanceWebmapping';
import { municipalityStyler } from '@/primary/attendance-webmapping/styles/municipalities/MunicipalityStyle';
import { schoolStyler } from '@/primary/attendance-webmapping/styles/schools/SchoolStyler';
import { statesStyler } from '@/primary/attendance-webmapping/styles/states/StateStyle';
import { AttendanceTypeBus } from '@/primary/AttendanceTypeBus';
import { ANIMATION_DURATION, MAP_EXTENT, UPDATE_MAP_VIEWPORT_DELAY } from '@/primary/constants';
import { Delayer } from '@/primary/Delayer';
import { NavigationBus } from '@/primary/navigation/NavigationBus';
import { createClusterLayer, createMap, createPopup, createVectorLayer } from '@/primary/WebmappingUtils';
import { RestAdministrativeDivisionDailyReportRepository } from '@/secondary/administrative-division-daily-report/RestAdministrativeDivisionDailyReportRepository';
import { RestAdministrativeDivisionRepository } from '@/secondary/administrative-division/RestAdministrativeDivisionRepository';
import { ConsoleLogger } from '@/secondary/ConsoleLogger';
import { LocalFetcher } from '@/secondary/LocalFetcher';
import { Printer } from '@/secondary/Printer';
import { RestSchoolDailyReportRepository } from '@/secondary/school-daily-report/RestSchoolDailyReportRepository';
import { RestSchoolRepository } from '@/secondary/school/RestSchoolRepository';

Vue.use(Buefy);
Vue.use(Vuex);

Vue.config.productionTip = false;

const restBaseUrl = process.env.NODE_ENV === 'development' ? './data/' : 'https://unicefmoedev1.azurewebsites.net/';
const localAxios = axios.create({ baseURL: './data/' });
const restAxios = axios.create({ baseURL: restBaseUrl });
const logger = new ConsoleLogger(console); // eslint-disable-line no-console
const fetcher = new LocalFetcher(localAxios);
const animationDelayer = new Delayer(window, ANIMATION_DURATION + 50);
const updateMapViewportDelayer = new Delayer(window, UPDATE_MAP_VIEWPORT_DELAY);
const administrativeDivisionRepository = new RestAdministrativeDivisionRepository(restAxios);
const administrativeDivisionDailyReportRepository = new RestAdministrativeDivisionDailyReportRepository(restAxios);
const schoolRepository = new RestSchoolRepository(restAxios);
const schoolDailyReportRepository = new RestSchoolDailyReportRepository(restAxios);
const navigationBus = new NavigationBus(new Vue());
const attendanceTypeBus = new AttendanceTypeBus(new Vue());
const map = createMap(MAP_EXTENT);
const statesLayer = createVectorLayer(statesStyler(AttendanceType.STUDENT, ''));
const municipalitiesLayer = createVectorLayer(municipalityStyler(AttendanceType.STUDENT, ''));
const schoolsLayer = createClusterLayer(schoolStyler(AttendanceType.STUDENT, ''));
const popup = createPopup();
const attendanceWebmapping = new AttendanceWebmapping(map, statesLayer, municipalitiesLayer, schoolsLayer, popup, ANIMATION_DURATION);
const printer = new Printer(window);
const appStore = new AppStore(new Store(appStoreOptions));

new Vue({
  render: h => h(AppVue),
  provide: {
    logger: () => logger,
    fetcher: () => fetcher,
    animationDelayer: () => animationDelayer,
    updateMapViewportDelayer: () => updateMapViewportDelayer,
    administrativeDivisionRepository: () => administrativeDivisionRepository,
    administrativeDivisionDailyReportRepository: () => administrativeDivisionDailyReportRepository,
    schoolRepository: () => schoolRepository,
    schoolDailyReportRepository: () => schoolDailyReportRepository,
    navigationBus: () => navigationBus,
    attendanceTypeBus: () => attendanceTypeBus,
    attendanceWebmapping: () => attendanceWebmapping,
    printer: () => printer,
    appStore: () => appStore,
  },
}).$mount('#app');
