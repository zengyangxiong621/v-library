import cookie from './cookie';
import './url-polyfill.min';

export function getParam(name, url = window.location.href) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  let search = url.split('?')[1] || '';
  search = search.split('#')[0];
  const r = search.match(reg);

  if (r !== null) {
    return window.decodeURIComponent(r[2]);
  }
  return null;
}

export function setTicket(key, ticket, expires) {
  cookie.set(key, ticket, expires);
  window._sso_ticket = ticket;
}

export function getTicket(key) {
  return cookie.get(key) || window._sso_ticket || '';
}

export function clearTicket(key) {
  cookie.delete(key);
  window._sso_ticket = '';
}

// export function clearTicketParam(stKey, tgtKey) {
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

export function clearTicketParam(stKey, tgtKey) {
  try {
    const url = new URL(window.location.href);
    url.searchParams.delete(stKey);
    url.searchParams.delete(tgtKey);
    window.history.replaceState('sso', null, url.href);
  } catch (error) {
    // console.log('clearTicketParam error', error)
  }
}
