import { Component, Vue } from 'vue-property-decorator';

import { BreadcrumbVue } from '@/primary/breadcrumb';
import { ChoroplethMapVue } from '@/primary/choropleth-map';
import { IndicatorsVue } from '@/primary/indicators';

@Component({
  components: { BreadcrumbVue, ChoroplethMapVue, IndicatorsVue },
})
export default class Main extends Vue {}
