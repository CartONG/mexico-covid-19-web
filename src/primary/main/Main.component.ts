import { Component, Vue } from 'vue-property-decorator';

import { BreadcrumbVue } from '@/primary/breadcrumb';
import { ChoroplethMapVue } from '@/primary/choropleth-map';

@Component({
  components: { BreadcrumbVue, ChoroplethMapVue },
})
export default class Main extends Vue {}
