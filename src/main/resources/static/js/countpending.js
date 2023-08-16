/*
document.addEventListener('DOMContentLoaded', () => {
const endpoint = '/api/draftCount';
setInterval(() => {
    fetch(endpoint)
    .then(response => response.json())
    .then(draftCount => {
        document.querySelector('.button__badge').textContent = draftCount;
    });
}, 3000);
});
*/

let draftCountRequest;

window.addEventListener('beforeunload', () => {
  if (draftCountRequest) {
    draftCountRequest.abort();
  }
});
const endpoint = '/api/draftCount';
const controller = new AbortController();

setInterval(() => {
  if (draftCountRequest) {
    // Cancel the previous request if it's still in progress
    controller.abort();
  }

  draftCountRequest = fetch(endpoint, { signal: controller.signal })
    .then(response => response.json())
    .then(draftCount => {
      document.querySelector('.button__badge').textContent = draftCount;
      draftCountRequest = null; // Reset the request variable
    })
    .catch(error => {
      console.error('API request failed:', error);
      draftCountRequest = null; // Reset the request variable
    });
}, 3000);
