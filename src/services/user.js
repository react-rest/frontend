import request from 'utils/request';

export function login(body) {
  const options = {
    body,
    method: 'POST',
  }
  return request('/api/login', options);
}

export function register(body) {
  const options = {
    body,
    method: 'POST',
  }
  return request('/api/register', options);
}
