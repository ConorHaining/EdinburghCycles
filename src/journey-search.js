import { html, css, LitElement } from 'lit-element';
import { JourneyPlanner } from './services/journey-planner';

export class JourneySearch extends LitElement {
  performSearch(e) {
    e.preventDefault();
    const journeyPlanner = new JourneyPlanner();

    const pickers = this.shadowRoot.querySelectorAll('location-picker');
    const from = pickers[0].getAttribute('selectedlocation');
    const to = pickers[1].getAttribute('selectedlocation');

    journeyPlanner
      .setFrom(from)
      .setTo(to)
      .build();
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
          <location-picker inputlabel="From"></location-picker>
        </div>
        <div class="location-picker">
          <location-picker inputlabel="To"></location-picker>
        </div>
        <input type="submit" name="search" value="Search" @click="${this.performSearch}" />
      </form>
    `;
  }
}

customElements.define('journey-search', JourneySearch);
