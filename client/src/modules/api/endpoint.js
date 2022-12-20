/*
 * Will create object having method and endpoints using different request methods,
 *.getEndpoints() will return this object
 */

export const apiEndpoint = (name) => {
  const endpointObjects = {};
  return {
    get: (link) => {
      endpointObjects[link] = { method: 'GET', url: `/${name}/${link}` };
    },
    post: (link) => {
      endpointObjects[link] = { method: 'POST', url: `/${name}/${link}` };
    },
    put: (link) => {
      endpointObjects[link] = { method: 'PUT', url: `/${name}/${link}` };
    },
    delete: (link) => {
      endpointObjects[link] = { method: 'DELETE', url: `/${name}/${link}` };
    },
    getEndpoints: () => endpointObjects,
  };
};
