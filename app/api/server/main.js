const BASE_URL = 'http://localhost:5000/api';

export function openWagers() {
   const URL = `${BASE_URL}/wagers/open`;
   return fetch(URL, {
      headers: { 'content-type': 'application/json' }
   })
   .then((res) => {
      return res.json();
   }).then((json) => {
      return json;
   });
}

export function createWager(body) {
   const URL = `${BASE_URL}/wagers`;
   return fetch(URL, {
      headers: { 'content-type': 'application/json' },
      method: 'post',
      body: JSON.stringify(body),
   })
   .then(response => response.json().then(json => ({ json, response })))
   .then(({ json, response }) => {
      if (!response.ok) {
         return Promise.reject(json);
      }

      return json;
   })
   .then(
      response => response,
      error => error
   );
}

export function acceptWager(id, body) {
   const URL = `${BASE_URL}/wagers/${id}`;
   return fetch(URL, {
      headers: { 'content-type': 'application/json' },
      method: 'put',
      body: JSON.stringify(body),
   })
   .then(response => response.json().then(json => ({ json, response })))
   .then(({ json, response }) => {
      if (!response.ok) {
         return Promise.reject(json);
      }

      return json;
   })
   .then(
      response => response,
      error => error
   );
}
