import { html, css, LitElement } from 'lit-element';

export class JourneySearch extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }

      .location-picker {
        display: block;
        width: 100%;
        height: 50px;
      }
    `;
  }

  render() {
    return html`
      <form>
        <div class="location-picker">
          <location-picker inputlabel="From"></location-picker>
        </div>
        <div class="location-picker">
          <location-picker inputlabel="To"></location-picker>
        </div>
        <input type="submit" name="search" value="Search" />
      </form>
    `;
  }
}

customElements.define('journey-search', JourneySearch);
