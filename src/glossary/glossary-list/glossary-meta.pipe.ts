import { Pipe, PipeTransform } from '@angular/core';
import { IGlossaryMetaModel } from '../glossary.models';

@Pipe({ name: 'glossaryMeta' })
export class GlossaryMetaPipe implements PipeTransform {
  transform(value: IGlossaryMetaModel): string[] {
    return Object.keys(value)
      .filter(key => value[key])
      .map(key => this.firstLetterUpperCase(key));
  }

  private firstLetterUpperCase(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
