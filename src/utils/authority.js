
export const authority = (data) => {
  const key = 'ADMIN_WX';
  if (data === -1)
    localStorage.removeItem(key);
  else if (data)
    localStorage.setItem(key, JSON.stringify(data));
  data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}
