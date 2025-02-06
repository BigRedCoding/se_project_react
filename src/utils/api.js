export const baseUrl = "http://localhost:3001";

import AvatarImage from "../assets/Avatar.svg";

export function getItems() {
  return fetch(`${baseUrl}/items`)
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error(error);
      return {
        link: AvatarImage,
        message: "Network error or invalid URL, using fallback image.",
      };
    });
}

// export function getItems() {
//   return fetch(`${baseUrl}/items`).then((res) => {
//     return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
//   });
// }

export function addItems(item) {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject(`Error: ${res.status}`);
    });
}

export function deleteItem(itemId) {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject(`Error: ${res.status}`);
    });
}

export function handleLoginUser(userData) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log("Login successful");

      if (data.token) {
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("userData", JSON.stringify(data.userInfo));
      } else {
        console.error("No token received in response.");
        return Promise.reject(new Error("No token received."));
      }
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject(`Error: ${res.status}`);
    });
}

export function handleSignupUser(userData) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject(`Error: ${res.status}`);
    });
}

export function handleUpdateProfile(userData, token) {
  fetch(`${baseUrl}/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    })
    .then(() => {
      console.log("Updated profile successfully.");
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject(`Error: ${res.status}`);
    });
}
export function addCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject(`Error: ${res.status}`);
    });
}

export const removeCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error(error);
      return Promise.reject(`Error: ${res.status}`);
    });
};
