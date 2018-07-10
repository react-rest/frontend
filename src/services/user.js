import request from 'utils/request';

export function login(body) {
  const options = {
    body,
    method: 'POST',
  }
  return request('/api/login', options);
}
