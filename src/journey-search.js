import { html, css, LitElement } from 'lit-element';
import { JourneyPlanner } from './services/journey-planner';

export class JourneySearch extends LitElement {
  constructor() {
    super();

    this.from = null;
    this.to = null;
  }

  performSearch(event) {
    event.preventDefault();
    const journeyPlanner = new JourneyPlanner();

    journeyPlanner
      .setFrom(this.from)
      .setTo(this.to)
      .build();
  }

  updateFrom(event) {
    const { coordinates } = event.detail;
    this.from = coordinates;
  }

  updateTo(event) {
    const { coordinates } = event.detail;
    this.to = coordinates;
  }

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
          <location-picker inputlabel="From" @locationSelected=${this.updateFrom}></location-picker>
        </div>
        <div class="location-picker">
          <location-picker inputlabel="To" @locationSelected=${this.updateTo}></location-picker>
        </div>
        <input type="submit" name="search" value="Search" @click="${this.performSearch}" />
      </form>
    `;
  }
}

customElements.define('journey-search', JourneySearch);
