//specs: https://developer.mozilla.org/en-US/docs/Web/CSS/cursor

let needPrefix = (cursor) => ['zoom-in', 'zoom-out', 'grab', 'grabbing'].indexOf(cursor) > -1;
let userAgent = () => navigator.userAgent.toLowerCase();
let isFirefox = () => userAgent().indexOf('firefox') > -1;
let isWebkit = () => userAgent().indexOf('webkit') > -1;

export default function (cursor) {
  if (!needPrefix(cursor)) return cursor;
  if (isFirefox()) return `-moz-${cursor}`;
  if (isWebkit()) return `-webkit-${cursor}`;
}


