export const redirect = (url: string) => {
  window.location.href = url;
};

export const redirectToLogin = () => {
  const { pathname, search, hash } = window.location;
  const path = pathname + search + hash;
  let queryString = '';

  if (path !== '/') {
    queryString = `?path=${encodeURIComponent(path)}`;
  }

  if (pathname !== '/login') {
    redirect(`/login${queryString}`);
  }
};
