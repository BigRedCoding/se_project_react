import { baseUrl, attemptGainResponse } from "../utils/api.js";
const auth = require("../../../se_project_express/middlewares/auth.js");
//write further code to check DB while signup
//write further code to check DB while signin

export function signup(item) {
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

export function signin(item) {
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
