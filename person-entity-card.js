/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/handleClick.js":
/*!****************************!*\
  !*** ./src/handleClick.js ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.handleClick = void 0;

const handleClick = (node, hass, config, actionConfig) => {
  let e;

  switch (actionConfig.action) {
    case 'more-info':
      e = new Event('hass-more-info', {
        composed: true
      });
      e.detail = {
        entityId: actionConfig.entity || config.entity
      };
      console.log(e);
      node.dispatchEvent(e);
      break;

    case 'navigate':
      if (!actionConfig.navigation_path) return;
      history.pushState(null, '', actionConfig.navigation_path);
      e = new Event('location-changed', {
        composed: true
      });
      e.detail = {
        replace: false
      };
      window.dispatchEvent(e);
      break;

    case 'call-service':
      if (!actionConfig.service) return;
      const [domain, service] = actionConfig.service.split(".", 2);
      const serviceData = { ...actionConfig.service_data
      };
      hass.callService(domain, service, serviceData);
  }
};

exports.handleClick = handleClick;

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************************!*\
  !*** ./src/person-entity-card.js ***!
  \***********************************/


var _handleClick = __webpack_require__(/*! ./handleClick.js */ "./src/handleClick.js");

var _templateObject, _templateObject2, _templateObject3, _templateObject4;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

const LitElement = window.LitElement || Object.getPrototypeOf(customElements.get("ha-panel-lovelace") || customElements.get("hc-lovelace"));
const {
  html,
  css
} = LitElement.prototype;

class CustomPersonCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {}
    };
  }

  handleTap(e, entity) {
    (0, _handleClick.handleClick)(this, this._hass, this.config, {
      action: 'more-info',
      entity
    });
  }

  setConfig(config) {
    if (!config.entities) {
      throw new Error("You need to define entities");
    }

    this.config = config;
  }

  _toggle(state) {
    this.hass.callService("homeassistant", "toggle", {
      entity_id: state.entity_id
    });
  }

  static get styles() {
    return css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n      ha-card {\n        background: none;\n        border: none;\n        box-shadow: none;\n        font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',sans-serif;\n        padding-left: 8px;\n        padding-right: 8px;\n      }\n\n      .grrd-person-title {\n        font-size: 15px;\n      }\n\n      .grrd-person {\n        display: flex;\n      }\n\n      .grrd-person > .grrd-chip + .grrd-chip {\n        margin-left: 1rem;\n      }\n\n      .grrd-chip {\n        align-items: center;\n        background-color: var(--card-background-color);\n        border: thin solid var(--primary-color);\n        border-radius: 25px;\n        cursor: pointer;\n        display: flex;\n        font-weight: bold;\n        height: 40px;\n        justify-content: flex-start;\n        line-height: 40px;\n        padding: 0 1rem 0 1px;\n        overflow: hidden;\n        width: auto;\n      }\n\n      .grrd-chip > img {\n        border-radius: 50%;\n        height: auto;\n        margin-right: 1rem;\n        width: 37px;\n      }\n    "])));
  }

  renderPeople(people) {
    const peopleArr = Object.keys(people);
    const {
      language,
      resources
    } = this.hass;
    const translations = resources[language];
    return html(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n      ", "\n    "])), peopleArr.map(person => people[person].state !== 'home' && people[person].state !== 'unknown' ? html(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n            <div class=\"grrd-chip\" @click=\"@click=", "\">\n              <img src=\"", "\" />\n              ", "\n            </div>\n            "])), e => this.handleTap(e, person), people[person].attributes.entity_picture, people[person].state !== 'home' && people[person].state === 'not_home' ? translations['component.person.state._.not_home'] : people[person].state) : ''));
  }

  render() {
    const hass = this.hass;
    const {
      entities
    } = this.config;
    const regex = new RegExp("^(".concat(entities.toString().replaceAll(',', '|'), ")$"));
    const people = Object.keys(hass.states).filter(state => state.match(regex) !== null).reduce((res, key) => Object.assign(res, {
      [key]: hass.states[key]
    }), {});
    let areEverybodyAtHome = true;
    Object.keys(people).map(person => people[person].state !== 'home' ? areEverybodyAtHome = false : '');
    return !areEverybodyAtHome ? html(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n      <ha-card>\n        <p class=\"grrd-person-title\"><strong>Familia</strong></p>\n        <div class=\"grrd-person\">\n          ", "\n        </div>\n      </ha-card>\n    "])), this.renderPeople(people)) : '';
  }

}

