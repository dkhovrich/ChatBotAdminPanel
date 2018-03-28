import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-glossary-flag',
  templateUrl: './glossary-flag.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlossaryFlagComponent {
  @Input() language: 'ru' | 'en';
  className: string;

  getClassName(): object {
    const className = `flag-icon-${this.language}`;
    return { [className]: true };
  }
}
