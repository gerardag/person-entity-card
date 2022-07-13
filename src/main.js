import {LitElement, html, css} from 'lit';
import handleClick from './handleClick';

const config = require('./config-card')

class CustomPersonCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
    };
  }

  /**
   * Handle click over custom person-entity-card
   * @param {Event} e
   * @param {Object} entity
   */
  handleTap(e, entity, disableAction) {
    // eslint-disable-next-line no-underscore-dangle
    if (!disableAction) {
      // eslint-disable-next-line no-underscore-dangle
      handleClick(this, this._hass, this.config, {
        action: 'more-info',
        entity,
      });
    }
  }

  /**
   * Set config to current this.config
   * @param {Object} config
   */
  setConfig(config) {
    if (!config.entities) {
      throw new Error('You need to define entities');
    }
    this.config = config;
  }

  // eslint-disable-next-line no-underscore-dangle
  _toggle(state) {
    // eslint-disable-next-line camelcase
    const { entity_id } = state;

    this.hass.callService('homeassistant', 'toggle', {
      // eslint-disable-next-line camelcase
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
          "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", sans-serif;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
      }

      .person-entity-title {
        font-size: 0.9375rem;
      }

      .person-entity {
        display: flex;
        gap: 1rem;
      }

      .person-entity--centered > .person-entity {
        justify-content: center;
      }

      .person-entity--centered > .person-entity-title {
        text-align: center;
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

      .person-entity-chip.no-action {
        cursor: default;
      }

      .person-entity-chip > img {
        border-radius: 100%;
        height: auto;
        margin-right: 1rem;
        width: 2.3125rem;
      }

      .person-entity-chip > span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `;
  }

  /**
   * Render peron-entity-card section title
   * @param {*} title
   * @returns
   */
  // eslint-disable-next-line class-methods-use-this
  renderTitle(title) {
    if (title !== '') {
      return html`
        <p class="person-entity-title"><strong>${title}</strong></p>
      `;
    }

    return '';
  }

  initials(person) {
    let name = person.attributes.friendly_name;
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

    let initials = [...name.matchAll(rgx)] || [];

    return ((initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')).toUpperCase();
  }

  /**
   * Render all "person-entity-card" information
   * @param {html} people
   * @returns
   */
  renderPeople(people) {
    const peopleArr = Object.keys(people);
    const { language, resources } = this.hass;
    const { showAtHome, disableAction } = this.config;
    const translations = resources[language];
    return html`
      ${peopleArr.map((person) => (
        (people[person].state !== 'home' || showAtHome) && people[person].state !== 'unknown' ? html`
            <div class="person-entity-chip${disableAction ? ' no-action' : ''}"
                 @click=${(e) => this.handleTap(e, person, disableAction)}>
              ${people[person].attributes.entity_picture ?
                html`<img src="${people[person].attributes.entity_picture}"/>` : this.initials(people[person])
              }
              <span>
              ${people[person].state === 'home' || people[person].state === 'not_home'
                ? translations[`component.person.state._.${people[person].state}`]
                : people[person].state}
                </span>
            </div>`
          : ''
      ))}`;
  }

  /**
   * Render method for custom card
   * @returns
   */
  render() {
    const { hass } = this;
    const {
      centered = false,
      entities,
      showAtHome = false,
      title,
    } = this.config;

    const people = entities
      .filter((person) => hass.states[person] !== null)
      .reduce((res, key) => Object.assign(res, { [key]: hass.states[key] }), {});

    let areEverybodyAtHome = true;

    // eslint-disable-next-line no-return-assign
    Object.keys(people)
      .map((person) => (people[person].state !== 'home' || showAtHome ? (areEverybodyAtHome = false) : ''));

    return !areEverybodyAtHome ? html`
      <ha-card class=${centered ? 'person-entity--centered' : ''}>
        ${this.renderTitle(title)}
        <div class="person-entity">${this.renderPeople(people)}</div>
      </ha-card>` : '';
  }

  static getConfigElement() {
    return document.createElement('person-entity-card-config');
  }
}

customElements.define('person-entity-card', CustomPersonCard);
