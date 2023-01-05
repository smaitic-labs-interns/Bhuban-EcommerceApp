/*
 * Will create object having method and endpoints using different request methods,
 *.getEndpoints() will return this object
 */

export const apiEndpoint = (name) => {
  const endpointObjects = {};

  /*
   *Check for path parameter, if present slice out
   */
  const key = (link) => {
    if (link.indexOf('/:') !== -1) {
      return link.slice(0, link.indexOf('/:'));
    }
    return link;
  };

  return {
    get: (link) => {
      endpointObjects[key(link)] = { method: 'GET', url: `/${name}/${link}` };
    },
    post: (link) => {
      endpointObjects[key(link)] = { method: 'POST', url: `/${name}/${link}` };
    },
    put: (link) => {
      endpointObjects[key(link)] = { method: 'PUT', url: `/${name}/${link}` };
    },
    delete: (link) => {
      endpointObjects[key(link)] = { method: 'DELETE', url: `/${name}/${link}` };
    },
    getEndpoints: () => endpointObjects,
  };
};
