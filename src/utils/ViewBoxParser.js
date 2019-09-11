const HASH_MAP = {0: 'SVGMinX', 1: 'SVGMinY', 2: 'SVGWidth', 3: 'SVGHeight'}
export default function parseViewBox(viewBoxString) {
  // viewBox specs: https://www.w3.org/TR/SVG/coords.html#ViewBoxAttribute
  return viewBoxString && viewBoxString
    .split(/[ ,]/) // split optional comma
    .filter(Boolean) // remove empty strings
    .map(Number) // cast to Number
    .map((value, index) => ({[HASH_MAP[index]]: value}))
    .reduce((val, acc) => ({...acc, ...val}), {})
}
