import '@/styles/main.scss';

import axios from 'axios';
import Buefy from 'buefy';
import Vue from 'vue';
import Vuex, { Store } from 'vuex';

import { AppVue } from './primary/app';

import { AppStore } from '@/primary/app/AppStore';
import { storeOptions } from '@/primary/app/storeOptions';
import { RestAdministrativeDivisionHistoryRepository } from '@/secondary/administrative-division-history/RestAdministrativeDivisionHistoryRepository';
import { RestAdministrativeDivisionRepository } from '@/secondary/administrative-division/RestAdministrativeDivisionRepository';
import { ConsoleLogger } from '@/secondary/ConsoleLogger';
import { LocalFetcher } from '@/secondary/LocalFetcher';
import { RestSchoolRepository } from '@/secondary/school/RestSchoolRepository';

Vue.use(Buefy);
Vue.use(Vuex);

Vue.config.productionTip = false;

const restBaseUrl = process.env.NODE_ENV === 'development' ? './data/' : 'https://unicefmoedev1.azurewebsites.net/';
const localAxios = axios.create({ baseURL: './data/' });
const restAxios = axios.create({ baseURL: restBaseUrl });
const logger = new ConsoleLogger(console); // eslint-disable-line no-console
const fetcher = new LocalFetcher(localAxios);
const administrativeDivisionRepository = new RestAdministrativeDivisionRepository(restAxios);
const administrativeDivisionHistoryRepository = new RestAdministrativeDivisionHistoryRepository(localAxios);
const schoolRepository = new RestSchoolRepository(restAxios);
const store = new Store(storeOptions);
const appStore = new AppStore(store);

new Vue({
  render: h => h(AppVue),
  provide: {
    logger: () => logger,
    appStore: () => appStore,
    fetcher: () => fetcher,
    administrativeDivisionRepository: () => administrativeDivisionRepository,
    administrativeDivisionHistoryRepository: () => administrativeDivisionHistoryRepository,
    schoolRepository: () => schoolRepository,
  },
}).$mount('#app');
