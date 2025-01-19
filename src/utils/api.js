const baseUrl = "http://localhost:3001";

function attemptGainResponse(res, retries = 5, delay = 1000) {
  if (!res.ok && retries > 0) {
    return new Promise((resolve) => {
      setTimeout(() => {
        fetch(res.url)
          .then((res) => attemptGainResponse(res, retries - 1, delay))
          .then(resolve)
          .catch(console.error);
      }, delay);
    });
  }
  if (!res.ok) {
    throw new Error("Failed to connect");
  }
  return res;
}

export function getItems() {
  return fetch(`${baseUrl}/items`)
    .then((res) => {
      return attemptGainResponse(res);
    })
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
}

export function addItems(item) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then((res) => {
      return attemptGainResponse(res);
    })
    .then((data) => {
      return data;
    });
}

export function deleteItem(itemId) {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => attemptGainResponse(res, 5, 1000))
    .then((data) => {
      return data;
    });
}
