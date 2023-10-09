export function decodeToken(token: string) {
  try {
    if (token.split('.').length !== 3 || typeof token !== 'string') {
      return null;
    }

    const payload = token.split('.')[1];
    const padding = '='.repeat((4 - (payload.length % 4)) % 4);
    const base64 = payload.replace('-', '+').replace('_', '/') + padding;
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          // return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          return `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`;
        })
        .join('')
    );
    const decoded = JSON.parse(jsonPayload);
    return decoded;
  } catch (error) {
    return null;
  }
};

export function isTokenExpired(token: string) {
  const decodedToken = decodeToken(token);
  if (decodedToken && decodedToken.exp) {
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decodedToken.exp);
    return expirationDate.valueOf() < new Date().valueOf();
  }

  return true;
};


export function getCookie(name: string) {
  const cookieName = name + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return null;
}

export function removeCookie(name: string): void {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; max-age=0; path=/;`;
}