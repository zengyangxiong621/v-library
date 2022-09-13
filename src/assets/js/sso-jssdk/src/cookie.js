export default {
  set(name, value, expires = 7) {
    // 当值为-2时，不设置cookie
    if (expires === -2) return;

    let cookie = `${name}=${window.encodeURIComponent(value)};path=/;`;

    if (expires > 0) {
      const d = new Date();

      d.setTime(d.getTime() + 24 * 3600 * 1000 * expires);
      cookie += `expires=${d.toGMTString()}`;
    }
    window.document.cookie = cookie;
  },

  get(name) {
    const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
    const r = window.document.cookie.match(reg);

    if (r !== null) {
      return window.decodeURIComponent(r[2]);
    }
    return null;
  },

  delete(name) {
    this.set(name, "", -1);
  }
};
