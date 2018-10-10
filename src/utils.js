import vueCookies from "vue-cookies";

export default class utils {
  constructor() {}

  static deleteAllCookies() {
    let keys = vueCookies.keys();
    keys.forEach(key => {
      vueCookies.remove(key);
    });
  }

  static verifyCookie(key) {
    let isPresent = vueCookies.isKey(key);
    return isPresent;
  }

  static setCookie(key, value) {
    vueCookies.set(key, value);
  }

  static getCookie(key) {
    let cookie = vueCookies.get(key);
    return cookie;
  }

  static isApiCall(url) {
    let isApiDomain =
      !!url &&
      (url.startsWith("/bs") ||
        url.startsWith(document.location.origin) ||
        url.startsWith(document.location.host));
    return isApiDomain;
  }
}
