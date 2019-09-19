export function isNullOrUndefined(value) {
  return typeof value === 'undefined' || value === null
}

export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
