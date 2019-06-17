import '@appnest/web-router';

import { JourneySearch } from './journey-search';

customElements.whenDefined('router-slot').then(async () => {
  const routerSlot = document.querySelector('router-slot');
  await routerSlot.add([
    {
      path: '',
      component: JourneySearch,
    },
  ]);
});
