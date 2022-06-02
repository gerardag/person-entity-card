import {LitElement, html} from 'lit';
import {fireEvent} from 'custom-card-helpers';
import {localize} from './localize/localize';

class ConfigCard extends LitElement {

  static get properties() {
    return {
      _hass: {},
      _config: {},
      state: {},
    }
  }

  setConfig(config) {
    this._config = config;
    this.state = {
      entities: this._entities,
    };
  }

  get _centered() {
    return this._config?.centered || false;
  }

  get _showAtHome() {
    return this._config?.showAtHome || false;
  }

  get _entities() {
    return this._config?.entities || [];
  }

  filterPerson(obj) {
    if (!obj.entity_id.match(/^person\./)) {
      return null;
    }

    return obj;
  }

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);

    this.loadEntityCard().then();
  }

  async loadEntityCard() {
    const cardHelpers = await window.loadCardHelpers();
    const entitiesCard = await cardHelpers.createCardElement({ type: "entities", entities: [] });
    entitiesCard.constructor.getConfigElement();
  }

  _delete(entity_id) {
    this.state.entities = this.delete([...this._entities], entity_id);
    this._valueChanged({
      target: {
        value: this.state.entities,
        configValue: 'entities'
      }
    })
  }

  _moveDown(entity_id) {
    this.state.entities = this.moveDown([...this._entities], entity_id);
    this._valueChanged({
      target: {
        value: this.state.entities,
        configValue: 'entities'
      }
    })
  }

  _moveUp(entity_id) {
    this.state.entities = this.moveUp([...this._entities], entity_id);
    this._valueChanged({
      target: {
        value: this.state.entities,
        configValue: 'entities'
      }
    })
  }

  render() {
    if (!this.hass) {
      return ``;
    }

    const total = this.state.entities.length;

    return html`
      <div class="card-config">
        <p class="option">
          <ha-switch
            aria-label=${localize(`config.centered.${this._centered ? 'off' : 'on'}`)}
            .checked=${this._centered !== false}
            .configValue=${'centered'}
            @change=${this._valueChanged}
          ></ha-switch>
          ${localize('config.centered.title')}
        </p>
        <p class="option">
          <ha-switch
            aria-label=${localize(`config.showAtHome.${this._showAtHome ? 'off' : 'on'}`)}
            .checked=${this._showAtHome !== false}
            .configValue=${'showAtHome'}
            @change=${this._valueChanged}
          ></ha-switch>
          ${localize(`config.showAtHome.title`)}
        </p>
        <hr>
        <h3>${localize('persons.title')}</h3>
        ${this.state.entities.map((entity, idx) => {
          return html`
            <div>
              ${this.hass.states[entity].attributes.friendly_name}
              <div>
                <ha-icon-button
                  class="up-icon"
                  .disabled=${idx === 0}
                  .value=${entity}
                  @click="${ev => this._moveUp(entity)}">
                  <ha-icon icon="mdi:arrow-up"></ha-icon>
                </ha-icon-button>
                <ha-icon-button
                  class="down-icon"
                  .disabled=${idx === (total - 1)}
                  .value=${entity}
                  @click="${ev => this._moveDown(entity)}">
                  <ha-icon icon="mdi:arrow-down"></ha-icon>
                </ha-icon-button>
                <ha-icon-button
                  class="edit-icon"
                  .value=${entity}
                  @click="${ev => this._delete(entity)}">
                  <ha-icon icon="mdi:delete"/>
                </ha-icon-button>
              </div>
            </div>
          `;
        })}

        <ha-entity-picker
          .hass=${this.hass}
          .entityFilter=${this.filterPerson.bind(this)}
          label=${localize('persons.picker_label')}
          allow-custom-entity
          @value-changed=${this._valueChangedPicker}
        ></ha-entity-picker>
      </div>`;
  }

  moveUp(list, value) {
    let index = list.indexOf(value),
      newPos = index - 1;

    if (index === -1)
      throw new Error("Element not found in array");

    if (newPos < 0)
      newPos = 0;

    list.splice(index, 1);
    list.splice(newPos, 0, value);

    return list;
  };

  moveDown(list, value) {
    let index = list.indexOf(value),
      newPos = index + 1;

    if (index === -1)
      throw new Error("Element not found in array");

    if (newPos >= this.length)
      newPos = this.length;

    list.splice(index, 1);
    list.splice(newPos, 0, value);
    return list;
  };

  delete(list, value) {
    let index = list.indexOf(value);
    list.splice(index, 1);
    return list;
  };

  _valueChangedPicker(ev) {
    if (!ev.detail.value || this._entities.indexOf(ev.detail.value) >= 0) {
      return null;
    }

    const value = [
      ...this._entities,
      ev.detail.value
    ];

    this.state.entities = value;
    this._valueChanged({
      target: {
        value: value,
        configValue: 'entities'
      }
    })
  }

  _valueChanged(ev) {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target;
    if (this[`_${target.configValue}`] === target.value) {
      return;
    }
    if (target.configValue) {
      if (target.value === '') {
        const tmpConfig = { ...this._config };
        delete tmpConfig[target.configValue];
        this._config = tmpConfig;
      } else {
        this._config = {
          ...this._config,
          [target.configValue]: target.checked !== undefined ? target.checked : target.value,
        };
      }
    }
    fireEvent(this, 'config-changed', { config: this._config });
  }
}

customElements.define("person-entity-card-config", ConfigCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "person-entity-card",
  name: "Person Entity Card",
  preview: true,
  description: "A custom card that add person information"
});

