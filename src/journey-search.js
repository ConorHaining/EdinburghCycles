import { html, LitElement } from 'lit-element';

export class JourneySearch extends LitElement {
  render() {
    return html`
      <location-picker inputlabel="From"></location-picker>
      <location-picker inputlabel="To"></location-picker>
      <input type="submit" name="search" value="Search" />
    `;
  }
}

customElements.define('journey-search', JourneySearch);
