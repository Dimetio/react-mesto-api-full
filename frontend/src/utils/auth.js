export const BASE_URL = `${window.location.protocol}${process.env.REACT_APP_API_URL}`;

const checkResponce = (res) => {
  if(res.ok) {
    return res.json();
  }

  return res.json()
    .then(data => {
      throw new Error(data.message)
    });
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  })
  .then(checkResponce);
}

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  })
  .then(checkResponce);
}

export const getToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${token}`,
    }
  })
  .then(checkResponce);
}