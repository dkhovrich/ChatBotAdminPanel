import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Language } from '../../constants';

@Component({
  selector: 'app-glossary-flag',
  templateUrl: './glossary-flag.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlossaryFlagComponent {
  @Input() language: Language;
  className: string;

  getClassName(): object {
    const className = `flag-icon-${this.language}`;
    return { [className]: true };
  }
}
