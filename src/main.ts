import '@/styles/main.scss';

import axios from 'axios';
import Buefy from 'buefy';
import Vue from 'vue';
import Vuex, { Store } from 'vuex';

import { AppVue } from './primary/app';

import { AppStore } from '@/primary/app/AppStore';
import { storeOptions } from '@/primary/app/storeOptions';
import { ConsoleLogger } from '@/secondary/ConsoleLogger';
import { LocalFetcher } from '@/secondary/LocalFetcher';
import { RestMunicipalityRepository } from '@/secondary/municipality/RestMunicipalityRepository';
import { RestSchoolRepository } from '@/secondary/school/RestSchoolRepository';
import { RestStateRepository } from '@/secondary/state/RestStateRepository';

Vue.use(Buefy);
Vue.use(Vuex);

Vue.config.productionTip = false;

const localAxios = axios.create({ baseURL: './data/' });
const restAxios = axios.create({ baseURL: 'http://5.196.71.114/api/' });
const logger = new ConsoleLogger(console); // eslint-disable-line no-console
const fetcher = new LocalFetcher(localAxios);
const stateRepository = new RestStateRepository(restAxios);
const municipalityRepository = new RestMunicipalityRepository(localAxios);
const schoolRepository = new RestSchoolRepository(localAxios);
const store = new Store(storeOptions);
const appStore = new AppStore(store);

new Vue({
  render: h => h(AppVue),
  provide: {
    logger: () => logger,
    appStore: () => appStore,
    fetcher: () => fetcher,
    stateRepository: () => stateRepository,
    municipalityRepository: () => municipalityRepository,
    schoolRepository: () => schoolRepository,
  },
}).$mount('#app');
