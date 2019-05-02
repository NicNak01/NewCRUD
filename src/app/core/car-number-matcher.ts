import { AbstractControl } from '@angular/forms';

export function carNumberMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const regex = /\b[A-Za-z]{3}[0-9]{3}\b/;
  if ( regex.test(c.value)) {
    return null;
  }
  return { match: true };
}
