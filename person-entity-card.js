/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/handleClick.js":
/*!****************************!*\
  !*** ./src/handleClick.js ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.handleClick = void 0;\n\nconst handleClick = (node, hass, config, actionConfig) => {\n  let e;\n\n  switch (actionConfig.action) {\n    case 'more-info':\n      e = new Event('hass-more-info', {\n        composed: true\n      });\n      e.detail = {\n        entityId: actionConfig.entity || config.entity\n      };\n      console.log(e);\n      node.dispatchEvent(e);\n      break;\n\n    case 'navigate':\n      if (!actionConfig.navigation_path) return;\n      history.pushState(null, '', actionConfig.navigation_path);\n      e = new Event('location-changed', {\n        composed: true\n      });\n      e.detail = {\n        replace: false\n      };\n      window.dispatchEvent(e);\n      break;\n\n    case 'call-service':\n      if (!actionConfig.service) return;\n      const [domain, service] = actionConfig.service.split(\".\", 2);\n      const serviceData = { ...actionConfig.service_data\n      };\n      hass.callService(domain, service, serviceData);\n  }\n};\n\nexports.handleClick = handleClick;\n\n//# sourceURL=webpack://person-entity-card/./src/handleClick.js?");

/***/ }),

/***/ "./src/person-entity-card.js":
/*!***********************************!*\
  !*** ./src/person-entity-card.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar _handleClick = __webpack_require__(/*! ./handleClick.js */ \"./src/handleClick.js\");\n\nvar _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;\n\nfunction _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nconst LitElement = window.LitElement || Object.getPrototypeOf(customElements.get('ha-panel-lovelace') || customElements.get('hc-lovelace'));\nconst {\n  html,\n  css\n} = LitElement.prototype;\n\nclass CustomPersonCard extends LitElement {\n  static get properties() {\n    return {\n      hass: {},\n      config: {}\n    };\n  }\n\n  handleTap(e, entity) {\n    (0, _handleClick.handleClick)(this, this._hass, this.config, {\n      action: 'more-info',\n      entity\n    });\n  }\n\n  setConfig(config) {\n    if (!config.entities) {\n      throw new Error('You need to define entities');\n    }\n\n    this.config = config;\n  }\n\n  _toggle(state) {\n    const {\n      entity_id\n    } = state;\n    this.hass.callService('homeassistant', 'toggle', {\n      entity_id\n    });\n  }\n\n  static get styles() {\n    return css(_templateObject || (_templateObject = _taggedTemplateLiteral([\"\\n      ha-card {\\n        background: none;\\n        border: none;\\n        box-shadow: none;\\n        font-family: inherit, Inter, -apple-system, BlinkMacSystemFont,\\n          'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif;\\n        padding-left: 0.5rem;\\n        padding-right: 0.5rem;\\n      }\\n\\n      .person-entity-title {\\n        font-size: 0.9375rem;\\n      }\\n\\n      .person-entity {\\n        display: flex;\\n      }\\n\\n      .person-entity > .person-entity-chip + .person-entity-chip {\\n        margin-left: 1rem;\\n      }\\n\\n      .person-entity-chip {\\n        align-items: center;\\n        background-color: var(--card-background-color);\\n        border: thin solid var(--primary-color);\\n        border-radius: 1.5625rem;\\n        cursor: pointer;\\n        display: flex;\\n        font-weight: bold;\\n        height: 2.5rem;\\n        justify-content: flex-start;\\n        line-height: 2.5rem;\\n        padding: 0 1rem 0 1px;\\n        overflow: hidden;\\n        width: auto;\\n      }\\n\\n      .person-entity-chip > img {\\n        border-radius: 50%;\\n        height: auto;\\n        margin-right: 1rem;\\n        width: 2.3125rem;\\n      }\\n    \"])));\n  }\n\n  renderTitle(title) {\n    if (title !== '') {\n      return html(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral([\"\\n        <p class='person-entity-title'><strong>\", \"</strong></p>\\n      \"])), title);\n    }\n\n    return '';\n  }\n\n  renderPeople(people) {\n    const peopleArr = Object.keys(people);\n    const {\n      language,\n      resources\n    } = this.hass;\n    const translations = resources[language];\n    return html(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral([\"\\n      \", \"\\n    \"])), peopleArr.map(person => people[person].state !== 'home' && people[person].state !== 'unknown' ? html(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral([\"\\n              <div\\n                class='person-entity-chip'\\n                @click='@click=\", \"'\\n              >\\n                <img src='\", \"' />\\n                \", \"\\n              </div>\\n            \"])), e => this.handleTap(e, person), people[person].attributes.entity_picture, people[person].state !== 'home' && people[person].state === 'not_home' ? translations['component.person.state._.not_home'] : people[person].state) : ''));\n  }\n\n  render() {\n    const hass = this.hass;\n    const {\n      entities,\n      title\n    } = this.config;\n    const regex = new RegExp(\"^(\".concat(entities.toString().replaceAll(',', '|'), \")$\"));\n    const people = Object.keys(hass.states).filter(state => state.match(regex) !== null).reduce((res, key) => Object.assign(res, {\n      [key]: hass.states[key]\n    }), {});\n    let areEverybodyAtHome = true;\n    Object.keys(people).map(person => people[person].state !== 'home' ? areEverybodyAtHome = false : '');\n    return !areEverybodyAtHome ? html(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral([\"\\n          <ha-card>\\n            \", \"\\n            <div class='person-entity'>\", \"</div>\\n          </ha-card>\\n        \"])), this.renderTitle(title), this.renderPeople(people)) : '';\n  }\n\n}\n\ncustomElements.define('custom-person-card', CustomPersonCard);\n\n//# sourceURL=webpack://person-entity-card/./src/person-entity-card.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/person-entity-card.js");
/******/ 	
/******/ })()
;