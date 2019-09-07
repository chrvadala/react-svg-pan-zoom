export default function parseViewBox(viewBox) {
  return viewBox.split(' ').map(parseFloat);
}
