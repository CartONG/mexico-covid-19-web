import { Component, Vue } from 'vue-property-decorator';

import { BreadcrumbVue } from '@/primary/breadcrumb';
import { ChoroplethMapVue } from '@/primary/choropleth-map';
import { IndicatorsVue } from '@/primary/indicators';
import { RateListVue } from '@/primary/rate-list';

@Component({
  components: { BreadcrumbVue, ChoroplethMapVue, IndicatorsVue, RateListVue },
})
export default class Main extends Vue {}
