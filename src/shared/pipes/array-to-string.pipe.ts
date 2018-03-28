import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'arrayToString' })
export class ArrayToStringPipe implements PipeTransform {
  transform(value: string[], separator: string = ', '): string {
    return value.join(separator);
  }
}
