import { Converter } from 'opencc-js';

export function isPureText(str) {
  return !str.startsWith('<');
}

export function getCnTranslation(str) {
  const convert = Converter({ from: 'tw', to: 'cn' });
  return convert(str);
}

export function getTwTranslation(str) {
  const convert = Converter({ from: 'cn', to: 'tw' });
  return convert(str);
}
