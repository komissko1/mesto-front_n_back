export const BASE_URL = "http://localhost:3000";

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      'Accept': "application/json",
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({ password, email }),
  })
    .then((res) => {
      try {
        if (res.status === 400 || res.status === 401) {
          return false;
        } else {
          return res.json();
        }
      } catch (err) {
        return err;
      }
    })
    .then((data) => data)
    .catch((err) => console.log(err));
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      'Accept': "application/json",
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({ password, email }),
  })
    .then((res) => {
      try {
        if (res.status === 400 || res.status === 401) {
          return false;
        } else {
          return res.json();
        }
      } catch (err) {
        return err;
      }
    })
    .then((data) => data)
    .catch((err) => console.log(err));
};

export const getToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: 'include',
    headers: {
      'Accept': "application/json",
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },

  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
};
