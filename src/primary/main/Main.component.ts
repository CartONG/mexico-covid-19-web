import { Component, Vue } from 'vue-property-decorator';

import { AbsenceReasonsDetailsVue } from '@/primary/absence-reasons-details';
import { BreadcrumbVue } from '@/primary/breadcrumb';
import { ChoroplethMapVue } from '@/primary/choropleth-map';
import { DetailsVue } from '@/primary/details';
import { DropdownVue } from '@/primary/dropdown';
import { HistoricVue } from '@/primary/historic';
import { IndicatorsVue } from '@/primary/indicators';
import { RateListVue } from '@/primary/rate-list';

@Component({
  components: {
    BreadcrumbVue,
    ChoroplethMapVue,
    IndicatorsVue,
    RateListVue,
    AbsenceReasonsDetailsVue,
    DetailsVue,
    HistoricVue,
    DropdownVue,
  },
})
export default class Main extends Vue {}
