import { html, css, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { MapboxGeocoder } from './services/mapbox-geocoder';

export class LocationPicker extends LitElement {
  constructor() {
    super();

    this.locations = [];
  }

  static get properties() {
    return {
      showModal: { type: Boolean },
      inputLabel: { type: String },
      selectedLocation: { type: Object, reflect: true },
      locations: { type: Array },
    };
  }

  toggleWindow() {
    if (this.showModal) {
      this.showModal = false;
    } else {
      this.showModal = true;
    }
  }

  selectStation(e) {
    this.toggleWindow();
    const station = JSON.parse(e.target.getAttribute('data-station'));
    this.shadowRoot.querySelector('input.formField').value = station.name;
    this.selectedStation = station;
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      this.stations = this._stationInfo.findClosest(position.coords);
    });
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      label {
        float: left;
        padding-top: 9px;
      }
      input.formField {
        float: right;
        height: 30px;
        width: 230px;
      }

      .modal {
        position: absolute;
        background: pink;
        width: 100%;
        height: 100%;
        left: 0;
        bottom: 0;
        transform: translateY(100%);
        z-index: 2;
        transition: 0.5s transform;
      }
      .modal.visible {
        transform: translateY(0);
      }

      .modal ul {
        margin: 30px auto;
        max-width: 300px;
        padding: 0;
      }
      .modal ul li {
        padding: 10px 5px;
        list-style: none;
        border-top: 1px solid black;
      }
      .modal ul li:last-of-type {
        border-bottom: 1px solid black;
      }
    `;
  }

  async textSearch(e) {
    const query = e.target.value;
    this.shadowRoot.querySelector('.modal-search').value = query;

    this.locations = await MapboxGeocoder.findCoordinates(query);
  }

  render() {
    return html`
      <label for="${this.inputLabel.toLowerCase()}">${this.inputLabel}</label>
      <input
        type="text"
        name="${this.inputLabel.toLowerCase()}"
        id="${this.inputLabel.toLowerCase()}"
        class="formField"
        required
        @input="${this.textSearch}"
        @focus="${this.toggleWindow}"
      />
      <div class="${classMap({ modal: true, visible: this.showModal })}">
        <header>
          <button @click="${this.toggleWindow}">X</button>
          <!-- TODO Conditional if supported-->
          <button @click="${this.getCurrentLocation}">Use Current Location</button>
        </header>
        <section>
          <input type="search" class="modal-search" @input="${this.textSearch}" />
          <ul class="results-list">
            ${this.locations.map(
              address =>
                html`
                  <li data-coordinates="${JSON.stringify(address.geometry)}">
                    ${address.place_name}
                  </li>
                `,
            )}
          </ul>
        </section>
      </div>
    `;
  }
}

customElements.define('location-picker', LocationPicker);
