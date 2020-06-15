import '@/styles/main.scss';

import axios from 'axios';
import Buefy from 'buefy';
import Vue from 'vue';
import Vuex, { Store } from 'vuex';

import { AppVue } from './primary/app';

import { AppStore } from '@/primary/app/AppStore';
import { storeOptions } from '@/primary/app/storeOptions';
import { ConsoleLogger } from '@/secondary/ConsoleLogger';
import { RestCountryRepository } from '@/secondary/country/RestCountryRepository';
import { LocalFetcher } from '@/secondary/LocalFetcher';
import { RestMunicipalityRepository } from '@/secondary/municipality/RestMunicipalityRepository';
import { RestSchoolRepository } from '@/secondary/school/RestSchoolRepository';
import { RestStateRepository } from '@/secondary/state/RestStateRepository';

Vue.use(Buefy);
Vue.use(Vuex);

Vue.config.productionTip = false;

const restBaseUrl = process.env.NODE_ENV === 'development' ? './data/' : 'http://5.196.71.114/api/';
const localAxios = axios.create({ baseURL: './data/' });
const restAxios = axios.create({ baseURL: restBaseUrl });
const logger = new ConsoleLogger(console); // eslint-disable-line no-console
const fetcher = new LocalFetcher(localAxios);
const countryRepository = new RestCountryRepository(restAxios);
const stateRepository = new RestStateRepository(restAxios);
const municipalityRepository = new RestMunicipalityRepository(restAxios);
const schoolRepository = new RestSchoolRepository(restAxios);
const store = new Store(storeOptions);
const appStore = new AppStore(store);

new Vue({
  render: h => h(AppVue),
  provide: {
    logger: () => logger,
    appStore: () => appStore,
    fetcher: () => fetcher,
    countryRepository: () => countryRepository,
    stateRepository: () => stateRepository,
    municipalityRepository: () => municipalityRepository,
    schoolRepository: () => schoolRepository,
  },
}).$mount('#app');
