import { set } from './common';

export function openMiniature(value) {
  return set(value, {
    miniatureOpen: true
  });
}

export function closeMiniature(value) {
  return set(value, {
    miniatureOpen: false
  });
}