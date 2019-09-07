export default function parseViewBox(viewBoxString) {
  // viewBox specs: https://www.w3.org/TR/SVG/coords.html#ViewBoxAttribute
  return viewBoxString
    .split(/[ ,]/) // split optional comma
    .filter(Boolean) // remove empty strings
    .map(Number); // cast to Number
}
