import { Component, Vue } from 'vue-property-decorator';

import { DashboardVue } from '@/primary/dashboard';

@Component({
  components: { DashboardVue },
})
export default class App extends Vue {}
