import axios from 'axios';
import cookie from './cookie';
import * as utils from './utils';

function applyResolve(success, fail) {
  return (res) => {
    const data = res.data || {};

    if (res.errorCode === 0) {
      success && success(data, res);
      return res;
    } else {
      fail && fail(data, res);
      throw res;
    }
  };
}

class SsoSdk {
  constructor(options) {
    const config = this.config = Object.assign({
      sso: '',
      key: '',
      stKey: 'ticket',
      tgtKey: 'tgt',
      expires: 7
    }, options);

    this.ssoAxios = axios.create({
      baseURL: config.sso
    });
    this.ssoAxios.interceptors.response.use(res => {
      return res.data;
    });
  }

  autoSSO() {
    const {
      key,
      stKey,
      tgtKey
    } = this.config;
    let ticket = utils.getParam(stKey);
    let promise;

    if (ticket) {
      promise = this.validateST(ticket);
    } else {
      ticket = utils.getParam(tgtKey) || utils.getTicket(key);
      if (ticket) {
        promise = this.getUserinfo(ticket);
      } else {
        return Promise.reject(new Error());
      }
    }

    return promise.then(res => {
      utils.clearTicketParam(stKey, tgtKey);
      return res;
    }, err => {
      utils.clearTicketParam(stKey, tgtKey);
      throw err;
    });
  }

  logout(ticket) {
    const {
      key
    } = this.config;
    const resolve = applyResolve(() => {
      utils.clearTicket(key);
    });

    ticket = ticket || utils.getTicket(key);
    return this.ssoAxios.delete('/logout', { headers: { ticket } }).then(resolve);
  }

  getUserinfo(ticket) {
    const {
      key,
      expires
    } = this.config;
    const resolve = applyResolve(data => {
      data.Ticket = ticket;
      utils.setTicket(key, ticket, expires);
      this.userinfo = data;
    }, () => {
      utils.clearTicket(key);
    });

    return this.ssoAxios.get('/userinfo', { headers: { ticket } }).then(resolve);
  }

  validate(params) {
    const {
      key,
      expires
    } = this.config;

    return this.ssoAxios.get('/validate', { headers: params }).then(res => {
      const data = res.data || {};

      if (res.errorCode === 0 && data.IsValid) {
        utils.setTicket(key, data.Ticket, expires);
        this.userinfo = data;
        return res;
      } else {
        utils.clearTicket(key);
        throw res;
      }
    });
  }

  validateST(ticket) {
    return this.validate({ 's-ticket': ticket });
  }

  validateTGT(ticket) {
    return this.validate({ ticket });
  }

  JumpToLogin(callbackUrl, loginUrl) {
    const {
      sso
    } = this.config;
    const ssoLogin = sso.replace('/api/v2', '/login');
    window.location.href = `${loginUrl || ssoLogin}?service=${window.encodeURIComponent(callbackUrl || window.location.href)}`;
  }
}

SsoSdk.utils = utils;
SsoSdk.axios = axios;
SsoSdk.cookie = cookie;

export default SsoSdk;
