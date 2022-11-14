export const localStore = {
  get: function (key: string) {
    return localStorage.getItem(key);
  },
  set: function (key: string, value: string) {
    return localStorage.setItem(key, value);
  },
  removeItem: function (skey: any) {
    try {
      return localStorage.removeItem(skey);
    } catch (e) {
      console.info(e);
      return null;
    }
  },
  getToken() {
    return this.get("token");
  },
  getUserInfo() {
    return this.get("user");
  },
  setUserInfo(account: any) {
    this.set("user", JSON.stringify(account));
  },
  getMenus() {
    return this.get("menus");
  },
  setMenus(menus: any) {
    this.set("menus", JSON.stringify(menus));
  },
  logout() {
    this.clearAll();
  },
  clearExcept(key: string) {
    for (let i = 0; i < localStorage.length; i++) {
      const itemKey = localStorage.key(i);
      if (itemKey !== key) {
        localStorage.removeItem(itemKey as string);
      }
    }
  },
  clearAll() {
    for (const itemKey in localStorage) {
      localStorage.removeItem(itemKey);
    }
  },
};
