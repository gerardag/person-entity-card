import { handleClick } from './handleClick.js';

const LitElement =
  window.LitElement ||
  Object.getPrototypeOf(
    customElements.get('ha-panel-lovelace') || customElements.get('hc-lovelace')
  );
const { html, css } = LitElement.prototype;

class CustomPersonCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
    };
  }

  handleTap(e, entity) {
    handleClick(this, this._hass, this.config, { action: 'more-info', entity });
  }

  setConfig(config) {
    if (!config.entities) {
      throw new Error('You need to define entities');
    }
    this.config = config;
  }

  _toggle(state) {
    const { entity_id } = state;

    this.hass.callService('homeassistant', 'toggle', {
      entity_id,
    });
  }

  static get styles() {
    return css`
      ha-card {
        background: none;
        border: none;
        box-shadow: none;
        font-family: inherit, Inter, -apple-system, BlinkMacSystemFont,
          'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
      }

      .person-entity-title {
        font-size: 0.9375rem;
      }

      .person-entity {
        display: flex;
      }

      .person-entity > .person-entity-chip + .person-entity-chip {
        margin-left: 1rem;
      }

      .person-entity-chip {
        align-items: center;
        background-color: var(--card-background-color);
        border: thin solid var(--primary-color);
        border-radius: 1.5625rem;
        cursor: pointer;
        display: flex;
        font-weight: bold;
        height: 2.5rem;
        justify-content: flex-start;
        line-height: 2.5rem;
        padding: 0 1rem 0 1px;
        overflow: hidden;
        width: auto;
      }

      .person-entity-chip > img {
        border-radius: 50%;
        height: auto;
        margin-right: 1rem;
        width: 2.3125rem;
      }
    `;
  }

  renderTitle(title) {
    if (title !== '') {
      return html`
        <p class='person-entity-title'><strong>${title}</strong></p>
      `;
    }

    return '';
  }

  renderPeople(people) {
    const peopleArr = Object.keys(people);
    const { language, resources } = this.hass;
    const translations = resources[language];

    return html`
      ${peopleArr.map((person) =>
        people[person].state !== 'home' && people[person].state !== 'unknown'
          ? html`
              <div
                class='person-entity-chip'
                @click='@click=${(e) => this.handleTap(e, person)}'
              >
                <img src='${people[person].attributes.entity_picture}' />
                ${people[person].state !== 'home' &&
                people[person].state === 'not_home'
                  ? translations['component.person.state._.not_home']
                  : people[person].state}
              </div>
            `
          : ''
      )}
    `;
  }

  render() {
    const hass = this.hass;
    const { entities, title } = this.config;
    const regex = new RegExp(`^(${entities.toString().replaceAll(',', '|')})$`);
    const people = Object.keys(hass.states)
      .filter((state) => state.match(regex) !== null)
      .reduce(
        (res, key) => Object.assign(res, { [key]: hass.states[key] }),
        {}
      );

    let areEverybodyAtHome = true;

    Object.keys(people).map((person) =>
      people[person].state !== 'home' ? (areEverybodyAtHome = false) : ''
    );

    return !areEverybodyAtHome
      ? html`
          <ha-card>
            ${this.renderTitle(title)}
            <div class='person-entity'>${this.renderPeople(people)}</div>
          </ha-card>
        `
      : '';
  }
}

customElements.define('custom-person-card', CustomPersonCard);