customElements.define('custom-person-card', CustomPersonCard);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc29uLWVudGl0eS1jYXJkLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU8sTUFBTUEsV0FBVyxHQUFHLENBQUNDLElBQUQsRUFBT0MsSUFBUCxFQUFhQyxNQUFiLEVBQXFCQyxZQUFyQixLQUFzQztBQUMvRCxNQUFJQyxDQUFKOztBQUNBLFVBQVFELFlBQVksQ0FBQ0UsTUFBckI7QUFDRSxTQUFLLFdBQUw7QUFDRUQsTUFBQUEsQ0FBQyxHQUFHLElBQUlFLEtBQUosQ0FBVSxnQkFBVixFQUE0QjtBQUFFQyxRQUFBQSxRQUFRLEVBQUU7QUFBWixPQUE1QixDQUFKO0FBQ0FILE1BQUFBLENBQUMsQ0FBQ0ksTUFBRixHQUFXO0FBQUVDLFFBQUFBLFFBQVEsRUFBRU4sWUFBWSxDQUFDTyxNQUFiLElBQXVCUixNQUFNLENBQUNRO0FBQTFDLE9BQVg7QUFDQUMsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlSLENBQVo7QUFDQUosTUFBQUEsSUFBSSxDQUFDYSxhQUFMLENBQW1CVCxDQUFuQjtBQUNBOztBQUVGLFNBQUssVUFBTDtBQUNFLFVBQUksQ0FBQ0QsWUFBWSxDQUFDVyxlQUFsQixFQUFtQztBQUNuQ0MsTUFBQUEsT0FBTyxDQUFDQyxTQUFSLENBQWtCLElBQWxCLEVBQXdCLEVBQXhCLEVBQTRCYixZQUFZLENBQUNXLGVBQXpDO0FBQ0FWLE1BQUFBLENBQUMsR0FBRyxJQUFJRSxLQUFKLENBQVUsa0JBQVYsRUFBOEI7QUFBRUMsUUFBQUEsUUFBUSxFQUFFO0FBQVosT0FBOUIsQ0FBSjtBQUNBSCxNQUFBQSxDQUFDLENBQUNJLE1BQUYsR0FBVztBQUFFUyxRQUFBQSxPQUFPLEVBQUU7QUFBWCxPQUFYO0FBQ0FDLE1BQUFBLE1BQU0sQ0FBQ0wsYUFBUCxDQUFxQlQsQ0FBckI7QUFDQTs7QUFFRixTQUFLLGNBQUw7QUFDRSxVQUFJLENBQUNELFlBQVksQ0FBQ2dCLE9BQWxCLEVBQTJCO0FBQzNCLFlBQU0sQ0FBRUMsTUFBRixFQUFVRCxPQUFWLElBQXNCaEIsWUFBWSxDQUFDZ0IsT0FBYixDQUFxQkUsS0FBckIsQ0FBMkIsR0FBM0IsRUFBZ0MsQ0FBaEMsQ0FBNUI7QUFDQSxZQUFNQyxXQUFXLEdBQUcsRUFBRSxHQUFHbkIsWUFBWSxDQUFDb0I7QUFBbEIsT0FBcEI7QUFDRXRCLE1BQUFBLElBQUksQ0FBQ3VCLFdBQUwsQ0FBaUJKLE1BQWpCLEVBQXlCRCxPQUF6QixFQUFrQ0csV0FBbEM7QUFwQk47QUFzQkQsQ0F4Qk07Ozs7Ozs7O1VDQVA7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7Ozs7QUN0QkE7Ozs7OztBQUVBLE1BQU1HLFVBQVUsR0FBR1AsTUFBTSxDQUFDTyxVQUFQLElBQ2RDLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsY0FBYyxDQUFDQyxHQUFmLENBQW1CLG1CQUFuQixLQUEyQ0QsY0FBYyxDQUFDQyxHQUFmLENBQW1CLGFBQW5CLENBQWpFLENBREw7QUFFQSxNQUFNO0FBQUVDLEVBQUFBLElBQUY7QUFBUUMsRUFBQUE7QUFBUixJQUFnQk4sVUFBVSxDQUFDTyxTQUFqQzs7QUFFQSxNQUFNQyxnQkFBTixTQUErQlIsVUFBL0IsQ0FBMEM7QUFDbkIsYUFBVlMsVUFBVSxHQUFHO0FBQ3RCLFdBQU87QUFDTGpDLE1BQUFBLElBQUksRUFBRSxFQUREO0FBRUxDLE1BQUFBLE1BQU0sRUFBRTtBQUZILEtBQVA7QUFJRDs7QUFFRGlDLEVBQUFBLFNBQVMsQ0FBQy9CLENBQUQsRUFBSU0sTUFBSixFQUFZO0FBQ25CLGtDQUFZLElBQVosRUFBa0IsS0FBSzBCLEtBQXZCLEVBQThCLEtBQUtsQyxNQUFuQyxFQUEyQztBQUFDRyxNQUFBQSxNQUFNLEVBQUUsV0FBVDtBQUFzQkssTUFBQUE7QUFBdEIsS0FBM0M7QUFDRDs7QUFFRDJCLEVBQUFBLFNBQVMsQ0FBQ25DLE1BQUQsRUFBUztBQUNoQixRQUFJLENBQUNBLE1BQU0sQ0FBQ29DLFFBQVosRUFBc0I7QUFDcEIsWUFBTSxJQUFJQyxLQUFKLENBQVUsNkJBQVYsQ0FBTjtBQUNEOztBQUNELFNBQUtyQyxNQUFMLEdBQWNBLE1BQWQ7QUFDRDs7QUFFRHNDLEVBQUFBLE9BQU8sQ0FBQ0MsS0FBRCxFQUFRO0FBQ2IsU0FBS3hDLElBQUwsQ0FBVXVCLFdBQVYsQ0FBc0IsZUFBdEIsRUFBdUMsUUFBdkMsRUFBaUQ7QUFDL0NrQixNQUFBQSxTQUFTLEVBQUVELEtBQUssQ0FBQ0M7QUFEOEIsS0FBakQ7QUFHRDs7QUFFZ0IsYUFBTkMsTUFBTSxHQUFHO0FBQ2xCLFdBQU9aLEdBQVA7QUE2Q0Q7O0FBRURhLEVBQUFBLFlBQVksQ0FBQ0MsTUFBRCxFQUFTO0FBQ25CLFVBQU1DLFNBQVMsR0FBR3BCLE1BQU0sQ0FBQ3FCLElBQVAsQ0FBWUYsTUFBWixDQUFsQjtBQUNBLFVBQU07QUFBQ0csTUFBQUEsUUFBRDtBQUFXQyxNQUFBQTtBQUFYLFFBQXdCLEtBQUtoRCxJQUFuQztBQUNBLFVBQU1pRCxZQUFZLEdBQUdELFNBQVMsQ0FBQ0QsUUFBRCxDQUE5QjtBQUVBLFdBQU9sQixJQUFQLDBGQUNJZ0IsU0FBUyxDQUFDSyxHQUFWLENBQWNDLE1BQU0sSUFDcEJQLE1BQU0sQ0FBQ08sTUFBRCxDQUFOLENBQWVYLEtBQWYsS0FBeUIsTUFBekIsSUFBbUNJLE1BQU0sQ0FBQ08sTUFBRCxDQUFOLENBQWVYLEtBQWYsS0FBeUIsU0FBNUQsR0FDSVgsSUFESixnT0FFNkMxQixDQUFELElBQU8sS0FBSytCLFNBQUwsQ0FBZS9CLENBQWYsRUFBa0JnRCxNQUFsQixDQUZuRCxFQUdrQlAsTUFBTSxDQUFDTyxNQUFELENBQU4sQ0FBZUMsVUFBZixDQUEwQkMsY0FINUMsRUFJUVQsTUFBTSxDQUFDTyxNQUFELENBQU4sQ0FBZVgsS0FBZixLQUF5QixNQUF6QixJQUFtQ0ksTUFBTSxDQUFDTyxNQUFELENBQU4sQ0FBZVgsS0FBZixLQUF5QixVQUE1RCxHQUF5RVMsWUFBWSxDQUFDLG1DQUFELENBQXJGLEdBQTZITCxNQUFNLENBQUNPLE1BQUQsQ0FBTixDQUFlWCxLQUpwSixJQU9JLEVBUkosQ0FESjtBQVlEOztBQUVEYyxFQUFBQSxNQUFNLEdBQUc7QUFDUCxVQUFNdEQsSUFBSSxHQUFHLEtBQUtBLElBQWxCO0FBQ0EsVUFBTTtBQUFFcUMsTUFBQUE7QUFBRixRQUFlLEtBQUtwQyxNQUExQjtBQUNBLFVBQU1zRCxLQUFLLEdBQUcsSUFBSUMsTUFBSixhQUFnQm5CLFFBQVEsQ0FBQ29CLFFBQVQsR0FBb0JDLFVBQXBCLENBQStCLEdBQS9CLEVBQW9DLEdBQXBDLENBQWhCLFFBQWQ7QUFDQSxVQUFNZCxNQUFNLEdBQUduQixNQUFNLENBQ2xCcUIsSUFEWSxDQUNQOUMsSUFBSSxDQUFDMkQsTUFERSxFQUVaQyxNQUZZLENBRUxwQixLQUFLLElBQUlBLEtBQUssQ0FBQ3FCLEtBQU4sQ0FBWU4sS0FBWixNQUF1QixJQUYzQixFQUdaTyxNQUhZLENBR0wsQ0FBQ0MsR0FBRCxFQUFNQyxHQUFOLEtBQWN2QyxNQUFNLENBQUN3QyxNQUFQLENBQWNGLEdBQWQsRUFBbUI7QUFBRSxPQUFDQyxHQUFELEdBQU9oRSxJQUFJLENBQUMyRCxNQUFMLENBQVlLLEdBQVo7QUFBVCxLQUFuQixDQUhULEVBRzBELEVBSDFELENBQWY7QUFLQSxRQUFJRSxrQkFBa0IsR0FBRyxJQUF6QjtBQUNBekMsSUFBQUEsTUFBTSxDQUFDcUIsSUFBUCxDQUFZRixNQUFaLEVBQW9CTSxHQUFwQixDQUF3QkMsTUFBTSxJQUFJUCxNQUFNLENBQUNPLE1BQUQsQ0FBTixDQUFlWCxLQUFmLEtBQXlCLE1BQXpCLEdBQWtDMEIsa0JBQWtCLEdBQUcsS0FBdkQsR0FBK0QsRUFBakc7QUFFQSxXQUFPLENBQUNBLGtCQUFELEdBQXNCckMsSUFBdEIsMlBBSUMsS0FBS2MsWUFBTCxDQUFrQkMsTUFBbEIsQ0FKRCxJQU9ILEVBUEo7QUFRRDs7QUFoSHVDOztBQW1IMUNqQixjQUFjLENBQUN3QyxNQUFmLENBQXNCLG9CQUF0QixFQUE0Q25DLGdCQUE1QyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcGVyc29uLWVudGl0eS1jYXJkLy4vc3JjL2hhbmRsZUNsaWNrLmpzIiwid2VicGFjazovL3BlcnNvbi1lbnRpdHktY2FyZC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wZXJzb24tZW50aXR5LWNhcmQvLi9zcmMvcGVyc29uLWVudGl0eS1jYXJkLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBoYW5kbGVDbGljayA9IChub2RlLCBoYXNzLCBjb25maWcsIGFjdGlvbkNvbmZpZykgPT4ge1xuICBsZXQgZTtcbiAgc3dpdGNoIChhY3Rpb25Db25maWcuYWN0aW9uKSB7XG4gICAgY2FzZSAnbW9yZS1pbmZvJzpcbiAgICAgIGUgPSBuZXcgRXZlbnQoJ2hhc3MtbW9yZS1pbmZvJywgeyBjb21wb3NlZDogdHJ1ZSB9KTtcbiAgICAgIGUuZGV0YWlsID0geyBlbnRpdHlJZDogYWN0aW9uQ29uZmlnLmVudGl0eSB8fCBjb25maWcuZW50aXR5IH07XG4gICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgIG5vZGUuZGlzcGF0Y2hFdmVudChlKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnbmF2aWdhdGUnOlxuICAgICAgaWYgKCFhY3Rpb25Db25maWcubmF2aWdhdGlvbl9wYXRoKSByZXR1cm47XG4gICAgICBoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCAnJywgYWN0aW9uQ29uZmlnLm5hdmlnYXRpb25fcGF0aCk7XG4gICAgICBlID0gbmV3IEV2ZW50KCdsb2NhdGlvbi1jaGFuZ2VkJywgeyBjb21wb3NlZDogdHJ1ZSB9KTtcbiAgICAgIGUuZGV0YWlsID0geyByZXBsYWNlOiBmYWxzZSB9O1xuICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQoZSk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2NhbGwtc2VydmljZSc6XG4gICAgICBpZiAoIWFjdGlvbkNvbmZpZy5zZXJ2aWNlKSByZXR1cm47XG4gICAgICBjb25zdCBbIGRvbWFpbiwgc2VydmljZSBdID0gYWN0aW9uQ29uZmlnLnNlcnZpY2Uuc3BsaXQoXCIuXCIsIDIpO1xuICAgICAgY29uc3Qgc2VydmljZURhdGEgPSB7IC4uLmFjdGlvbkNvbmZpZy5zZXJ2aWNlX2RhdGEgfTtcbiAgICAgICAgaGFzcy5jYWxsU2VydmljZShkb21haW4sIHNlcnZpY2UsIHNlcnZpY2VEYXRhKTtcbiAgfVxufTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiaW1wb3J0IHsgaGFuZGxlQ2xpY2sgfSBmcm9tICcuL2hhbmRsZUNsaWNrLmpzJztcblxuY29uc3QgTGl0RWxlbWVudCA9IHdpbmRvdy5MaXRFbGVtZW50XG4gIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihjdXN0b21FbGVtZW50cy5nZXQoXCJoYS1wYW5lbC1sb3ZlbGFjZVwiKSB8fCBjdXN0b21FbGVtZW50cy5nZXQoXCJoYy1sb3ZlbGFjZVwiKSlcbmNvbnN0IHsgaHRtbCwgY3NzIH0gPSBMaXRFbGVtZW50LnByb3RvdHlwZTtcblxuY2xhc3MgQ3VzdG9tUGVyc29uQ2FyZCBleHRlbmRzIExpdEVsZW1lbnQge1xuICBzdGF0aWMgZ2V0IHByb3BlcnRpZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhhc3M6IHt9LFxuICAgICAgY29uZmlnOiB7fVxuICAgIH07XG4gIH1cblxuICBoYW5kbGVUYXAoZSwgZW50aXR5KSB7XG4gICAgaGFuZGxlQ2xpY2sodGhpcywgdGhpcy5faGFzcywgdGhpcy5jb25maWcsIHthY3Rpb246ICdtb3JlLWluZm8nLCBlbnRpdHl9KTtcbiAgfVxuXG4gIHNldENvbmZpZyhjb25maWcpIHtcbiAgICBpZiAoIWNvbmZpZy5lbnRpdGllcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiWW91IG5lZWQgdG8gZGVmaW5lIGVudGl0aWVzXCIpO1xuICAgIH1cbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgfVxuXG4gIF90b2dnbGUoc3RhdGUpIHtcbiAgICB0aGlzLmhhc3MuY2FsbFNlcnZpY2UoXCJob21lYXNzaXN0YW50XCIsIFwidG9nZ2xlXCIsIHtcbiAgICAgIGVudGl0eV9pZDogc3RhdGUuZW50aXR5X2lkXG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZ2V0IHN0eWxlcygpIHtcbiAgICByZXR1cm4gY3NzYFxuICAgICAgaGEtY2FyZCB7XG4gICAgICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcbiAgICAgICAgZm9udC1mYW1pbHk6IEludGVyLCAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdTZWdvZSBVSScsIFJvYm90bywgT3h5Z2VuLCBVYnVudHUsIENhbnRhcmVsbCwgJ09wZW4gU2Fucycsc2Fucy1zZXJpZjtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiA4cHg7XG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDhweDtcbiAgICAgIH1cblxuICAgICAgLmdycmQtcGVyc29uLXRpdGxlIHtcbiAgICAgICAgZm9udC1zaXplOiAxNXB4O1xuICAgICAgfVxuXG4gICAgICAuZ3JyZC1wZXJzb24ge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgfVxuXG4gICAgICAuZ3JyZC1wZXJzb24gPiAuZ3JyZC1jaGlwICsgLmdycmQtY2hpcCB7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAxcmVtO1xuICAgICAgfVxuXG4gICAgICAuZ3JyZC1jaGlwIHtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2FyZC1iYWNrZ3JvdW5kLWNvbG9yKTtcbiAgICAgICAgYm9yZGVyOiB0aGluIHNvbGlkIHZhcigtLXByaW1hcnktY29sb3IpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAyNXB4O1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICBoZWlnaHQ6IDQwcHg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDQwcHg7XG4gICAgICAgIHBhZGRpbmc6IDAgMXJlbSAwIDFweDtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgd2lkdGg6IGF1dG87XG4gICAgICB9XG5cbiAgICAgIC5ncnJkLWNoaXAgPiBpbWcge1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIGhlaWdodDogYXV0bztcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAxcmVtO1xuICAgICAgICB3aWR0aDogMzdweDtcbiAgICAgIH1cbiAgICBgO1xuICB9XG5cbiAgcmVuZGVyUGVvcGxlKHBlb3BsZSkge1xuICAgIGNvbnN0IHBlb3BsZUFyciA9IE9iamVjdC5rZXlzKHBlb3BsZSk7XG4gICAgY29uc3Qge2xhbmd1YWdlLCByZXNvdXJjZXN9ID0gdGhpcy5oYXNzO1xuICAgIGNvbnN0IHRyYW5zbGF0aW9ucyA9IHJlc291cmNlc1tsYW5ndWFnZV07XG5cbiAgICByZXR1cm4gaHRtbGBcbiAgICAgICR7cGVvcGxlQXJyLm1hcChwZXJzb24gPT5cbiAgICAgICAgcGVvcGxlW3BlcnNvbl0uc3RhdGUgIT09ICdob21lJyAmJiBwZW9wbGVbcGVyc29uXS5zdGF0ZSAhPT0gJ3Vua25vd24nXG4gICAgICAgICAgPyBodG1sIGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncnJkLWNoaXBcIiBAY2xpY2s9XCJAY2xpY2s9JHsoZSkgPT4gdGhpcy5oYW5kbGVUYXAoZSwgcGVyc29uKX1cIj5cbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIke3Blb3BsZVtwZXJzb25dLmF0dHJpYnV0ZXMuZW50aXR5X3BpY3R1cmV9XCIgLz5cbiAgICAgICAgICAgICAgJHtwZW9wbGVbcGVyc29uXS5zdGF0ZSAhPT0gJ2hvbWUnICYmIHBlb3BsZVtwZXJzb25dLnN0YXRlID09PSAnbm90X2hvbWUnID8gdHJhbnNsYXRpb25zWydjb21wb25lbnQucGVyc29uLnN0YXRlLl8ubm90X2hvbWUnXSA6IHBlb3BsZVtwZXJzb25dLnN0YXRlfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICBgXG4gICAgICAgICAgOiAnJ1xuICAgICAgKX1cbiAgICBgO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGhhc3MgPSB0aGlzLmhhc3M7XG4gICAgY29uc3QgeyBlbnRpdGllcyB9ID0gdGhpcy5jb25maWc7XG4gICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKGBeKCR7ZW50aXRpZXMudG9TdHJpbmcoKS5yZXBsYWNlQWxsKCcsJywgJ3wnKX0pJGApO1xuICAgIGNvbnN0IHBlb3BsZSA9IE9iamVjdFxuICAgICAgLmtleXMoaGFzcy5zdGF0ZXMpXG4gICAgICAuZmlsdGVyKHN0YXRlID0+IHN0YXRlLm1hdGNoKHJlZ2V4KSAhPT0gbnVsbClcbiAgICAgIC5yZWR1Y2UoKHJlcywga2V5KSA9PiBPYmplY3QuYXNzaWduKHJlcywgeyBba2V5XTogaGFzcy5zdGF0ZXNba2V5XSB9KSwge30pO1xuXG4gICAgbGV0IGFyZUV2ZXJ5Ym9keUF0SG9tZSA9IHRydWU7XG4gICAgT2JqZWN0LmtleXMocGVvcGxlKS5tYXAocGVyc29uID0+IHBlb3BsZVtwZXJzb25dLnN0YXRlICE9PSAnaG9tZScgPyBhcmVFdmVyeWJvZHlBdEhvbWUgPSBmYWxzZSA6ICcnKTtcblxuICAgIHJldHVybiAhYXJlRXZlcnlib2R5QXRIb21lID8gaHRtbGBcbiAgICAgIDxoYS1jYXJkPlxuICAgICAgICA8cCBjbGFzcz1cImdycmQtcGVyc29uLXRpdGxlXCI+PHN0cm9uZz5GYW1pbGlhPC9zdHJvbmc+PC9wPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JyZC1wZXJzb25cIj5cbiAgICAgICAgICAke3RoaXMucmVuZGVyUGVvcGxlKHBlb3BsZSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9oYS1jYXJkPlxuICAgIGAgOiAnJztcbiAgfVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2N1c3RvbS1wZXJzb24tY2FyZCcsIEN1c3RvbVBlcnNvbkNhcmQpOyJdLCJuYW1lcyI6WyJoYW5kbGVDbGljayIsIm5vZGUiLCJoYXNzIiwiY29uZmlnIiwiYWN0aW9uQ29uZmlnIiwiZSIsImFjdGlvbiIsIkV2ZW50IiwiY29tcG9zZWQiLCJkZXRhaWwiLCJlbnRpdHlJZCIsImVudGl0eSIsImNvbnNvbGUiLCJsb2ciLCJkaXNwYXRjaEV2ZW50IiwibmF2aWdhdGlvbl9wYXRoIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsInJlcGxhY2UiLCJ3aW5kb3ciLCJzZXJ2aWNlIiwiZG9tYWluIiwic3BsaXQiLCJzZXJ2aWNlRGF0YSIsInNlcnZpY2VfZGF0YSIsImNhbGxTZXJ2aWNlIiwiTGl0RWxlbWVudCIsIk9iamVjdCIsImdldFByb3RvdHlwZU9mIiwiY3VzdG9tRWxlbWVudHMiLCJnZXQiLCJodG1sIiwiY3NzIiwicHJvdG90eXBlIiwiQ3VzdG9tUGVyc29uQ2FyZCIsInByb3BlcnRpZXMiLCJoYW5kbGVUYXAiLCJfaGFzcyIsInNldENvbmZpZyIsImVudGl0aWVzIiwiRXJyb3IiLCJfdG9nZ2xlIiwic3RhdGUiLCJlbnRpdHlfaWQiLCJzdHlsZXMiLCJyZW5kZXJQZW9wbGUiLCJwZW9wbGUiLCJwZW9wbGVBcnIiLCJrZXlzIiwibGFuZ3VhZ2UiLCJyZXNvdXJjZXMiLCJ0cmFuc2xhdGlvbnMiLCJtYXAiLCJwZXJzb24iLCJhdHRyaWJ1dGVzIiwiZW50aXR5X3BpY3R1cmUiLCJyZW5kZXIiLCJyZWdleCIsIlJlZ0V4cCIsInRvU3RyaW5nIiwicmVwbGFjZUFsbCIsInN0YXRlcyIsImZpbHRlciIsIm1hdGNoIiwicmVkdWNlIiwicmVzIiwia2V5IiwiYXNzaWduIiwiYXJlRXZlcnlib2R5QXRIb21lIiwiZGVmaW5lIl0sInNvdXJjZVJvb3QiOiIifQ==