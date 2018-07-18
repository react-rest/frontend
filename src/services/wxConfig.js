import request from 'utils/request';

export function getConfig() {
  return request('/api/wxConfig');
}

export const saveConfig = (body) => {
  const options = {
    body,
    method: 'POST',
  }
  return request('/api/wxConfig', options);
}

export const getFollowers = (search) => {
  return request('/api/wx/users' + search)
}
