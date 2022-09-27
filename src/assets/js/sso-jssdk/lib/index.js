import axios from "axios";

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var classCallCheck = createCommonjsModule(function (module) {
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

var _classCallCheck = unwrapExports(classCallCheck);

var createClass = createCommonjsModule(function (module) {
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

var _createClass = unwrapExports(createClass);

var cookie = {
  set: function set(name, value) {
    var expires = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 7;
    // 当值为-2时，不设置cookie
    if (expires === -2) return;
    var cookie = "".concat(name, "=").concat(window.encodeURIComponent(value), ";path=/;");

    if (expires > 0) {
      var d = new Date();
      d.setTime(d.getTime() + 24 * 3600 * 1000 * expires);
      cookie += "expires=".concat(d.toGMTString());
    }

    window.document.cookie = cookie;
  },
  get: function get(name) {
    var reg = new RegExp("(^| )".concat(name, "=([^;]*)(;|$)"));
    var r = window.document.cookie.match(reg);

    if (r !== null) {
      return window.decodeURIComponent(r[2]);
    }

    return null;
  },
  "delete": function _delete(name) {
    this.set(name, "", -1);
  }
};

var _typeof_1 = createCommonjsModule(function (module) {
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  }

  return _typeof(obj);
}

module.exports = _typeof;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

var _typeof = unwrapExports(_typeof_1);

(function (t) {
  var e = function e() {
    try {
      return !!Symbol.iterator;
    } catch (e) {
      return false;
    }
  };

  var r = e();

  var n = function n(t) {
    var e = {
      next: function next() {
        var e = t.shift();
        return {
          done: e === void 0,
          value: e
        };
      }
    };

    if (r) {
      e[Symbol.iterator] = function () {
        return e;
      };
    }

    return e;
  };

  var i = function i(e) {
    return encodeURIComponent(e).replace(/%20/g, "+");
  };

  var o = function o(e) {
    return decodeURIComponent(String(e).replace(/\+/g, " "));
  };

  var a = function a() {
    var a = function a(e) {
      Object.defineProperty(this, "_entries", {
        writable: true,
        value: {}
      });

      var t = _typeof(e);

      if (t === "undefined") ; else if (t === "string") {
        if (e !== "") {
          this._fromString(e);
        }
      } else if (e instanceof a) {
        var r = this;
        e.forEach(function (e, t) {
          r.append(t, e);
        });
      } else if (e !== null && t === "object") {
        if (Object.prototype.toString.call(e) === "[object Array]") {
          for (var n = 0; n < e.length; n++) {
            var i = e[n];

            if (Object.prototype.toString.call(i) === "[object Array]" || i.length !== 2) {
              this.append(i[0], i[1]);
            } else {
              throw new TypeError("Expected [string, any] as entry at index " + n + " of URLSearchParams's input");
            }
          }
        } else {
          for (var o in e) {
            if (e.hasOwnProperty(o)) {
              this.append(o, e[o]);
            }
          }
        }
      } else {
        throw new TypeError("Unsupported input's type for URLSearchParams");
      }
    };

    var e = a.prototype;

    e.append = function (e, t) {
      if (e in this._entries) {
        this._entries[e].push(String(t));
      } else {
        this._entries[e] = [String(t)];
      }
    };

    e["delete"] = function (e) {
      delete this._entries[e];
    };

    e.get = function (e) {
      return e in this._entries ? this._entries[e][0] : null;
    };

    e.getAll = function (e) {
      return e in this._entries ? this._entries[e].slice(0) : [];
    };

    e.has = function (e) {
      return e in this._entries;
    };

    e.set = function (e, t) {
      this._entries[e] = [String(t)];
    };

    e.forEach = function (e, t) {
      var r;

      for (var n in this._entries) {
        if (this._entries.hasOwnProperty(n)) {
          r = this._entries[n];

          for (var i = 0; i < r.length; i++) {
            e.call(t, r[i], n, this);
          }
        }
      }
    };

    e.keys = function () {
      var r = [];
      this.forEach(function (e, t) {
        r.push(t);
      });
      return n(r);
    };

    e.values = function () {
      var t = [];
      this.forEach(function (e) {
        t.push(e);
      });
      return n(t);
    };

    e.entries = function () {
      var r = [];
      this.forEach(function (e, t) {
        r.push([t, e]);
      });
      return n(r);
    };

    if (r) {
      e[Symbol.iterator] = e.entries;
    }

    e.toString = function () {
      var r = [];
      this.forEach(function (e, t) {
        r.push(i(t) + "=" + i(e));
      });
      return r.join("&");
    };

    t.URLSearchParams = a;
  };

  var s = function s() {
    try {
      var e = t.URLSearchParams;
      return new e("?a=1").toString() === "a=1" && typeof e.prototype.set === "function" && typeof e.prototype.entries === "function";
    } catch (e) {
      return false;
    }
  };

  if (!s()) {
    a();
  }

  var f = t.URLSearchParams.prototype;

  if (typeof f.sort !== "function") {
    f.sort = function () {
      var r = this;
      var n = [];
      this.forEach(function (e, t) {
        n.push([t, e]);

        if (!r._entries) {
          r["delete"](t);
        }
      });
      n.sort(function (e, t) {
        if (e[0] < t[0]) {
          return -1;
        } else if (e[0] > t[0]) {
          return +1;
        } else {
          return 0;
        }
      });

      if (r._entries) {
        r._entries = {};
      }

      for (var e = 0; e < n.length; e++) {
        this.append(n[e][0], n[e][1]);
      }
    };
  }

  if (typeof f._fromString !== "function") {
    Object.defineProperty(f, "_fromString", {
      enumerable: false,
      configurable: false,
      writable: false,
      value: function value(e) {
        if (this._entries) {
          this._entries = {};
        } else {
          var r = [];
          this.forEach(function (e, t) {
            r.push(t);
          });

          for (var t = 0; t < r.length; t++) {
            this["delete"](r[t]);
          }
        }

        e = e.replace(/^\?/, "");
        var n = e.split("&");
        var i;

        for (var t = 0; t < n.length; t++) {
          i = n[t].split("=");
          this.append(o(i[0]), i.length > 1 ? o(i[1]) : "");
        }
      }
    });
  }
})(typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : undefined);

(function (u) {
  var e = function e() {
    try {
      var e = new u.URL("b", "http://a");
      e.pathname = "c d";
      return e.href === "http://a/c%20d" && e.searchParams;
    } catch (e) {
      return false;
    }
  };

  var t = function t() {
    var t = u.URL;

    var e = function e(_e, t) {
      if (typeof _e !== "string") _e = String(_e);
      if (t && typeof t !== "string") t = String(t);
      var r = document;
      var n;

      if (t && (u.location === void 0 || t !== u.location.href)) {
        t = t.toLowerCase();
        r = document.implementation.createHTMLDocument("");
        n = r.createElement("base");
        n.href = t;
        r.head.appendChild(n);

        try {
          if (n.href.indexOf(t) !== 0) throw new Error(n.href);
        } catch (e) {
          throw new Error("URL unable to set base " + t + " due to " + e);
        }
      }

      var i = r.createElement("a");
      i.href = _e;

      if (n) {
        r.body.appendChild(i);
        i.href = i.href;
      }

      var o = r.createElement("input");
      o.type = "url";
      o.value = _e;

      if (i.protocol === ":" || !/:/.test(i.href) || !o.checkValidity() && !t) {
        throw new TypeError("Invalid URL");
      }

      Object.defineProperty(this, "_anchorElement", {
        value: i
      });
      var a = new u.URLSearchParams(this.search);
      var s = true;
      var f = true;
      var c = this;
      ["append", "delete", "set"].forEach(function (e) {
        var t = a[e];

        a[e] = function () {
          t.apply(a, arguments);

          if (s) {
            f = false;
            c.search = a.toString();
            f = true;
          }
        };
      });
      Object.defineProperty(this, "searchParams", {
        value: a,
        enumerable: true
      });
      var h = void 0;
      Object.defineProperty(this, "_updateSearchParams", {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function value() {
          if (this.search !== h) {
            h = this.search;

            if (f) {
              s = false;

              this.searchParams._fromString(this.search);

              s = true;
            }
          }
        }
      });
    };

    var r = e.prototype;

    var n = function n(t) {
      Object.defineProperty(r, t, {
        get: function get() {
          return this._anchorElement[t];
        },
        set: function set(e) {
          this._anchorElement[t] = e;
        },
        enumerable: true
      });
    };

    ["hash", "host", "hostname", "port", "protocol"].forEach(function (e) {
      n(e);
    });
    Object.defineProperty(r, "search", {
      get: function get() {
        return this._anchorElement["search"];
      },
      set: function set(e) {
        this._anchorElement["search"] = e;

        this._updateSearchParams();
      },
      enumerable: true
    });
    Object.defineProperties(r, {
      toString: {
        get: function get() {
          var e = this;
          return function () {
            return e.href;
          };
        }
      },
      href: {
        get: function get() {
          return this._anchorElement.href.replace(/\?$/, "");
        },
        set: function set(e) {
          this._anchorElement.href = e;

          this._updateSearchParams();
        },
        enumerable: true
      },
      pathname: {
        get: function get() {
          return this._anchorElement.pathname.replace(/(^\/?)/, "/");
        },
        set: function set(e) {
          this._anchorElement.pathname = e;
        },
        enumerable: true
      },
      origin: {
        get: function get() {
          var e = {
            "http:": 80,
            "https:": 443,
            "ftp:": 21
          }[this._anchorElement.protocol];
          var t = this._anchorElement.port != e && this._anchorElement.port !== "";
          return this._anchorElement.protocol + "//" + this._anchorElement.hostname + (t ? ":" + this._anchorElement.port : "");
        },
        enumerable: true
      },
      password: {
        get: function get() {
          return "";
        },
        set: function set(e) {},
        enumerable: true
      },
      username: {
        get: function get() {
          return "";
        },
        set: function set(e) {},
        enumerable: true
      }
    });

    e.createObjectURL = function (e) {
      return t.createObjectURL.apply(t, arguments);
    };

    e.revokeObjectURL = function (e) {
      return t.revokeObjectURL.apply(t, arguments);
    };

    u.URL = e;
  };

  if (!e()) {
    t();
  }

  if (u.location !== void 0 && !("origin" in u.location)) {
    var r = function r() {
      return u.location.protocol + "//" + u.location.hostname + (u.location.port ? ":" + u.location.port : "");
    };

    try {
      Object.defineProperty(u.location, "origin", {
        get: r,
        enumerable: true
      });
    } catch (e) {
      setInterval(function () {
        u.location.origin = r();
      }, 100);
    }
  }
})(typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : undefined);

function getParam(name) {
  var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location.href;
  var reg = new RegExp("(^|&)".concat(name, "=([^&]*)(&|$)"), "i");
  var search = url.split("?")[1] || "";
  search = search.split("#")[0];
  var r = search.match(reg);

  if (r !== null) {
    return window.decodeURIComponent(r[2]);
  }

  return null;
}
function setTicket(key, ticket, expires) {
  cookie.set(key, ticket, expires);
  window._sso_ticket = ticket;
}
function getTicket(key) {
  return cookie.get(key) || window._sso_ticket || "";
}
function clearTicket(key) {
  cookie["delete"](key);
  window._sso_ticket = "";
} // export function clearTicketParam(stKey, tgtKey) {
//   let href = window.location.href;
//   [stKey, tgtKey].forEach(key => {
//     const reg = new RegExp(`(^|&|[?]*)${key}=([^&]*)(&|$)`, 'i');
//     href = href.replace(reg, function (a, b, c, d) {
//       if (b === '&' && d === '&') {
//         return '&';
//       } else if (b === '?' && d === '&') {
//         return '?';
//       } else if (a && a.indexOf('#') !== -1) {
//         return a.substr(a.indexOf('#'));
//       }
//       return '';
//     });
//   });
//   window.history.replaceState('sso', null, href);
// }

function clearTicketParam(stKey, tgtKey) {
  try {
    var url = new URL(window.location.href);
    url.searchParams["delete"](stKey);
    url.searchParams["delete"](tgtKey);
    window.history.replaceState("sso", null, url.href);
  } catch (error) {// console.log('clearTicketParam error', error)
  }
}

var utils = /*#__PURE__*/Object.freeze({
	getParam: getParam,
	setTicket: setTicket,
	getTicket: getTicket,
	clearTicket: clearTicket,
	clearTicketParam: clearTicketParam
});

function applyResolve(success, fail) {
  return function (res) {
    var data = res.data || {};

    if (res.errorCode === 0) {
      success && success(data, res);
      return res;
    } else {
      fail && fail(data, res);
      throw res;
    }
  };
}

var SsoSdk = /*#__PURE__*/function () {
  function SsoSdk(options) {
    _classCallCheck(this, SsoSdk);

    var config = this.config = Object.assign({
      sso: "",
      key: "",
      stKey: "ticket",
      tgtKey: "tgt",
      expires: 7
    }, options);
    this.ssoAxios = axios.create({
      baseURL: config.sso
    });
    this.ssoAxios.interceptors.response.use(function (res) {
      return res.data;
    });
  }

  _createClass(SsoSdk, [{
    key: "autoSSO",
    value: function autoSSO() {
      var _this$config = this.config,
          key = _this$config.key,
          stKey = _this$config.stKey,
          tgtKey = _this$config.tgtKey;
      var ticket = getParam(stKey);
      var promise;

      if (ticket) {
        promise = this.validateST(ticket);
      } else {
        ticket = getParam(tgtKey) || getTicket(key);

        if (ticket) {
          promise = this.getUserinfo(ticket);
        } else {
          return Promise.reject(new Error());
        }
      }

      return promise.then(function (res) {
        clearTicketParam(stKey, tgtKey);
        return res;
      }, function (err) {
        clearTicketParam(stKey, tgtKey);
        throw err;
      });
    }
  }, {
    key: "logout",
    value: function logout(ticket) {
      var key = this.config.key;
      var resolve = applyResolve(function () {
        clearTicket(key);
      });
      ticket = ticket || getTicket(key);
      return this.ssoAxios["delete"]("/logout", {
        headers: {
          ticket: ticket
        }
      }).then(resolve);
    }
  }, {
    key: "getUserinfo",
    value: function getUserinfo(ticket) {
      var _this = this;

      var _this$config2 = this.config,
          key = _this$config2.key,
          expires = _this$config2.expires;
      var resolve = applyResolve(function (data) {
        data.Ticket = ticket;
        setTicket(key, ticket, expires);
        _this.userinfo = data;
      }, function () {
        clearTicket(key);
      });
      return this.ssoAxios.get("/userinfo", {
        headers: {
          ticket: ticket
        }
      }).then(resolve);
    }
  }, {
    key: "validate",
    value: function validate(params) {
      var _this2 = this;

      var _this$config3 = this.config,
          key = _this$config3.key,
          expires = _this$config3.expires;
      return this.ssoAxios.get("/validate", {
        headers: params
      }).then(function (res) {
        var data = res.data || {};

        if (res.errorCode === 0 && data.IsValid) {
          setTicket(key, data.Ticket, expires);
          _this2.userinfo = data;
          return res;
        } else {
          clearTicket(key);
          throw res;
        }
      });
    }
  }, {
    key: "validateST",
    value: function validateST(ticket) {
      return this.validate({
        "s-ticket": ticket
      });
    }
  }, {
    key: "validateTGT",
    value: function validateTGT(ticket) {
      return this.validate({
        ticket: ticket
      });
    }
  }, {
    key: "JumpToLogin",
    value: function JumpToLogin(callbackUrl, loginUrl) {
      var sso = this.config.sso;
      var ssoLogin = sso.replace("/api/v2", "/login");
      window.location.href = "".concat(loginUrl || ssoLogin, "?service=").concat(window.encodeURIComponent(callbackUrl || window.location.href));
    }
  }]);

  return SsoSdk;
}();

SsoSdk.utils = utils;
SsoSdk.axios = axios;
SsoSdk.cookie = cookie;

export default SsoSdk;
