
export const authority = (data) => {
  const key = 'ADMIN_WX';
  if (data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  data = localStorage.getItem(key)
  return data ? JSON.parse(data) : null;
}
