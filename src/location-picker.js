import { html, LitElement } from 'lit-element';
import '@mapbox/mapbox-sdk';

export class LocationPicker extends LitElement {
  render() {
    return html`
      <label for="from">From</label>
      <input type="text" name="from" class="from" />
    `;
  }
}

customElements.define('location-picker', LocationPicker);
