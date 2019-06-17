import { html, fixture, expect } from '@open-wc/testing';

import '../src/edinburgh-cycles';

describe('<edinburgh-cycles>', () => {
  it('has a default property header', async () => {
    const el = await fixture('<edinburgh-cycles></edinburgh-cycles>');
    expect(el.title).to.equal('open-wc');
  });

  it('allows property header to be overwritten', async () => {
    const el = await fixture(html`
      <edinburgh-cycles title="different"></edinburgh-cycles>
    `);
    expect(el.title).to.equal('different');
  });
});
