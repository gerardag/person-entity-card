const handleClick = (node, hass, config, actionConfig) => {
  let e;

  // eslint-disable-next-line default-case
  switch (actionConfig.action) {
    case 'more-info':
      e = new Event('hass-more-info', { composed: true });
      e.detail = { entityId: actionConfig.entity || config.entity };
      node.dispatchEvent(e);
      break;

    case 'navigate':
      if (!actionConfig.navigation_path) return;
      // eslint-disable-next-line no-restricted-globals
      history.pushState(null, '', actionConfig.navigation_path);
      e = new Event('location-changed', { composed: true });
      e.detail = { replace: false };
      window.dispatchEvent(e);
      break;

    case 'call-service':
      if (!actionConfig.service) return;
      // eslint-disable-next-line no-case-declarations
      const [domain, service] = actionConfig.service.split('.', 2);
      // eslint-disable-next-line no-case-declarations
      const serviceData = { ...actionConfig.service_data };

      hass.callService(domain, service, serviceData);
  }
};

export default handleClick;
