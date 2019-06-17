import { html, LitElement } from 'lit-element';

export class JourneySearch extends LitElement {
  render() {
    return html`
      <location-picker>
        <label for="from">From</label>
        <input type="text" name="from" />
      </location-picker>
      <location-picker>
        <label for="to">To</label>
        <input type="text" name="to" />
      </location-picker>
      <input type="submit" name="search" value="Search" />
    `;
  }
}

customElements.define('journey-search', JourneySearch);
