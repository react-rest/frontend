import request from 'utils/request';

export function getCusButton() {
  return request('/api/button');
}

export const saveCusButton = (body) => {
  const options = {
    body,
    method: 'POST',
  }
  return request('/api/button', options);
}
