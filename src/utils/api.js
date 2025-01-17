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
    attemptReconnect();
    throw new Error("Failed to delete item after multiple attempts");
  }
  return res;
}

function attemptReconnect(maxRetries = 10) {
  let retryCount = 0;

  return new Promise((resolve, reject) => {
    const reconnectInterval = setInterval(() => {
      fetch(`${baseUrl}/items`)
        .then((res) => {
          if (res.ok) {
            clearInterval(reconnectInterval);
            console.log("Reconnection successful!");
            resolve();
          }
        })
        .catch(() => {
          retryCount++;
          console.log(
            `Reconnect attempt #${retryCount} failed. Retrying in 1 second...`
          );
          if (retryCount >= maxRetries) {
            clearInterval(reconnectInterval);
            console.error(
              "Maximum reconnect attempts reached. Unable to reconnect."
            );
            reject(
              new Error(
                `Failed to reconnect to the server after ${maxRetries} attempts.`
              )
            );
          }
        });
    }, 1000);
  });
}

export function getItems() {
  return fetch(`${baseUrl}/items`)
    .then((res) => {
      return attemptGainResponse(res);
    })
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    })
    .catch(console.error);
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
    })
    .catch((res) => attemptGainResponse(res, 5, 1000));
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
    })
    .catch(console.error);
}
