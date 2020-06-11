import { Component, Vue } from 'vue-property-decorator';

import { ChoroplethMapVue } from '@/primary/choropleth-map';

@Component({
  components: { ChoroplethMapVue },
})
export default class Main extends Vue {}
